export var SpeechManager = function() {
    function SpeechManager(onTranscript, onRecognitionActive, onCommandRecognized) {
        this.onTranscript = onTranscript;
        this.onRecognitionActive = onRecognitionActive;
        this.onCommandRecognized = onCommandRecognized;
        this.recognition = null;
        this.isRecognizing = false;
        this.restartTimeout = null;
        
        var self = this;
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';
            
            this.recognition.onstart = function() {
                self.isRecognizing = true;
                console.log('[SpeechManager] Listening...');
                if (self.onRecognitionActive) self.onRecognitionActive(true);
            };
            
            this.recognition.onresult = function(event) {
                var transcript = '';
                var isFinal = false;
                
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        isFinal = true;
                    }
                }
                
                if (isFinal && transcript.trim()) {
                    console.log('[SpeechManager] Recognized:', transcript.trim());
                    self.processCommand(transcript.trim().toLowerCase());
                }
            };
            
            this.recognition.onerror = function(event) {
                console.error('[SpeechManager] Error:', event.error);
                
                if (event.error === 'no-speech') {
                    console.log('[SpeechManager] No speech detected');
                    return;
                }
                
                self.isRecognizing = false;
                if (self.onRecognitionActive) self.onRecognitionActive(false);
            };
            
            this.recognition.onend = function() {
                self.isRecognizing = false;
                if (self.onRecognitionActive) self.onRecognitionActive(false);
                
                console.log('[SpeechManager] Restarting in 300ms...');
                clearTimeout(self.restartTimeout);
                self.restartTimeout = setTimeout(function() {
                    self.startRecognition();
                }, 300);
            };
        }
    }
    
    SpeechManager.prototype.processCommand = function(text) {
        var modeMap = {
            'drag': 'drag',
            'rotate': 'rotate',
            'rotation': 'rotate',
            'scale': 'scale',
            'size': 'scale',
            'zoom': 'scale',
            'animate': 'animate',
            'animation': 'animate'
        };
        
        for (var key in modeMap) {
            if (text.includes(key)) {
                console.log('[SpeechManager] Mode:', modeMap[key]);
                if (this.onCommandRecognized) {
                    this.onCommandRecognized(modeMap[key]);
                }
                return;
            }
        }
        
        if (this.onCommandRecognized) {
            this.onCommandRecognized(text);
        }
    };
    
    SpeechManager.prototype.startRecognition = function() {
        if (!this.recognition || this.isRecognizing) return;
        
        try {
            console.log('[SpeechManager] Starting...');
            this.recognition.start();
        } catch (e) {
            console.error('[SpeechManager] Error:', e.message);
        }
    };
    
    SpeechManager.prototype.stopRecognition = function() {
        if (this.recognition && this.isRecognizing) {
            this.recognition.stop();
        }
        clearTimeout(this.restartTimeout);
    };
    
    SpeechManager.prototype.requestPermissionAndStart = function() {
        var self = this;
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
            stream.getTracks().forEach(function(track) { track.stop(); });
            console.log('[SpeechManager] Microphone permission granted');
            self.startRecognition();
        }).catch(function(err) {
            console.error('[SpeechManager] Microphone denied:', err.message);
        });
    };
    
    return SpeechManager;
}();
