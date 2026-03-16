# 🎮 Game Finder

An AI-powered game recommendation app that suggests the perfect video games based on your preferences. Built with Node.js, Express, RAWG API, and OpenRouter AI.

## 🔥 Features

- **Smart Recommendations** — AI analyzes your preferences and explains why each game suits you
- **Massive Game Database** — Powered by RAWG's database of 900,000+ games
- **Multiple Filters** — Filter by genre, playstyle, budget, and PC specs
- **Steam & Epic Links** — Direct links to find every game on Steam and Epic Games
- **Dark Gamer UI** — Sleek red and black aesthetic with smooth animations
- **Pagination** — Fetches up to 100 games per search for accurate results

## 🛠️ Tech Stack

- **Frontend** — HTML, CSS, JavaScript
- **Backend** — Node.js, Express.js
- **Game Data** — RAWG API (900,000+ games)
- **AI** — OpenRouter API (AI-powered game descriptions)
- **Deployment** — Vercel

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- NPM
- RAWG API Key (free at rawg.io/apidocs)
- OpenRouter API Key (free at openrouter.ai)

### Steps

1. Clone the repository
```bash
git clone https://github.com/Shrikar-Dev/game-finder.git
cd game-finder
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
RAWG_API_KEY=your_rawg_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=3000
```

4. Start the development server
```bash
node server.js
```

5. Open your browser and go to
```
http://localhost:3000
```

## 🎯 How It Works

1. User answers 4 questions about their gaming preferences
2. App fetches up to 100 matching games from RAWG's database across multiple pages
3. OpenRouter AI analyzes the results and writes personalized descriptions
4. Results are displayed as game cards with cover art, ratings, and store links

## 🔍 Filters

| Filter | Options |
|--------|---------|
| Genre | Action, RPG, Horror, Shooter, Adventure, Puzzle, Sports, Strategy |
| Playstyle | Singleplayer, Multiplayer, Both |
| Budget | Free Only, Happy to Pay, Any |
| PC Specs | Low-end, Mid-range, High-end |

## 🚀 Deployment

This app is deployed on Vercel. To deploy your own version:

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Set the Root Directory to `game-finder`
4. Add your environment variables in Vercel Settings → Environment Variables
5. Deploy!

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `RAWG_API_KEY` | Your RAWG API key from rawg.io/apidocs |
| `OPENROUTER_API_KEY` | Your OpenRouter API key from openrouter.ai |
| `PORT` | Port to run the server on (default: 3000) |

## 📁 Project Structure

```
game-finder/
├── public/
│   └── index.html      # Frontend UI
├── server.js           # Express backend + API logic
├── .env                # Environment variables (not committed)
├── vercel.json         # Vercel deployment config
├── package.json        # Dependencies
└── README.md           # This file
```

## 🙏 Credits

- [RAWG API](https://rawg.io/apidocs) — Game database
- [OpenRouter](https://openrouter.ai) — AI API gateway
- [Vercel](https://vercel.com) — Hosting and deployment

## 📄 License

MIT License — feel free to use this project however you like.
