# GrindMap

<div align="center">

**Your All-in-One Streak and Consistency Assistant**

Effortlessly manage progress across competitive programming platforms.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/Yugenjr/GrindMap)
[![GitHub Stars](https://img.shields.io/github/stars/Yugenjr/GrindMap?style=social)](https://github.com/Yugenjr/GrindMap)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Live Demo](#-interactive-demo) • [Documentation](#) • [Contributing](#contributing) • [Issues](../../issues)

</div>

---

## ✨ Features

- 🎯 **Multi-Platform Support**: Track progress on LeetCode, CodeForces, CodeChef, and more
- ⚡ **Real-time Stats**: Fetch live statistics using official platform APIs
- 📊 **Progress Visualization**: Beautiful circular progress rings for each platform
- 📈 **Performance Analytics**: Overall progress dashboard across all platforms
- 🔥 **Streak Tracking**: Monitor your daily coding consistency
- 🎨 **Beautiful UI**: Modern, responsive interface built with React
- 🔧 **Customizable**: Easy to extend and customize for your needs

## 🎯 Interactive Demo

**Try GrindMap without any setup!**

Experience all features with sample data:

1. Start the application: `npm start`
2. Click the **"View Demo"** button on the main page
3. Explore platform statistics, heatmaps, and activity tracking

### What You'll See:

- 📊 **Live Statistics** from LeetCode, CodeForces, and CodeChef
- 🔄 **Circular Progress Rings** showing completion percentages
- 📅 **Activity Heatmap** displaying submission patterns
- ✅ **Daily Activity Tracker** for consistency monitoring
- 👁️ **Expandable Cards** with detailed platform insights

For a detailed demo guide, see [DEMO.md](DEMO.md)

### Visual Preview

*Screenshots and demo videos coming soon!*

<!-- Add screenshots here:
![Dashboard Overview](./public/screenshots/dashboard.png)
![Platform Details](./public/screenshots/platform-details.png)
![Activity Heatmap](./public/screenshots/heatmap.png)
-->

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Yugenjr/GrindMap.git
cd GrindMap

# Install dependencies
npm install

# Start the development server
npm start
```

## 📁 Project Structure

```
GrindMap/
├── frontend/          # React-based user interface
├── backend/           # Node.js server and APIs
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

## 🤝 Contributing

We welcome contributions from the community! Whether it's bug fixes, new features, or documentation improvements, your help makes GrindMap better.

### Getting Started
---

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/AmazingFeature`
3. **Commit** your changes: `git commit -m 'Add AmazingFeature'`
4. **Push** to the branch: `git push origin feature/AmazingFeature`
5. **Open** a Pull Request

### Good First Issues
---

Looking to contribute? Check out our [Good First Issues](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) - perfect for first-time contributors!

### Areas We Need Help With
---

- 🐛 **Bug Fixes**: Report and fix bugs you find
- ✨ **New Features**: Suggest and implement new features
- 📚 **Documentation**: Improve README, add tutorials, or write guides
- 🎨 **UI/UX**: Enhance the user interface and experience
- 🧪 **Testing**: Write unit and integration tests
- 🌐 **Localization**: Translate the app to other languages

## 📋 Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful and constructive in discussions

## 🐛 Reporting Issues

Found a bug? Please [open an issue](../../issues/new) with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 💡 Feature Requests

Have an idea? [Create a feature request](../../issues/new) and describe:
- The problem you're trying to solve
- Your proposed solution
- Alternative approaches you've considered


## 🏗️ Project Architecture


GrindMap is built using a clear separation between **Frontend** and **Backend**, making
the project scalable, maintainable, and contributor-friendly.


### 🔙 Backend
---

The `backend/` directory handles all server-side responsibilities, including:

- Fetching and processing user data (e.g., coding platform stats)
- Scraping or integrating external platforms (like LeetCode, GitHub, etc.)
- Managing APIs that serve data to the frontend
- Handling business logic and data transformation

The backend acts as the **brain** of the system:
- It gathers raw data
- Cleans and structures it
- Exposes it through APIs for the frontend


### 🎨 Frontend
---
The `frontend/` directory is responsible for:

- User interface (UI)
- Visualizing streaks, progress, and consistency
- Displaying data received from backend APIs
- Providing interactive components for users

The frontend acts as the **face** of the system:
- It requests data from the backend
- Converts raw data into meaningful visuals
- Delivers a smooth and engaging user experience


### 🔄 Workflow Overview
---

High-level flow of the application:

1. User opens the web application (Frontend)
2. Frontend sends a request to the Backend API
3. Backend:
   - Fetches data from external platforms
   - Processes and structures the data
4. Backend returns processed data to the Frontend
5. Frontend:
   - Renders streaks, stats, and progress
   - Updates UI based on received data


### 💡 This architecture ensures
---
- Clear separation of concerns
- Easier debugging and scaling
- Smooth onboarding for new contributors



## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- LeetCode, CodeForces, and CodeChef for their amazing platforms
- Our amazing contributors who make this project possible
- The open-source community for inspiration and support

## 📞 Questions?

Feel free to reach out:
- [GitHub Issues](../../issues)
- Open a discussion in [GitHub Discussions](../../discussions)

---

<div align="center">

**Made with ❤️ by [Yugendra N](https://github.com/Yugenjr)**

If you find this project helpful, please consider giving it a ⭐!

</div>




