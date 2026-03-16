🎮 Game Finder
An AI-powered game recommendation app that suggests the perfect video games based on your preferences. Built with Node.js, Express, RAWG API.

🔥 Features
Smart Recommendations — AI analyzes your preferences and explains why each game suits you
Massive Game Database — Powered by RAWG's database of 900,000+ games
Multiple Filters — Filter by genre, playstyle, budget, and PC specs
Steam & Epic Links — Direct links to find every game on Steam and Epic Games
Dark Gamer UI — Sleek red and black aesthetic with smooth animations
Pagination — Fetches up to 100 games per search for accurate results
🛠️ Tech Stack
Frontend — HTML, CSS, JavaScript
Backend — Node.js, Express.js
Game Data — RAWG API (900,000+ games)
Deployment — Vercel
📦 Installation
Prerequisites
Node.js (v18 or higher)
NPM
RAWG API Key (free at rawg.io/apidocs)
Steps
Clone the repository
git clone https://github.com/Shrikar-Dev/game-finder.git
cd game-finder
Install dependencies
npm install
Create a .env file in the root directory
RAWG_API_KEY=your_rawg_api_key_here
PORT=3000
Start the development server
node server.js
Open your browser and go to
http://localhost:3000
🎯 How It Works
User answers 4 questions about their gaming preferences
App fetches up to 100 matching games from RAWG's database across multiple pages
OpenRouter AI analyzes the results and writes personalized descriptions
Results are displayed as game cards with cover art, ratings, and store links
🔍 Filters
Filter	Options
Genre	Action, RPG, Horror, Shooter, Adventure, Puzzle, Sports, Strategy
Playstyle	Singleplayer, Multiplayer, Both
Budget	Free Only, Happy to Pay, Any
PC Specs	Low-end, Mid-range, High-end
🚀 Deployment
This app is deployed on Vercel. To deploy your own version:

Push your code to GitHub
Connect your GitHub repo to Vercel
Set the Root Directory to game-finder
Add your environment variables in Vercel Settings → Environment Variables
Deploy!
🔑 Environment Variables
Variable	Description
RAWG_API_KEY	Your RAWG API key from rawg.io/apidocs
PORT	Port to run the server on (default: 3000)
📁 Project Structure
game-finder/
├── public/
│   └── index.html      # Frontend UI
├── server.js           # Express backend + API logic
├── .env                # Environment variables (not committed)
├── vercel.json         # Vercel deployment config
├── package.json        # Dependencies
└── README.md           # This file
🙏 Credits
RAWG API — Game database
Vercel — Hosting and deployment
📄 License
MIT License — feel free to use this project however you like.
