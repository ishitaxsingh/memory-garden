class DigitalGarden {
    constructor() {
        this.memories = JSON.parse(localStorage.getItem('gardenMemories')) || [];
        this.plants = JSON.parse(localStorage.getItem('gardenPlants')) || [];
        this.leafCount = 0;
        this.plantCount = 0;
        // Generate a unique user ID for sharing
        this.userId = localStorage.getItem('gardenUserId') || this.generateUserId();
        localStorage.setItem('gardenUserId', this.userId);
        
        this.quotes = [
            "In the garden of memories, every leaf tells a story of growth.",
            "Water your thoughts with kindness, and watch them bloom.",
            "The most beautiful gardens are grown from the seeds of patience.",
            "Every memory is a leaf that adds beauty to the tree of life.",
            "In stillness, we find the wisdom that grows like gentle leaves.",
            "The garden of the heart grows wild with love and tenderness.",
            "Each moment is a seed that can grow into something beautiful.",
            "Like leaves in the wind, our thoughts dance and find their place.",
            "The earth has music for those who listen with their hearts.",
            "Growth happens in the quiet spaces between our thoughts.",
            "Every leaf that falls makes room for new growth.",
            "The garden of memories is watered with tears of joy and sorrow.",
            "In the gentle rhythm of nature, we find our own peace.",
            "The most precious flowers bloom in the garden of gratitude.",
            "Like morning dew, fresh thoughts nourish the soul.",
            "Every memory planted with love grows into something beautiful.",
            "The garden of the mind flourishes with gentle care.",
            "In the soft light of dawn, new possibilities bloom.",
            "The heart's garden grows wild with the seeds of hope.",
            "Each leaf whispers secrets of growth and renewal."
        ];
        
        this.leafReflections = [
            "This memory reminds you of growth and resilience.",
            "A gentle reminder that every experience shapes who you are.",
            "This thought carries the wisdom of your journey.",
            "Like a leaf in the wind, this memory dances with possibility.",
            "This reflection holds the quiet strength of your inner garden.",
            "A moment of peace that grows more beautiful with time.",
            "This memory is a seed of hope that continues to bloom.",
            "Like morning dew, this thought nourishes your soul.",
            "A gentle whisper of love and understanding.",
            "This memory is a bridge between past and future growth.",
            "A reminder that every leaf has its own unique beauty.",
            "This thought carries the fragrance of your personal journey.",
            "Like roots in the earth, this memory grounds you.",
            "A gentle breeze of wisdom from your inner garden.",
            "This reflection is a testament to your continuous growth.",
            "Like sunlight through leaves, this memory illuminates your path.",
            "A gentle reminder that growth happens in quiet moments.",
            "This thought is a flower that blooms in the garden of your mind.",
            "Like a leaf that turns toward the sun, this memory guides you.",
            "A gentle whisper of the wisdom you carry within."
        ];
        
        this.init();
    }

    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    init() {
        this.setupEventListeners();
        this.loadExistingMemories();
        this.createFloatingParticles();
        this.startPlantGrowth();
        this.loadSharedGarden(); // Load shared garden on initialization
    }

    setupEventListeners() {
        const addMemoryBtn = document.getElementById('addMemoryBtn');
        const memoryInput = document.getElementById('memoryInput');
        const waterBtn = document.getElementById('waterBtn');
        const closeQuoteBtn = document.getElementById('closeQuoteBtn');
        const quoteModal = document.getElementById('quoteModal');

        addMemoryBtn.addEventListener('click', () => this.addMemory());
        memoryInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.addMemory();
            }
        });

        waterBtn.addEventListener('click', () => this.showQuote());
        closeQuoteBtn.addEventListener('click', () => this.hideQuote());
        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) {
                this.hideQuote();
            }
        });
    }

    addMemory() {
        console.log('🌱 Adding memory...');
        const memoryInput = document.getElementById('memoryInput');
        const memoryText = memoryInput.value.trim();

        if (memoryText === '') {
            console.log('🌱 Empty memory text, using default...');
            // Use a default welcome message if empty
            const welcomeText = 'Welcome to your digital garden! 🌱';
            this.createMemory(welcomeText);
            return;
        }

        this.createMemory(memoryText);
    }

    createMemory(memoryText) {
        console.log('🌱 Creating memory:', memoryText);
        
        const memory = {
            id: Date.now(),
            text: memoryText,
            timestamp: new Date().toISOString(),
            userId: this.userId,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        console.log('🌱 Memory object:', memory);

        this.memories.push(memory);
        this.saveMemories();
        this.createLeaf(memory);
        
        // Clear input if it exists
        const memoryInput = document.getElementById('memoryInput');
        if (memoryInput) {
            memoryInput.value = '';
        }
        
        // Gentle feedback
        this.showGentleMessage('Memory planted with love...');
        console.log('✅ Memory created and leaf planted!');
    }



    createLeaf(memory) {
        console.log('🌿 Creating leaf for memory:', memory.text);
        
        const plantContainer = document.getElementById('plantContainer');
        if (!plantContainer) {
            console.error('❌ Plant container not found!');
            return;
        }

        // Calculate floating leaf position
        const leafPosition = this.calculateFloatingLeafPosition();
        console.log('🌿 Leaf position:', leafPosition);
        
        const leaf = document.createElement('div');
        leaf.className = 'leaf floating-leaf';
        leaf.style.left = `${leafPosition.x}px`;
        leaf.style.top = `${leafPosition.y}px`;
        leaf.style.transform = `rotate(${leafPosition.angle}deg)`;
        leaf.setAttribute('data-memory-id', memory.id);
        leaf.setAttribute('data-user-id', memory.userId);

        // Create leaf content with date
        const content = document.createElement('div');
        content.className = 'leaf-content';
        
        // Add memory text
        const memoryTextElement = document.createElement('div');
        memoryTextElement.className = 'memory-text';
        memoryTextElement.textContent = memory.text;
        content.appendChild(memoryTextElement);
        
        // Add date
        const dateElement = document.createElement('div');
        dateElement.className = 'memory-date';
        dateElement.textContent = memory.date;
        content.appendChild(dateElement);

        leaf.appendChild(content);
        plantContainer.appendChild(leaf);

        console.log('🌿 Leaf created and added to garden');

        // Add hover event for leaf-specific reflection
        leaf.addEventListener('mouseenter', () => this.showLeafReflection(memory));
        leaf.addEventListener('mouseleave', () => this.hideLeafReflection());

        this.leafCount++;
        console.log('🌿 Total leaf count:', this.leafCount);

        // Gentle sound effect
        this.playGentleSound();
    }



    calculateFloatingLeafPosition() {
        const container = document.getElementById('plantContainer');
        const containerRect = container.getBoundingClientRect();
        
        // Create a more natural floating distribution
        const angle = (this.leafCount * 137.5) % 360; // Golden angle
        const radius = 80 + (this.leafCount * 15); // Smaller radius for floating
        const x = containerRect.width / 2 + Math.cos(angle * Math.PI / 180) * radius;
        const y = containerRect.height / 2 + Math.sin(angle * Math.PI / 180) * radius;
        const rotation = (this.leafCount * 30) % 360; // Natural rotation
        
        return { x, y, angle: rotation };
    }

    loadExistingMemories() {
        this.memories.forEach((memory, index) => {
            // Stagger the loading animation
            setTimeout(() => {
                this.createLeaf(memory);
            }, index * 300);
        });
    }

    showLeafReflection(memory) {
        const reflection = this.leafReflections[memory.id % this.leafReflections.length];
        const memoryText = memory.text;
        const memoryDate = memory.date || new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const reflectionModal = document.createElement('div');
        reflectionModal.className = 'leaf-reflection-modal';
        reflectionModal.innerHTML = `
            <div class="reflection-memory">"${memoryText}"</div>
            <div class="reflection-date">${memoryDate}</div>
            <div class="reflection-text">${reflection}</div>
        `;
        
        document.body.appendChild(reflectionModal);
        
        // Show with gentle animation
        setTimeout(() => {
            reflectionModal.style.display = 'block';
            reflectionModal.style.opacity = '0';
            reflectionModal.style.transform = 'translate(-50%, -50%) scale(0.8)';
            
            setTimeout(() => {
                reflectionModal.style.transition = 'all 0.3s ease';
                reflectionModal.style.opacity = '1';
                reflectionModal.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
        }, 100);
    }

    hideLeafReflection() {
        const reflectionModal = document.querySelector('.leaf-reflection-modal');
        if (reflectionModal) {
            reflectionModal.remove();
        }
    }

    showMemoryDetails(memory) {
        const date = new Date(memory.timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const details = `"${memory.text}"\n\nPlanted on ${date}`;
        
        this.showGentleModal(details, 'Memory Details');
    }

    startPlantGrowth() {
        // Simulate natural plant growth over time
        setInterval(() => {
            if (this.memories.length > 0 && Math.random() < 0.3) {
                // Occasionally add a new leaf to existing plants
                const randomMemory = this.memories[Math.floor(Math.random() * this.memories.length)];
                if (randomMemory) {
                    this.showGentleMessage('A new leaf is growing...');
                }
            }
        }, 30000); // Check every 30 seconds
    }

    showQuote() {
        const quoteText = document.getElementById('quoteText');
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        quoteText.textContent = randomQuote;
        
        const modal = document.getElementById('quoteModal');
        modal.style.display = 'flex';
        modal.style.animation = 'fadeIn 0.5s ease-out';
    }

    hideQuote() {
        const modal = document.getElementById('quoteModal');
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    showGentleMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.9);
            padding: 1rem 2rem;
            border-radius: 20px;
            color: #2c5530;
            font-family: 'Crimson Text', serif;
            font-style: italic;
            z-index: 1000;
            box-shadow: 0 8px 32px rgba(44, 85, 48, 0.2);
            animation: gentleFloat 2s ease-out;
        `;

        document.body.appendChild(messageEl);

        setTimeout(() => {
            messageEl.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 500);
        }, 2000);
    }

    showGentleModal(content, title) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: rgba(255, 255, 255, 0.95);
            padding: 2rem;
            border-radius: 20px;
            max-width: 400px;
            margin: 2rem;
            text-align: center;
            position: relative;
            box-shadow: 0 20px 40px rgba(44, 85, 48, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            font-family: 'Crimson Text', serif;
            color: #2c5530;
            line-height: 1.6;
            white-space: pre-line;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #5a7c65;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        `;

        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modalContent.innerHTML = `<h3 style="margin-bottom: 1rem; font-family: 'Playfair Display', serif;">${title}</h3>${content}`;
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    createFloatingParticles() {
        setInterval(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: rgba(144, 238, 144, 0.2);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: 100vh;
                pointer-events: none;
                z-index: 1;
                animation: float 8s linear forwards;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    document.body.removeChild(particle);
                }
            }, 8000);
        }, 3000);
    }

    playGentleSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    saveMemories() {
        localStorage.setItem('gardenMemories', JSON.stringify(this.memories));
    }

    shareGarden() {
        // Create a simple sharing mechanism using URL parameters
        const gardenData = {
            memories: this.memories,
            userId: this.userId
        };
        
        // Encode the garden data
        const encodedData = btoa(JSON.stringify(gardenData));
        const shareUrl = `${window.location.origin}${window.location.pathname}?garden=${encodedData}`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
            this.showGentleMessage('Garden link copied! Share with friends... 🌿');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showGentleMessage('Garden link copied! Share with friends... 🌿');
        });
    }

    loadSharedGarden() {
        const urlParams = new URLSearchParams(window.location.search);
        const gardenParam = urlParams.get('garden');
        
        if (gardenParam) {
            try {
                const gardenData = JSON.parse(atob(gardenParam));
                if (gardenData.memories && gardenData.memories.length > 0) {
                    // Load shared memories
                    this.memories = [...this.memories, ...gardenData.memories];
                    this.saveMemories();
                    
                    // Clear existing leaves and reload
                    const plantContainer = document.getElementById('plantContainer');
                    if (plantContainer) {
                        plantContainer.innerHTML = '';
                    }
                    
                    this.leafCount = 0;
                    this.loadExistingMemories();
                    
                    this.showGentleMessage('Shared garden memories added to your garden... 🌱');
                }
            } catch (error) {
                console.error('Error loading shared garden:', error);
            }
        }
    }

}

