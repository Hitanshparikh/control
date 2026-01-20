/**
 * SettingsManager - Manages application settings and features
 */
export class SettingsManager {
    constructor(gameInstance) {
        this.game = gameInstance;
        
        // Settings state
        this.settings = {
            voiceControl: true,
            handTracking: true,
            animations: true
        };

        // Load settings from localStorage
        this.loadSettings();
        
        // Setup UI elements
        this.setupUI();
        
        // Apply initial settings
        this.applySettings();
    }

    setupUI() {
        // Settings panel elements
        this.settingsPanel = document.getElementById('settings-panel');
        this.closeSettingsBtn = document.getElementById('close-settings-btn');
        this.settingsBtn = document.getElementById('settings-btn');
        
        // Toggle elements
        this.voiceControlToggle = document.getElementById('voice-control-toggle');
        this.handTrackingToggle = document.getElementById('hand-tracking-toggle');
        this.animationsToggle = document.getElementById('animations-toggle');

        // Event listeners
        this.settingsBtn.addEventListener('click', () => this.togglePanel());
        this.closeSettingsBtn.addEventListener('click', () => this.togglePanel());
        
        this.voiceControlToggle.addEventListener('change', () => this.handleVoiceControlChange());
        this.handTrackingToggle.addEventListener('change', () => this.handleHandTrackingChange());
        this.animationsToggle.addEventListener('change', () => this.handleAnimationsChange());

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (this.settingsPanel.classList.contains('active') &&
                !this.settingsPanel.contains(e.target) &&
                !this.settingsBtn.contains(e.target)) {
                this.togglePanel();
            }
        });
    }

    togglePanel() {
        this.settingsPanel.classList.toggle('active');
    }

    handleVoiceControlChange() {
        this.settings.voiceControl = this.voiceControlToggle.checked;
        
        if (this.settings.voiceControl) {
            // Enable voice control
            if (this.game.speechManager) {
                this.game.speechManager.requestPermissionAndStart();
            }
        } else {
            // Disable voice control
            if (this.game.speechManager) {
                this.game.speechManager.stop();
            }
        }
        
        this.saveSettings();
    }

    handleHandTrackingChange() {
        this.settings.handTracking = this.handTrackingToggle.checked;
        
        if (!this.settings.handTracking) {
            // Stop hand tracking
            if (this.game.handLandmarker) {
                this.game.handLandmarker.close();
                console.log('Hand tracking disabled');
            }
        } else {
            // Resume hand tracking
            console.log('Hand tracking enabled');
            // Hand tracking will resume naturally in the next detection cycle
        }
        
        this.saveSettings();
    }

    handleAnimationsChange() {
        this.settings.animations = this.animationsToggle.checked;
        
        const animButtonsContainer = document.getElementById('animation-buttons-container');
        
        if (!this.settings.animations) {
            // Stop all animations
            if (this.game.animationMixer) {
                this.game.animationMixer.stopAllAction();
            }
            // Hide animation buttons
            if (animButtonsContainer) {
                animButtonsContainer.style.display = 'none';
            }
        } else {
            // Show animation buttons if they exist
            if (animButtonsContainer && this.game.interactionMode === 'animate') {
                animButtonsContainer.style.display = 'flex';
            }
        }
        
        this.saveSettings();
    }

    applySettings() {
        // Apply saved settings to UI
        this.voiceControlToggle.checked = this.settings.voiceControl;
        this.handTrackingToggle.checked = this.settings.handTracking;
        this.animationsToggle.checked = this.settings.animations;
    }

    saveSettings() {
        localStorage.setItem('appSettings', JSON.stringify(this.settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('appSettings');
        if (saved) {
            try {
                this.settings = JSON.parse(saved);
            } catch (e) {
                console.warn('Failed to load settings:', e);
            }
        }
    }

    isVoiceControlEnabled() {
        return this.settings.voiceControl;
    }

    isHandTrackingEnabled() {
        return this.settings.handTracking;
    }

    isAnimationsEnabled() {
        return this.settings.animations;
    }
}
