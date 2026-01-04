# 🎵 Underrated Albums

> Code for discovering and recommending underrated albums on Spotify using TypeScript and machine learning algorithms.

[![GitHub License](https://img.shields.io/badge/license-Apache%202.0-blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-83.7%25-blue?logo=typescript)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-14.7%25-yellow?logo=javascript)]()

## 🎯 Overview

Underratedalbums is a sophisticated recommendation system that discovers hidden gems in Spotify's vast music library. By analyzing listening patterns, audio features, and user preferences, this project helps music enthusiasts find albums that match their taste but haven't received mainstream attention.

## ✨ Features

- **Smart Discovery**: Intelligent algorithm to identify underrated albums based on listening patterns
- **Spotify Integration**: Direct integration with Spotify API for real-time music data
- **Audio Analysis**: Deep analysis of audio features (tempo, energy, danceability, etc.)
- **Personalized Recommendations**: Tailored album suggestions based on user preferences
- **Modern Stack**: Built with TypeScript, React, and modern web technologies

## 🏗️ Project Structure

```
underrated-albums/
├── app/                 # Frontend application
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── scripts/            # Utility scripts
├── src/                # Core application logic
├── package.json        # Project dependencies
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Spotify API credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/waterisverywet/underrated-albums.git

# Navigate to project directory
cd underrated-albums

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev
```

### Development

```bash
# Start the development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## 🎓 How It Works

1. **Data Collection**: Fetches user listening history from Spotify API
2. **Feature Extraction**: Analyzes audio characteristics of albums
3. **Pattern Analysis**: Identifies trends and preferences in user data
4. **Recommendation Engine**: Generates personalized album recommendations
5. **Ranking**: Scores albums based on relevance and quality metrics

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Next.js, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **API Integration**: Spotify Web API
- **Build Tools**: Webpack, ESLint, PostCSS

## 📊 Languages

- TypeScript: 83.7%
- JavaScript: 14.7%
- CSS: 1.6%

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**waterisverywet**

- GitHub: [@waterisverywet](https://github.com/waterisverywet)

## 🙏 Acknowledgments

- Spotify for providing comprehensive music data API
- The open-source community for amazing tools and libraries
- Music enthusiasts everywhere who appreciate discovering new music

## 📮 Support

If you have any questions or need help, please feel free to open an issue or reach out.

---

**Made with ❤️ by @waterisverywet**