// Add CSS animations for modal and leaf reflections
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
    }

    .plant-stem {
        position: absolute;
        z-index: 3;
    }

    .main-stem {
        width: 8px;
        height: 200px;
        background: linear-gradient(180deg, #228B22 0%, #32CD32 50%, #228B22 100%);
        border-radius: 4px;
        position: relative;
    }

    .leaf-reflection-modal {
        position: fixed;
        background: rgba(255, 255, 255, 0.95);
        padding: 1rem;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(44, 85, 48, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        font-family: 'Crimson Text', serif;
        color: #2c5530;
        z-index: 1000;
        max-width: 250px;
        animation: fadeIn 0.3s ease-out;
    }

    .reflection-memory {
        font-style: italic;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: #5a7c65;
    }

    .reflection-date {
        font-size: 0.7rem;
        color: #888;
        margin-bottom: 0.5rem;
    }

    .reflection-text {
        font-size: 0.8rem;
        line-height: 1.4;
    }
`;
document.head.appendChild(style);

// Initialize the garden when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌱 Digital Garden initializing...');
    try {
        const garden = new DigitalGarden();
        console.log('✅ Digital Garden initialized successfully');
        
        // Add a test memory if none exist
        const memories = JSON.parse(localStorage.getItem('gardenMemories')) || [];
        if (memories.length === 0) {
            console.log('🌱 No memories found, adding a welcome memory...');
            garden.addMemory();
        }
    } catch (error) {
        console.error('❌ Error initializing Digital Garden:', error);
    }
});

// Add some gentle ambient effects
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (e.clientX * speed) / window.innerWidth;
        const y = (e.clientY * speed) / window.innerHeight;
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
}); 