// ================ MAIN INITIALIZATION ================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Smart Campus Platform Initializing...');
    
    // FIRST: Make everything visible immediately
    showAllContent();
    
    // THEN: Initialize animations
    setTimeout(() => {
        initAllComponents();
    }, 100);
    
    console.log('All components initialized successfully!');
});

// ================ IMMEDIATELY SHOW ALL CONTENT ================
function showAllContent() {
    // Remove all opacity: 0 and transform styles
    document.querySelectorAll('*').forEach(el => {
        if (el.style.opacity === '0') el.style.opacity = '1';
        if (el.style.transform && el.style.transform.includes('translate')) {
            el.style.transform = 'none';
        }
    });
    
    // Specifically target problematic elements
    const elementsToShow = [
        '.hero h1', '.hero p', '.hero-buttons', '.stats-counter',
        '.section-title', '.problem-card', '.dashboard-container',
        '.calculator-container', '.chart-container', '.alert-container',
        '.timeline-item', '.process-step', '.building'
    ];
    
    elementsToShow.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.visibility = 'visible';
        });
    });
    
    // Make sure body is visible
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
}

// ================ INITIALIZE ALL COMPONENTS ================
function initAllComponents() {
    initCursor();
    initNavbar();
    initAnimations();
    initWhiteboard();
    createCampusMap();
    initProcessSteps();
    initCharts();
    initROICalculator();
    initTimeline();
    initSmoothScroll();
    initLiveTime();
    initInteractions();
}

// ================ CUSTOM CURSOR (SIMPLIFIED) ================
function initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
}

// ================ NAVBAR SCROLL EFFECT ================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ================ ANIMATIONS (SIMPLIFIED - NO GSAP) ================
function initAnimations() {
    // Use IntersectionObserver for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all animated elements
    document.querySelectorAll('.problem-card, .dashboard-container, .calculator-container, .timeline-item, .chart-container, .alert-container').forEach(el => {
        observer.observe(el);
    });
    
    // Animate stat numbers
    animateStats();
}

// ================ ANIMATE STATS ================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count')) || 0;
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.round(current);
        }, 30);
    });
}

// ================ WHITEBOARD ANIMATION (SIMPLIFIED) ================
function initWhiteboard() {
    const canvas = document.getElementById('whiteboardCanvas');
    if (!canvas) return;
    
    // Create a simple drawing
    canvas.innerHTML = `
        <svg width="100%" height="100%">
            <rect x="50" y="100" width="200" height="150" stroke="#2A5CAA" stroke-width="3" fill="none" 
                  style="stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 2s ease-in-out forwards 0.5s"/>
            
            <!-- Windows -->
            <rect x="80" y="120" width="30" height="30" fill="#2A5CAA" opacity="0" style="animation: fadeIn 0.5s ease forwards 1.5s"/>
            <rect x="130" y="120" width="30" height="30" fill="#2A5CAA" opacity="0" style="animation: fadeIn 0.5s ease forwards 1.8s"/>
            <rect x="180" y="120" width="30" height="30" fill="#2A5CAA" opacity="0" style="animation: fadeIn 0.5s ease forwards 2.1s"/>
            
            <!-- Energy flow -->
            <line x1="250" y1="100" x2="350" y2="50" stroke="#FF6B35" stroke-width="2" 
                  stroke-dasharray="10,5" opacity="0" style="animation: fadeIn 1s ease forwards 2.5s"/>
            <circle cx="350" cy="50" r="10" fill="#FF6B35" opacity="0" style="animation: fadeIn 0.5s ease forwards 2.5s"/>
        </svg>
    `;
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes draw {
            to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ================ CAMPUS MAP ================
function createCampusMap() {
    const campusMap = document.querySelector('.campus-map');
    if (!campusMap) return;
    
    const buildings = [
        { name: 'Science Block', icon: '🔬', energy: 75, x: '15%', y: '20%' },
        { name: 'Library', icon: '📚', energy: 45, x: '65%', y: '30%' },
        { name: 'Admin', icon: '🏛️', energy: 60, x: '25%', y: '50%' },
        { name: 'Dorm A', icon: '🏠', energy: 85, x: '75%', y: '15%' },
        { name: 'Lecture Hall', icon: '🎓', energy: 55, x: '50%', y: '65%' },
        { name: 'Gymnasium', icon: '🏀', energy: 90, x: '10%', y: '70%' }
    ];
    
    buildings.forEach((building, index) => {
        const buildingEl = document.createElement('div');
        buildingEl.className = 'building';
        buildingEl.style.left = building.x;
        buildingEl.style.top = building.y;
        
        buildingEl.innerHTML = `
            <div class="building-icon">${building.icon}</div>
            <div style="font-weight: 600; font-size: 0.9rem; margin-top: 5px;">${building.name}</div>
            <div class="building-energy">
                <div class="building-energy-fill" style="width: ${building.energy}%"></div>
            </div>
            <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">${building.energy}% load</div>
        `;
        
        campusMap.appendChild(buildingEl);
        
        // Animate appearance
        setTimeout(() => {
            buildingEl.style.opacity = '1';
            buildingEl.style.transform = 'translateY(0)';
        }, 300 + index * 200);
    });
}

// ================ PROCESS STEPS ================
function initProcessSteps() {
    const steps = document.querySelectorAll('.process-step');
    
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            steps.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ================ CHARTS (SIMPLIFIED) ================
function initCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded');
        return;
    }
    
    // Energy Chart
    const energyCtx = document.getElementById('energyChart');
    if (energyCtx) {
        new Chart(energyCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'],
                datasets: [{
                    label: 'With CampusIQ',
                    data: [120, 180, 220, 240, 210, 190, 150, 100],
                    borderColor: '#2A5CAA',
                    backgroundColor: 'rgba(42, 92, 170, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Without CampusIQ',
                    data: [120, 250, 320, 380, 350, 300, 280, 250],
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } }
            }
        });
    }
}

