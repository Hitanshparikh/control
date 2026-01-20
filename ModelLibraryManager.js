/**
 * ModelLibraryManager - Manages model selection and library UI
 */
export class ModelLibraryManager {
    constructor(gameInstance) {
        this.game = gameInstance;
        
        // Sample models library - you can expand this with more URLs
        this.models = [
            {
                name: 'Stan (Default)',
                path: './assets/Stan.gltf',
                description: 'Animated character model'
            },
            {
                name: 'Dancing Robot',
                path: 'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb',
                description: 'Expressive robot model'
            },
            {
                name: 'Fox',
                path: 'https://threejs.org/examples/models/gltf/Fox/Fox.glb',
                description: 'Animated fox model'
            },
            {
                name: 'Parrot',
                path: 'https://threejs.org/examples/models/gltf/Parrot/Parrot.glb',
                description: 'Flying parrot model'
            }
        ];

        this.currentLoadingModel = null;
        this.setupUI();
    }

    setupUI() {
        // Panel elements
        this.libraryPanel = document.getElementById('model-library-panel');
        this.closeLibraryBtn = document.getElementById('close-library-btn');
        this.modelsBtn = document.getElementById('models-btn');
        this.modelList = document.getElementById('model-list');
        this.uploadInput = document.getElementById('upload-model');

        // Event listeners
        this.modelsBtn.addEventListener('click', () => this.togglePanel());
        this.closeLibraryBtn.addEventListener('click', () => this.togglePanel());
        this.uploadInput.addEventListener('change', (e) => this.handleFileUpload(e));

        // Find upload label and make it trigger file input
        const uploadLabel = document.querySelector('.upload-label');
        if (uploadLabel) {
            uploadLabel.addEventListener('click', () => this.uploadInput.click());
        }

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (this.libraryPanel.classList.contains('active') &&
                !this.libraryPanel.contains(e.target) &&
                !this.modelsBtn.contains(e.target)) {
                this.togglePanel();
            }
        });

        // Populate model list
        this.populateModelList();
    }

    togglePanel() {
        this.libraryPanel.classList.toggle('active');
    }

    populateModelList() {
        this.modelList.innerHTML = '';
        
        this.models.forEach(model => {
            const modelItem = document.createElement('div');
            modelItem.className = 'model-item';
            modelItem.innerHTML = `
                <div style="font-weight: 500;">${model.name}</div>
                <div style="font-size: 12px; color: #718096; margin-top: 4px;">${model.description}</div>
            `;
            modelItem.addEventListener('click', () => this.loadModel(model));
            this.modelList.appendChild(modelItem);
        });
        
        // Reinitialize Lucide icons after dynamically adding content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    loadModel(model) {
        if (this.currentLoadingModel) {
            console.warn('A model is already loading');
            return;
        }

        this.currentLoadingModel = model.name;
        console.log(`Loading model: ${model.name}`);

        // Visual feedback
        const items = this.modelList.querySelectorAll('.model-item');
        items.forEach(item => {
            if (item.textContent.includes(model.name)) {
                item.classList.add('loading');
            }
        });

        // Load the model
        if (model.path.startsWith('http')) {
            // Load from URL
            this.loadModelFromUrl(model.path, model.name);
        } else {
            // Load from local path
            this.loadModelFromLocalPath(model.path, model.name);
        }
    }

    loadModelFromLocalPath(path, name) {
        fetch(path)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(content => {
                this.game._parseAndLoadGltf(content, name, 'model/gltf+json');
                this.currentLoadingModel = null;
                this.populateModelList();
                this.togglePanel();
            })
            .catch(error => {
                console.error(`Error loading model ${name}:`, error);
                this.game._showError(`Failed to load ${name}`);
                this.currentLoadingModel = null;
                this.populateModelList();
            });
    }

    loadModelFromUrl(url, name) {
        // Create a proxy URL if needed (CORS handling)
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const fetchUrl = url; // Direct URL attempt first

        fetch(fetchUrl)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.arrayBuffer();
            })
            .then(buffer => {
                this.game._parseAndLoadGltf(buffer, name, 'model/gltf-binary');
                this.currentLoadingModel = null;
                this.populateModelList();
                this.togglePanel();
            })
            .catch(error => {
                console.error(`Error loading model ${name} from URL:`, error);
                this.game._showError(`Failed to load ${name} from URL`);
                this.currentLoadingModel = null;
                this.populateModelList();
            });
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            console.log('Uploading custom model:', file.name);
            this.game._loadDroppedModel(file);
            this.uploadInput.value = '';
            
            // Close panel after upload
            setTimeout(() => {
                this.togglePanel();
            }, 500);
        }
    }

    addCustomModel(name, path) {
        // Allow users to add custom models to the library
        const customModel = {
            name: name,
            path: path,
            description: 'Custom model'
        };
        this.models.push(customModel);
        this.populateModelList();
    }
}
