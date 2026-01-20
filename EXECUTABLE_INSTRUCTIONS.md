# Create Executable Instructions

## Option 1: Easy Run Scripts (Recommended)
Just double-click one of these files:
- `run_3d_playground.bat` (Windows batch file)
- `run_3d_playground.ps1` (PowerShell script)

## Option 2: Create Standalone Executable

### Step 1: Install PyInstaller
```bash
pip install -r requirements.txt
```

### Step 2: Create the executable
```bash
pyinstaller --onefile --windowed --add-data "*.html;." --add-data "*.css;." --add-data "*.js;." --add-data "assets;assets" --name "3D-Model-Playground" launcher.py
```

### Step 3: Copy web files to dist folder
After creating the executable, copy these files to the same folder as the .exe:
- index.html
- styles.css
- *.js files
- assets/ folder

## Option 3: Portable Folder
Create a folder with:
1. All project files
2. One of the run scripts
3. Share the entire folder

## Usage on Another Laptop
1. Copy the entire project folder to the new laptop
2. Make sure Python is installed (if using scripts)
3. Double-click the run script or executable
4. Allow camera/microphone access in browser

## Requirements
- Python 3.6+ (for scripts)
- Modern web browser with WebGL support
- Camera and microphone for full functionality