// ================ ROI CALCULATOR ================
function initROICalculator() {
    const acCount = document.getElementById('acCount');
    const acCountValue = document.getElementById('acCountValue');
    const energyCost = document.getElementById('energyCost');
    const energyCostValue = document.getElementById('energyCostValue');
    const maintenanceCost = document.getElementById('maintenanceCost');
    const maintenanceCostValue = document.getElementById('maintenanceCostValue');
    
    const annualEnergySavings = document.getElementById('annualEnergySavings');
    const maintenanceSavings = document.getElementById('maintenanceSavings');
    const totalSavings = document.getElementById('totalSavings');
    
    if (!acCount || !acCountValue) return;
    
    function updateROI() {
        const ac = parseInt(acCount.value) || 150;
        const energy = parseFloat(energyCost.value) || 0.15;
        const maintenance = parseInt(maintenanceCost.value) || 300;
        
        const energySavings = ac * 8 * 365 * 0.4 * energy;
        const maintenanceSavingsCalc = ac * maintenance * 0.67;
        const total = energySavings + maintenanceSavingsCalc;
        
        annualEnergySavings.textContent = '$' + Math.round(energySavings).toLocaleString();
        maintenanceSavings.textContent = '$' + Math.round(maintenanceSavingsCalc).toLocaleString();
        totalSavings.textContent = '$' + Math.round(total).toLocaleString();
    }
    
    // Set initial values
    acCountValue.textContent = acCount.value;
    energyCostValue.textContent = energyCost.value;
    maintenanceCostValue.textContent = maintenanceCost.value;
    
    // Add event listeners
    acCount.addEventListener('input', () => {
        acCountValue.textContent = acCount.value;
        updateROI();
    });
    
    energyCost.addEventListener('input', () => {
        energyCostValue.textContent = energyCost.value;
        updateROI();
    });
    
    maintenanceCost.addEventListener('input', () => {
        maintenanceCostValue.textContent = maintenanceCost.value;
        updateROI();
    });
    
    updateROI();
}

// ================ TIMELINE ================
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ================ SMOOTH SCROLL ================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================ LIVE TIME ================
function initLiveTime() {
    function updateTime() {
        const now = new Date();
        const timeElement = document.getElementById('liveTime');
        if (timeElement) {
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            });
            timeElement.textContent = timeString;
        }
    }
    
    setInterval(updateTime, 1000);
    updateTime();
}

// ================ INTERACTIONS ================
function initInteractions() {
    // Alert buttons
    document.querySelectorAll('.alert button').forEach(button => {
        button.addEventListener('click', function() {
            const alert = this.closest('.alert');
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.style.display = 'none';
            }, 300);
        });
    });
    
    // Building hover effects
    document.querySelectorAll('.building').forEach(building => {
        building.addEventListener('mouseenter', function() {
            const fill = this.querySelector('.building-energy-fill');
            if (fill) {
                fill.style.width = '100%';
                fill.style.backgroundColor = '#ff4757';
            }
        });
        
        building.addEventListener('mouseleave', function() {
            const fill = this.querySelector('.building-energy-fill');
            if (fill) {
                // Get original width from inline style
                const originalWidth = this.querySelector('.building-energy-fill').getAttribute('data-original') || '70%';
                fill.style.width = originalWidth;
                fill.style.backgroundColor = '#ff4757';
            }
        });
    });
}