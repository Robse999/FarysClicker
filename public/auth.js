// User Management
let currentUser = null;

function checkUserLogin() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        // Update UI to show logged-in state
        const loginBtn = document.getElementById('loginBtn');
        const userInfo = document.getElementById('userInfo');
        if (loginBtn && userInfo) {
            loginBtn.style.display = 'none';
            userInfo.style.display = 'block';
            const usernameElement = document.getElementById('username');
            if (usernameElement) {
                usernameElement.textContent = currentUser.username;
            }
        }
        
        // Load user's game data
        loadUserGameData();
    } else {
        // Show login button if not logged in
        const loginBtn = document.getElementById('loginBtn');
        const userInfo = document.getElementById('userInfo');
        if (loginBtn && userInfo) {
            loginBtn.style.display = 'block';
            userInfo.style.display = 'none';
        }
    }
}

function loadUserGameData() {
    if (!currentUser) return;
    
    const userGameData = localStorage.getItem(`gameData_${currentUser.email}`);
    if (userGameData) {
        const data = JSON.parse(userGameData);
        // Restore game state
        count = data.count || 0;
        points = data.points || 0;
        pointsPerClick = data.pointsPerClick || 1;
        level = data.level || 1;
        levelClicks = data.levelClicks || 0;
        clicksNeeded = data.clicksNeeded || 20;
        
        // Restore quests
        quests = data.quests || quests;
        
        // Restore achievements
        achievements = data.achievements || achievements;
        
        // Restore shop items
        if (data.shopItems) {
            Object.keys(data.shopItems).forEach(category => {
                if (shopItems[category]) {
                    shopItems[category] = data.shopItems[category];
                }
            });
        }
        
        // Update UI
        document.getElementById("click-count").innerHTML = count; // Update click count immediately
        updatePointsDisplay();
        updateQuestDisplay();
        updateLevelBar();
        
        // Reload shop items if shop is initialized
        if (typeof loadShopItems === 'function') {
            loadShopItems();
        }
    }
}

function saveUserGameData() {
    if (!currentUser) return;
    
    const gameData = {
        count,
        points,
        pointsPerClick,
        level,
        levelClicks,
        clicksNeeded,
        quests,
        achievements,
        shopItems: shopItems // Save shop items state
    };
    
    localStorage.setItem(`gameData_${currentUser.email}`, JSON.stringify(gameData));
}

// Add auto-save functionality
setInterval(saveUserGameData, 30000); // Save every 30 seconds

// Add logout functionality
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    checkUserLogin();
    // Reset game state
    location.reload();
}

// Initialize authentication system
function initAuth() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            const formId = tab.getAttribute('data-tab') + 'Form';
            const form = document.getElementById(formId);
            if (form) {
                form.classList.add('active');
            }
        });
    });

    // Form submission handlers
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginError = document.getElementById('loginError');
    const loginSuccess = document.getElementById('loginSuccess');
    const registerError = document.getElementById('registerError');
    const registerSuccess = document.getElementById('registerSuccess');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Store current user
                localStorage.setItem('currentUser', JSON.stringify(user));
                if (loginSuccess) {
                    loginSuccess.textContent = 'Login successful! Redirecting...';
                    loginSuccess.style.display = 'block';
                }
                if (loginError) {
                    loginError.style.display = 'none';
                }
                
                // Redirect to game after a short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                if (loginError) {
                    loginError.textContent = 'Invalid email or password';
                    loginError.style.display = 'block';
                }
                if (loginSuccess) {
                    loginSuccess.style.display = 'none';
                }
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validate passwords match
            if (password !== confirmPassword) {
                if (registerError) {
                    registerError.textContent = 'Passwords do not match';
                    registerError.style.display = 'block';
                }
                if (registerSuccess) {
                    registerSuccess.style.display = 'none';
                }
                return;
            }

            // Get existing users
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if email already exists
            if (users.some(user => user.email === email)) {
                if (registerError) {
                    registerError.textContent = 'Email already registered';
                    registerError.style.display = 'block';
                }
                if (registerSuccess) {
                    registerSuccess.style.display = 'none';
                }
                return;
            }

            // Create new user
            const newUser = {
                username,
                email,
                password,
                points: 0,
                clicks: 0,
                level: 1,
                achievements: [],
                quests: []
            };

            // Save user
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Show success message
            if (registerSuccess) {
                registerSuccess.textContent = 'Registration successful! Please login.';
                registerSuccess.style.display = 'block';
            }
            if (registerError) {
                registerError.style.display = 'none';
            }

            // Clear form
            registerForm.reset();

            // Switch to login tab after a short delay
            setTimeout(() => {
                const loginTab = document.querySelector('[data-tab="login"]');
                if (loginTab) {
                    loginTab.click();
                }
            }, 1500);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    checkUserLogin();
    initAuth();
});
