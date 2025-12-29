# Contributing to Hopeless Catch

Thank you for your interest in contributing to Hopeless Catch! This document provides guidelines for contributing to the project.

## 🎯 Project Overview

Hopeless Catch is a cozy fishing game with horror elements, available in two versions:
- **HTML/CSS/JS Version**: Web-based implementation (in development)
- **Love2D Version**: Complete desktop implementation (reference)

## 🚀 Getting Started

### Prerequisites
- Git
- Modern web browser (for HTML version)
- Love2D (for Love2D version)
- Text editor or IDE

### Setting Up Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/robfernan/Hopeless-Catch-Fishing-Horror-Game.git
   cd Hopeless-Catch-Fishing-Horror-Game
   ```

2. **For Web Version Development**
   ```bash
   cd HTML_CSS_JS
   # Simply open index.html in your browser - no server needed!
   # For live editing with auto-refresh (optional):
   npm install
   npm run dev
   ```

3. **For Love2D Version**
   ```bash
   cd "Love2d Version"
   # Run the .love file with Love2D
   ```

## 📁 Project Structure

```
Hopeless-Catch-Fishing-Horror-Game/
├── README.md                     # Main project documentation
├── CONTRIBUTING.md               # This file
├── HTML_CSS_JS/                  # Web version
│   ├── README.md                 # Web version docs
│   ├── DEVELOPER_GUIDE.md        # Technical details
│   ├── QUICK_START.md            # Quick start guide
│   ├── index.html                # Main game file
│   ├── src/                      # JavaScript source
│   ├── assets/                   # Game assets
│   └── styles/                   # CSS styles
├── Love2d Version/               # Desktop version
│   ├── HopelessCatch.love        # Playable game
│   └── HopelessCatch_Source/     # Lua source code
└── docs/                         # Project documentation
    ├── ANALYSIS_SUMMARY.md       # Development analysis
    ├── IMPLEMENTATION_ROADMAP.md # Development roadmap
    └── *.md                      # Other documentation
```

## 🛠️ Development Areas

### High Priority (Web Version)
1. **Audio System** - Implement Web Audio API for music and sound effects
2. **Menu System** - Create main menu, settings, and pause menus
3. **World Rendering** - Enhance terrain, vegetation, and structures
4. **UI Polish** - Improve tackle box, catch display, and HUD

### Medium Priority
1. **Horror Elements** - Implement atmospheric effects and anomalies
2. **Performance** - Optimize rendering and game loops
3. **Mobile Support** - Add touch controls and responsive design
4. **Accessibility** - Add keyboard navigation and screen reader support

### Documentation
1. **Code Documentation** - Add JSDoc comments
2. **User Guides** - Improve player documentation
3. **Developer Guides** - Enhance technical documentation

## 📝 Contribution Guidelines

### Code Style
- **JavaScript**: Use ES6+ features, consistent indentation (2 spaces)
- **HTML**: Semantic markup, proper nesting
- **CSS**: BEM methodology preferred, mobile-first approach
- **Comments**: Clear, concise explanations for complex logic

### Commit Messages
Use conventional commit format:
```
type(scope): description

Examples:
feat(audio): add background music system
fix(fishing): resolve casting power calculation
docs(readme): update installation instructions
refactor(ui): simplify menu navigation
```

### Pull Request Process
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Pull Request Requirements
- [ ] Code follows project style guidelines
- [ ] Changes are tested and working
- [ ] Documentation is updated if needed
- [ ] Commit messages follow conventional format
- [ ] No breaking changes (unless discussed)

## 🐛 Bug Reports

When reporting bugs, please include:
- **Browser/Platform**: Which browser and version
- **Steps to Reproduce**: Clear steps to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Console Errors**: Any JavaScript errors in browser console

### Bug Report Template
```markdown
**Browser/Platform**: Chrome 120.0.0 / Windows 11

**Steps to Reproduce**:
1. Open the game
2. Press SPACE to cast
3. ...

**Expected Behavior**: 
The fishing line should cast normally

**Actual Behavior**: 
The game freezes when casting

**Console Errors**:
```
TypeError: Cannot read property 'x' of undefined
```

**Screenshots**: 
[Attach if helpful]
```

## 💡 Feature Requests

For feature requests, please:
- Check existing issues first
- Describe the feature clearly
- Explain the use case
- Consider implementation complexity
- Discuss with maintainers before large changes

## 🧪 Testing

### Manual Testing
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test different screen sizes
- Test all game features (fishing, menus, save/load)
- Test edge cases (empty saves, invalid inputs)

### Automated Testing
Currently no automated tests, but contributions welcome for:
- Unit tests for game logic
- Integration tests for systems
- Performance benchmarks

## 📚 Resources

### Learning Resources
- [HTML5 Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Web Audio API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Game Development Patterns](https://gameprogrammingpatterns.com/)

### Project Resources
- [Love2D Documentation](https://love2d.org/wiki/Main_Page) (for reference implementation)
- [Project Analysis](docs/ANALYSIS_SUMMARY.md)
- [Implementation Roadmap](docs/IMPLEMENTATION_ROADMAP.md)

## 🤝 Community

### Communication
- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions and ideas
- **Email**: Contact maintainer for private matters

### Code of Conduct
- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Keep discussions on-topic

## 🏆 Recognition

Contributors will be recognized in:
- README.md credits section
- Release notes for significant contributions
- Special thanks for major features

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## ❓ Questions?

If you have questions about contributing:
1. Check existing documentation
2. Search existing issues
3. Create a new issue with the "question" label
4. Contact the maintainer

---

Thank you for contributing to Hopeless Catch! 🎣

*"Every contribution makes the waters a little less mysterious..."*