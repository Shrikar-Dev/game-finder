const express = require('express');
const axios = require('axios');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



async function fetchPages(params, maxPages) {
  const all = [];
  let nextUrl = null;
  for (let p = 1; p <= maxPages; p++) {
    try {
      const res = nextUrl
        ? await axios.get(nextUrl, { timeout: 8000 })
        : await axios.get('https://api.rawg.io/api/games', { params, timeout: 8000 });
      all.push(...res.data.results);
      console.log(`Page ${p}: ${res.data.results.length} games (total: ${all.length})`);
      if (!res.data.next) break;
      nextUrl = res.data.next;
    } catch (e) {
      console.log(`Page ${p} failed:`, e.message);
      break;
    }
  }
  return all;
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/recommend', async (req, res) => {
  const { genre, playStyle, budget, specs } = req.body;

  const genreMap = {
    action: 'action',
    rpg: 'role-playing-games-rpg',
    horror: null,
    shooter: 'shooter',
    adventure: 'adventure',
    puzzle: 'puzzle',
    sports: 'sports',
    strategy: 'strategy'
  };

  try {
    console.log(`\n=== Search: ${genre} | ${playStyle} | ${budget} | ${specs} ===`);
    console.log('OPENROUTER KEY EXISTS:', !!process.env.OPENROUTER_API_KEY);
    console.log('RAWG KEY EXISTS:', !!process.env.RAWG_API_KEY);
    const baseParams = {
      key: process.env.RAWG_API_KEY,
      ordering: '-rating',
      page_size: 20,
    };

    if (genre === 'horror') {
      baseParams.tags = 'horror';
    } else if (genreMap[genre]) {
      baseParams.genres = genreMap[genre];
    }

    if (specs === 'low') {
      baseParams.dates = '2000-01-01,2016-12-31';
    }

    // Fetch 5 pages = 100 games
    let games = await fetchPages(baseParams, 3);
    console.log('PAGINATION RESULT:', games.length);
    console.log(`Total fetched: ${games.length}`);

    // Free filter
    if (budget === 'free') {
      const knownFree = [
        'fortnite', 'warframe', 'dota', 'path of exile', 'apex legends',
        'team fortress', 'counter-strike 2', 'lost ark', 'destiny 2',
        'genshin', 'valorant', 'league of legends', 'rocket league',
        'fall guys', 'paladins', 'smite', 'dauntless', 'brawlhalla',
        'world of tanks', 'war thunder', 'splitgate', 'enlisted',
        'magic the gathering', 'hearthstone', 'planetside', 'crossout'
      ];
      const freeFiltered = games.filter(g =>
        knownFree.some(f => g.name.toLowerCase().includes(f))
      );
      console.log(`Free filter matched: ${freeFiltered.length}`);

      if (freeFiltered.length >= 3) {
        games = freeFiltered;
      } else {
        console.log('Fetching free games separately...');
        const freeParams = {
          key: process.env.RAWG_API_KEY,
          ordering: '-added',
          page_size: 20,
          tags: 'free-to-play',
        };
        if (genre !== 'horror' && genreMap[genre]) freeParams.genres = genreMap[genre];
        if (genre === 'horror') freeParams.tags = 'free-to-play,horror';
        games = await fetchPages(freeParams, 5);
        console.log(`Free fetch total: ${games.length}`);
      }
    }

    // Playstyle filter
    if (playStyle === 'multiplayer') {
      const multi = games.filter(g =>
        g.tags?.some(t => ['multiplayer', 'co-op', 'online-multiplayer', 'pvp'].includes(t.slug))
      );
      if (multi.length >= 4) { games = multi; console.log(`Multiplayer filter: ${games.length}`); }
    } else if (playStyle === 'singleplayer') {
      const single = games.filter(g =>
        g.tags?.some(t => ['singleplayer', 'single-player', 'story-rich'].includes(t.slug))
      );
      if (single.length >= 4) { games = single; console.log(`Singleplayer filter: ${games.length}`); }
    }

    
    // Show between 50-100 games
    const final = games.sort(() => Math.random() - 0.5).slice(0, Math.min(games.length, 100));
    console.log('Final 6:', final.map(g => g.name));

    if (final.length === 0) return res.json({ games: [] });

    // Only send top 10 to AI for descriptions, rest get generic description
    const aiGames = final.slice(0, 10);
    const gameList = aiGames.map(g =>
    `${g.name} (Rating: ${g.rating}/5, Released: ${g.released})`
    ).join('\n');

    
    const prompt = `You are a game recommendation expert. User wants ${playStyle} ${genre} games. Budget: ${budget}. PC: ${specs}.
Games: ${gameList}
Write 1-2 enthusiastic sentences per game explaining why it suits this user. Mention free to play if relevant.
Return ONLY valid JSON array, no markdown, no backticks:
[{"name":"Game Name","reason":"explanation"}]`;

    const aiResponse = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
  model: 'openai/gpt-oss-120b:free',
  messages: [{ role: 'user', content: prompt }]
}, {
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json'
  }
});
const aiText = aiResponse.data.choices[0].message.content.replace(/```json|```/g, '').trim();

    let aiReasons = [];
    try {
      aiReasons = JSON.parse(aiText);
    } catch (e) {
      aiReasons = final.map(g => ({ name: g.name, reason: 'A great pick for your preferences.' }));
    }

    const finalGames = final.map(game => ({
    name: game.name,
    rating: game.rating,
    released: game.released,
    image: game.background_image,
    reason: (aiReasons.find(a => a.name === game.name) || {}).reason || `A highly rated ${genre} game worth checking out.`,
    steam_url: `https://store.steampowered.com/search/?term=${encodeURIComponent(game.name)}`,
    epic_url: `https://store.epicgames.com/browse?q=${encodeURIComponent(game.name)}`
    }));

    res.json({ games: finalGames });

  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: err.message });
});
app.listen(PORT, '0.0.0.0', () => console.log(`Game Finder running at http://localhost:${PORT}`));