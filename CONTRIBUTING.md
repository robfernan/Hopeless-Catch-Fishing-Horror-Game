# Contributing to Hopeless Catch

Thank you for your interest in contributing to Hopeless Catch! This document provides guidelines and instructions for contributing to the project.

## Project Structure

The project contains multiple implementations of the Hopeless Catch fishing horror game:

- **Love2d Version/** - Original LÖVE 2D desktop game (Lua)
- **Love2d_Web/** - WebAssembly port compiled with love.js
- **HTML_CSS_JS/** - HTML/CSS/JavaScript implementation
- **Lovable/** - React/Tailwind CSS implementation

## Getting Started

### For LÖVE 2D Development
1. Install LÖVE 2D from https://love2d.org/
2. Navigate to `Love2d Version/HopelessCatch_Source/`
3. Run: `love .`

### For Web Development
1. Navigate to `Love2d_Web/`
2. Run the local server: `python3 serve.py`
3. Open `http://localhost:3000/` in your browser

### For HTML/CSS/JS Development
1. Navigate to `HTML_CSS_JS/`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

### For React/Tailwind Development
1. Navigate to `Lovable/`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Making Changes

1. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test thoroughly in the appropriate environment
4. Commit with clear messages: `git commit -m "Add feature: description"`
5. Push to your branch: `git push origin feature/your-feature-name`
6. Open a pull request with a description of your changes

## Code Style

- **Lua**: Follow LÖVE 2D conventions
- **JavaScript**: Use consistent indentation (2 spaces)
- **React**: Follow React best practices and component patterns
- **CSS**: Use Tailwind CSS classes where applicable

## Testing

Before submitting a pull request:
- Test your changes in the appropriate environment
- Verify no existing functionality is broken
- Test on multiple browsers for web versions
- Check for console errors and warnings

## Reporting Issues

If you find a bug or have a suggestion:
1. Check existing issues to avoid duplicates
2. Provide a clear description of the issue
3. Include steps to reproduce (for bugs)
4. Mention your environment (OS, browser, etc.)

## Documentation

- Update relevant README files when adding features
- Add comments to complex code sections
- Keep documentation in sync with code changes

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

## Questions?

Feel free to open an issue or discussion if you have questions about contributing.
