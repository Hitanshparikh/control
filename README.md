# 🎮 3D Model Control Playground

> **Interactive 3D model manipulation through gesture recognition and voice commands**

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/Hitanshparikh/control)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://github.com/Hitanshparikh/control)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

## 🌟 Overview

**3D Model Control** is a cutting-edge web application that brings futuristic interaction to 3D models. Using advanced computer vision and speech recognition technologies, users can intuitively control 3D objects through natural hand gestures and voice commands - no controllers required!

### ✨ Key Features

- 🗣️ **Voice Control**: Say "drag", "rotate", "scale", or "animate" to switch interaction modes
- ✋ **Hand Gesture Recognition**: Pinch and gesture to manipulate 3D models in real-time
- 📁 **Drag & Drop Support**: Import custom 3D models (GLB/GLTF format) instantly
- 🎨 **Real-time Rendering**: Smooth 3D graphics with WebGL acceleration
- 📱 **Cross-platform**: Works on desktop and mobile browsers
- 🎮 **Multiple Interaction Modes**: Seamlessly switch between different control schemes

## 🚀 Quick Start

### Prerequisites

- Modern web browser with WebGL 2.0 support
- Camera access for gesture recognition
- Microphone access for voice commands
- Internet connection for CDN resources

### Installation & Setup

#### Option 1: Direct Launch (Recommended)
```bash
# Clone the repository
git clone https://github.com/Hitanshparikh/control.git
cd control

# Run the application (Windows)
.\run_3d_playground.bat

# Or use PowerShell
.\run_3d_playground.ps1

# Or use Python launcher
python launcher.py
```

#### Option 2: Manual Setup
```bash
# Clone the repository
git clone https://github.com/Hitanshparikh/control.git
cd control

# Start a local web server
python -m http.server 8080
# Or use Node.js
npx serve .
# Or use PHP
php -S localhost:8080
```

Then navigate to `http://localhost:8080` in your browser.

## 🎯 How to Use

1. **Grant Permissions**: Allow camera and microphone access when prompted
2. **Voice Commands**: 
   - Say **"drag"** to enter drag mode
   - Say **"rotate"** to rotate the model
   - Say **"scale"** to resize the model
   - Say **"animate"** to play model animations
3. **Hand Gestures**: Use pinch gestures to control the active interaction mode
4. **Model Import**: Drag and drop GLB/GLTF files onto the viewport to load new models

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Three.js** | 3D rendering engine | Latest |
| **MediaPipe** | Hand tracking & gesture recognition | Web |
| **Web Speech API** | Voice command recognition | Native |
| **WebGL** | Hardware-accelerated graphics | 2.0 |
| **JavaScript (ES6+)** | Core application logic | Modern |
| **HTML5 Canvas** | Visual feedback & UI elements | - |

## 📁 Project Structure

```
control/
├── 📄 index.html              # Main application entry point
├── 🎨 styles.css              # Application styling
├── ⚙️ main.js                 # Core application logic
├── 🎮 game.js                 # 3D scene management
├── 🎙️ SpeechManager.js        # Voice command processing
├── 📞 audioManager.js         # Audio system management
├── ⚙️ SettingsManager.js      # Application configuration
├── 📚 ModelLibraryManager.js  # 3D model management
├── 🚀 launcher.py             # Python web server launcher
├── 🦇 run_3d_playground.bat   # Windows batch launcher
├── 💻 run_3d_playground.ps1   # PowerShell launcher
├── 📋 requirements.txt        # Python dependencies
├── 📁 assets/                 # 3D models and media files
│   ├── Stan.gltf              # Default 3D character model
│   └── siteOGImage.jpg        # Social media preview image
└── 📁 reference_project/      # Reference implementation
```

## ⚡ Performance Features

- **Optimized Rendering**: Efficient Three.js rendering pipeline
- **Gesture Caching**: Smart hand tracking with performance optimization
- **Memory Management**: Automatic cleanup of loaded models
- **Responsive Design**: Adapts to different screen sizes and devices
- **Error Recovery**: Graceful fallbacks for missing permissions or unsupported features

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow ES6+ JavaScript standards
- Maintain consistent code formatting
- Test across multiple browsers
- Document new features thoroughly
- Optimize for performance

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Camera not detected | Check browser permissions and ensure camera is connected |
| Voice commands not working | Verify microphone access and try speaking clearly |
| Model not loading | Ensure GLB/GLTF file is valid and under 50MB |
| Performance issues | Close other browser tabs and ensure WebGL 2.0 support |

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits & Acknowledgments

### Core Technologies
- [Three.js](https://threejs.org/) - 3D graphics library
- [MediaPipe](https://mediapipe.dev/) - ML framework for hand tracking
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) - Browser speech recognition

### 3D Models & Assets
- [Quaternius](https://quaternius.com/) - High-quality 3D models
- Default character model: Stan.gltf

## 👨‍💻 Author

**Hitansh Parikh**
- 🐙 GitHub: [@Hitanshparikh](https://github.com/Hitanshparikh)
- 📧 Email: [Your Email Here]
- 🌐 Portfolio: [Your Website Here]
- 💼 LinkedIn: [Your LinkedIn Here]

---

<div align="center">

### 🌟 Star this repository if you found it helpful!

**Built with ❤️ by Hitansh Parikh**

[⬆ Back to Top](#-3d-model-control-playground)

</div>