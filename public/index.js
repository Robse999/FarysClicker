let count = 0;
let points = 0;
let totalPurchases = 0;
let pointsPerClick = 1;
let currentCategory = 'upgrades';
let enableColorChange = false;
let currentClickSound = 'click-sound'; // Default click sound

// Settings Management
let settings = {
    masterVolume: 100,
    effectsVolume: 100,
    musicVolume: 100,
    quality: 'medium',
    particles: 'medium',
    notifications: 'all',
    autoSave: '5min'
};

function resetGame() {
  location.reload();
  clearSavedGame(); 
}

function playSound(soundId) {
    if (soundId === null) return;
    
    const sound = document.getElementById(soundId);
    if (!sound) return;

    // Reset sound to beginning
    sound.currentTime = 0;

    // Play the sound
    sound.play().catch(error => {
        console.error('Error playing sound:', error);
    });

    // Stop sound after 3 seconds (except for celebration sound)
    if (soundId !== 'celebration-sound') {
        setTimeout(() => {
            sound.pause();
            sound.currentTime = 0;
        }, 3000);
    }
}

function countClicks() {
    count += 1;
    document.getElementById("click-count").innerHTML = count;
    checkAchievements();
    handleClickForLevelSystem();

    addPoints(pointsPerClick);
    updatePointsDisplay();

    // Play the current click sound
    playSound(currentClickSound);

    // Check quests
    quests.forEach(quest => {
        if (!quest.completed && count >= quest.goal) {
            quest.completed = true;
            showQuestPopup(quest.description);
            confetti();
            playSound('tada-sound'); // Play achievement sound
            updateQuestDisplay();
            addPoints(quest.price);
        }
    });

    if (count % 10 === 0 && enableColorChange) {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.backgroundColor = randomColor;
    }
}

function scrollToElement(elementSelector, instance = 0){
  const elements = document.querySelectorAll(elementSelector);
  if(elements.length > instance){
    elements[instance].scrollIntoView({ behavior: 'smooth' });
  }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener('click', () =>{
  scrollToElement('.header');
});

link2.addEventListener('click', () =>{
  scrollToElement('.header', 1);
});

link3.addEventListener('click', () =>{
  scrollToElement('.column');
});

function showQuestPopup(message) {
    const popup = document.getElementById("quest-popup");
    const popupText = document.getElementById("popup-text");
    if (!popup || !popupText) return;
    
    popupText.innerText = message;
    popup.style.display = "block";

    // Hide popup after 3 seconds
    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}

function addPoints(amount) {
points += amount; // Increase points by the amount passed
document.getElementById("points-display").innerText = points;
}

function updatePointsDisplay() {
  document.getElementById("points-display").innerText = points;
}
        

let quests = [
{ goal: 20, price: 10, completed: false, description: "Klicke den Knopf 20 mal" },
{ goal: 50, price: 25, completed: false, description: "Klicke den Knopf 50 mal" },
{ goal: 100, price: 50, completed: false, description: "Klicke den Knopf 100 mal" },
{ goal: 250, price: 100, completed: false, description: "Klicke den Knopf 250 mal" },
{ goal: 500, price: 200, completed: false, description: "Klicke den Knopf 500 mal" },
{ goal: 750, price: 300, completed: false, description: "Klicke den Knopf 750 mal" },
{ goal: 1000, price: 500, completed: false, description: "Klicke den Knopf 1000 mal" },
{ goal: 1500, price: 800, completed: false, description: "Klicke den Knopf 1500 mal" },
{ goal: 2000, price: 1000, completed: false, description: "Klicke den Knopf 2000 mal" },
{ goal: 3000, price: 1500, completed: false, description: "Klicke den Knopf 3000 mal" },
{ goal: 4000, price: 2000, completed: false, description: "Klicke den Knopf 4000 mal" },
{ goal: 5000, price: 3000, completed: false, description: "Klicke den Knopf 5000 mal" },
];

function updateQuestDisplay() {
    const nextQuest = quests.find(q => !q.completed);
    const questDisplay = document.getElementById("current-quest");
    if (!questDisplay) return;
    
    if (nextQuest) {
        questDisplay.innerText = nextQuest.description;
    } else {
        questDisplay.innerText = "Alle Aufgaben abgeschlossen! 🎉";
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const helpBtn = document.getElementById("help-btn");
  const helpModal = document.getElementById("helpModal");
  const closeBtn = helpModal.querySelector(".close");

  // Open modal
  helpBtn.addEventListener("click", () => {
    helpModal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
        
  // Close modal when clicking the "X"
  closeBtn.addEventListener("click", () => {
    helpModal.style.display = "none";
    document.body.style.overflow = "";
  });
        
  // Close modal when clicking outside the content
  window.addEventListener("click", (event) => {
    if (event.target === helpModal) {
      helpModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      helpModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const settingsbtn = document.getElementById("settings-btn");
  const settingsModal = document.getElementById("settingsModal");
  const closeBtn = settingsModal.querySelector(".close");

  // Open modal
  settingsbtn.addEventListener("click", () => {
    settingsModal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
        
  // Close modal when clicking the "X"
  closeBtn.addEventListener("click", () => {
    settingsModal.style.display = "none";
    document.body.style.overflow = "";
  });
        
  // Close modal when clicking outside the content
  window.addEventListener("click", (event) => {
    if (event.target === settingsModal) {
      settingsModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      settingsModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});

// Shop code
document.addEventListener("DOMContentLoaded", () => {
  const toggleShop = document.getElementById("toogle-shop");
  const shopModal = document.getElementById("shopModal");
  const closeBtn = shopModal.querySelector(".close");
  const shopItemsContainer = document.getElementById("shop-items");
  const itemTemplate = document.getElementById("shop-item-template");  
  let wheelInitialized = false;                    
        
  // Sample shop items by category
  const shopItems = {
    upgrades: [
      { name: "Auto Klicker", price: 100, bought: false, levelRequired: 1, effect: function() {
        setInterval(countClicks, 2000);
      }},
      { name: "Doppelte Punkte", price: 250, bought: false, levelRequired: 3, effect: () => { pointsPerClick *= 2; } },
      { name: "Kritische Klicks", price: 500, bought: false, levelRequired: 5, effect: function(){
        window.countClicks = function() {
          const critChance = 0.01;
          const critMultiplier = 10;
    
          const isCrit = Math.random() < critChance;
          const addedPoints = isCrit ? pointsPerClick * critMultiplier : pointsPerClick;
    
          count += 1;
          document.getElementById("click-count").innerHTML = count;
          checkAchievements();
    
          addPoints(addedPoints);
          updatePointsDisplay();
          handleClickForLevelSystem();    
          if (isCrit) showCritEffect();
              
          quests.forEach(quest => {
            if (!quest.completed && count >= quest.goal) {
              quest.completed = true;
              showQuestPopup(quest.description);
              confetti();
              updateQuestDisplay();
              addPoints(quest.goal);
            }
          });
        };
        }
      },
      {
        name: "Lucky Spin",
        price: 10,
        bought: false, 
        levelRequired: 1,
        effect: function () {
          // Hide the shop
          document.getElementById("shop").classList.add("hidden");
      
          // Show the wheel overlay
          document.getElementById("wheelOverlay").classList.remove("hidden");
      
          // Enable and reset spin button
          const spinBtn = document.getElementById("spin-btn");
          spinBtn.disabled = false;
          finalValue.innerHTML = `<p>Klick auf Drehen!</p>`;
      
          // Ensure we add the spin event only once
          if (!wheelInitialized) {
            spinBtn.addEventListener("click", () => {
              spinBtn.disabled = true;
      
              spinWheelAndGetReward(function (rewardValue) {
                switch (rewardValue) {
                  case 1: points += 50; break;
                  case 2: points += 100; break;
                  case 3: activateBonusClicker(); break;
                  case 4: points += 200; break;
                  case 5: points += 150; break;
                  case 6: activateDoublePoints(16); break;
                }
                updatePointsDisplay();
              });
            });
            wheelInitialized = true;
          }
        }
      },
      { name: "Super Auto Klicker", price: 20, bought: false, levelRequired: 1, effect: function() {
        setInterval(countClicks, 500); // Clicks every 0.5 seconds
      }},
      { name: "Mega Punkte Multiplier", price: 50, bought: false, levelRequired: 1, effect: () => { 
        pointsPerClick *= 5;
      }},
      { name: "Glücksbringer", price: 30, bought: false, levelRequired: 1, effect: function() {
        const originalCritChance = 0.01;
        const newCritChance = 0.05; // 5% crit chance
        const critMultiplier = 20; // Higher multiplier
        
        window.countClicks = function() {
          const isCrit = Math.random() < newCritChance;
          const addedPoints = isCrit ? pointsPerClick * critMultiplier : pointsPerClick;
          
          count += 1;
          document.getElementById("click-count").innerHTML = count;
          checkAchievements();
          
          addPoints(addedPoints);
          updatePointsDisplay();
          handleClickForLevelSystem();
          
          if (isCrit) {
            showCritEffect();
            confetti(); // Add confetti effect on crit
          }
          
          quests.forEach(quest => {
            if (!quest.completed && count >= quest.goal) {
              quest.completed = true;
              showQuestPopup(quest.description);
              confetti();
              updateQuestDisplay();
              addPoints(quest.goal);
            }
          });
        };
      }}
    ],
    themes: [
      { name: "Farben Wechsel", price: 200, bought: false, effect: function() {
        enableColorChange = true;
      }},
      { name: "Dunkler Hintergrund", price: 500, bought: false, effect: function() {
        document.body.style.backgroundColor = "#18181B";
        enableColorChange = false;
      }},
      { name: "Regenbogen Hintergrund", price: 1000, bought: false, effect: function() {
        let hue = 0;
        setInterval(() => {
          document.body.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
          hue = (hue + 1) % 360;
        }, 50);
        enableColorChange = false;
      }},
      { name: "Nachtmodus", price: 1500, bought: false, effect: function() {
        document.body.style.backgroundColor = "#000000";
        document.body.style.color = "#ffffff";
        enableColorChange = false;
      }},
      { name: "Retro Mode", price: 2000, bought: false, effect: function() {
        document.body.style.backgroundColor = "#000000";
        document.body.style.fontFamily = "'Press Start 2P', cursive";
        enableColorChange = false;
      }}
    ],
    buttons: [
      { name: "Goldener Knopf", price: 400, levelRequired: 3, bought: false, effect: () => { 
        const btn = document.getElementById("click-button");
        applyTheme(btn, "gold-theme");
      }},
      { name: "Feuriger Knopf", price: 800, levelRequired: 5, bought: false, effect: () => { 
        const btn = document.getElementById("click-button");
        applyTheme(btn, "fire-theme");
      }},
      { name: "Standard Knopf", price: 1200, levelRequired: 10, bought: false, effect: () => { 
        const btn = document.getElementById("click-button");
        applyTheme(btn, "default-theme");
      }},
      { name: "Neon Knopf", price: 20, levelRequired: 1, bought: false, effect: () => { 
        const btn = document.getElementById("click-button");
        applyTheme(btn, "neon-theme");
      }},
      { name: "Holografischer Knopf", price: 30, levelRequired: 1, bought: false, effect: () => { 
        const btn = document.getElementById("click-button");
        applyTheme(btn, "holographic-theme");
      }},
      { name: "Animierter Knopf", price: 40, levelRequired: 2, bought: false, effect: () => { 
        const btn = document.getElementById("click-button");
        applyTheme(btn, "animated-theme");
      }}
    ],
    sounds: [
        { 
            name: "Classic Click", 
            price: 50, 
            bought: false, 
            levelRequired: 1, 
            effect: function() {
                currentClickSound = 'click-sound';
            }
        },
        { 
            name: "Pop Sound", 
            price: 100, 
            bought: false, 
            levelRequired: 1, 
            effect: function() {
                currentClickSound = 'pop-sound';
            }
        },
        { 
            name: "Ding Sound", 
            price: 200, 
            bought: false, 
            levelRequired: 2, 
            effect: function() {
                currentClickSound = 'ding-sound';
            }
        },
        { 
            name: "Woosh Sound", 
            price: 300, 
            bought: false, 
            levelRequired: 3, 
            effect: function() {
                currentClickSound = 'woosh-sound';
            }
        },
        { 
            name: "No Sound", 
            price: 0, 
            bought: false, 
            levelRequired: 1, 
            effect: function() {
                currentClickSound = null;
            }
        }
    ]
  };
  
  function applyTheme(button, newTheme) {
    const themes = ["default-theme", "gold-theme", "fire-theme", "neon-theme", "holographic-theme", "animated-theme"]; // Add more themes here as needed
  
    // Remove all theme classes
    themes.forEach(theme => button.classList.remove(theme));
  
    // Add the new one
    button.classList.add(newTheme);
  }

  function showCritEffect() {
    const critBox = document.getElementById("crit-message");
    critBox.textContent = "💥 Kritischer Klick! 💥";
    critBox.style.display = "block";
  
    setTimeout(() => {
      critBox.style.display = "none";
    }, 2000);
  }  

  function activateDoublePoints(durationSeconds) {
    const originalPoints = pointsPerClick;
    pointsPerClick = originalPoints * 2;
    setTimeout(() => {
      pointsPerClick = originalPoints;
      alert("Double points ended.");
    }, durationSeconds * 1000);
  }

  function activateBonusClicker() {
    const clickerId = setInterval(countClicks, 1000); // Click once per second
    setTimeout(() => {
      clearInterval(clickerId);
      alert("Bonus clicker ended.");
    }, 10000); // Lasts 10 seconds
  }

  const wheel = document.getElementById("wheel");
  const finalValue = document.getElementById("final-value");

  const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2, label: "100 Punkte" },
    { minDegree: 31, maxDegree: 90, value: 1, label: "50 Punkte" },
    { minDegree: 91, maxDegree: 150, value: 6, label: "Doppelte Punkte" },
    { minDegree: 151, maxDegree: 210, value: 5, label: "150 Punkte" },
    { minDegree: 211, maxDegree: 270, value: 4, label: "200 Punkte" },
    { minDegree: 271, maxDegree: 330, value: 3, label: "Bonus Klicker" },
    { minDegree: 331, maxDegree: 360, value: 2, label: "100 Punkte" },
  ];

  const data = [16, 16, 16, 16, 16, 16];
  var pieColors = ["#8b35bc", "#b163da", "#8b35bc", "#b163da", "#8b35bc", "#b163da"];

  let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
      labels: ["50 Punkte", "100 Punkte", "Bonus Klicker", "200 Punkte", "150 Punkte ", "Doppelte Punkte"],
      datasets: [{
        backgroundColor: pieColors,
        data: data,
      }],
    },
    options: {
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        tooltip: false,
        legend: { display: false },
        datalabels: {
          color: "#ffffff",
          font: {
            size: 22,
            weight: "bold"
          },
          formatter: (_, context) => context.chart.data.labels[context.dataIndex],
          anchor: "center",  // Anchor in center of slice
          align: "end",      // Move label outward      
        }
      }
    },
  });

  function spinWheelAndGetReward(callback) {
    const spinDuration = 4000; // total spin duration in ms
    const totalSpins = 5; // how many full circles before stopping
    const randomDegree = Math.floor(Math.random() * 360); // final target angle
  
    const finalRotation = 360 * totalSpins + randomDegree;
    const start = performance.now();
    const initialRotation = myChart.options.rotation || 0;
  
    function animateSpin(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / spinDuration, 1); // normalize 0 to 1
  
      // easeOutQuad easing
      const easedProgress = 1 - Math.pow(1 - progress, 2);
  
      const currentRotation = initialRotation + easedProgress * (finalRotation - initialRotation);
      myChart.options.rotation = currentRotation;
      myChart.update();
  
      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        // Done spinning
        const landedDegree = Math.floor(currentRotation % 360);
  
        for (let i of rotationValues) {
          if (landedDegree >= i.minDegree && landedDegree <= i.maxDegree) {
            finalValue.innerHTML = `<p>Gewonnen: ${i.label}</p>`;
            callback(i.value);
            break;
          }
        }
  
        // Hide wheel overlay after delay
        setTimeout(() => {
          document.getElementById("wheelOverlay").classList.add("hidden");
          document.getElementById("shop").classList.remove("hidden");
        }, 2000);
      }
    }
  
    requestAnimationFrame(animateSpin);
  }



  // Function to render items
  function loadShopItems() {
    shopItemsContainer.innerHTML = "";
  
    shopItems[currentCategory].forEach((item, index) => {
      const clone = itemTemplate.content.cloneNode(true);
  
      clone.querySelector(".item-name").textContent = item.name;
      clone.querySelector(".item-price").innerHTML = `
      <span style="font-size: 1.5rem; color: white;">Preis: </span>
      <span style="font-size: 2rem; color:red; font-weight: 700;">${item.price}</span>
      <span style="font-size: 1.2rem; color: white;">Punkte</span>
      `;
      
      const button = clone.querySelector(".buy-button");
      const returnButton = clone.querySelector(".return-button");

      if(level < item.levelRequired){
        button.disabled = true;
        button.innerHTML = `Level ${item.levelRequired} benötigt`;
        button.style.backgroundColor = "gray";
      }else{  
        button.disabled = item.bought;
        button.innerHTML = `<span>${item.bought ? "Gekauft" : "Jetzt Kaufen"}</span>`;
        button.dataset.index = index;
        button.dataset.category = currentCategory;
        button.addEventListener("click", () => handlePurchase(currentCategory, index));

        // Show return button for themes, buttons, and sounds categories
        if (item.bought && (currentCategory === 'themes' || currentCategory === 'buttons' || currentCategory === 'sounds')) {
          returnButton.style.display = "flex";
          returnButton.dataset.index = index;
          returnButton.dataset.category = currentCategory;
          returnButton.addEventListener("click", () => handleReturn(currentCategory, index));
        }
      }
  
      shopItemsContainer.appendChild(clone);
    });
  }
            
  function handlePurchase(category, index) {
    const item = shopItems[category][index];          
    if (item.bought) return;

    if (points < item.price) {
        showShopMessage("Not enough points!");
        return;
    }

    // Handle automatic returns for categories that can only have one active item
    if (category === 'themes' || category === 'buttons' || category === 'sounds') {
        // Find previously purchased item in the same category
        const previousItem = shopItems[category].find(i => i.bought);
        if (previousItem) {
            // Automatically return the previous item
            points += Math.floor(previousItem.price * 0.8);
            previousItem.bought = false;
            
            // Reset effects based on item type
            if (category === 'themes') {
                if (previousItem.name === "Farben Wechsel") {
                    enableColorChange = false;
                    document.body.style.backgroundColor = "#18181B";
                } else if (previousItem.name === "Dunkler Hintergrund") {
                    document.body.style.backgroundColor = "#18181B";
                } else if (previousItem.name === "Regenbogen Hintergrund") {
                    // Clear the interval
                    const highestInterval = window.setInterval(() => {}, 0);
                    for (let i = 0; i < highestInterval; i++) {
                        window.clearInterval(i);
                    }
                    document.body.style.backgroundColor = "#18181B";
                } else if (previousItem.name === "Nachtmodus") {
                    document.body.style.backgroundColor = "#18181B";
                    document.body.style.color = "#ccc";
                } else if (previousItem.name === "Retro Mode") {
                    document.body.style.backgroundColor = "#18181B";
                    document.body.style.fontFamily = "'Poppins'";
                }
            } else if (category === 'buttons') {
                // Reset to default theme
                const btn = document.getElementById("click-button");
                applyTheme(btn, "default-theme");
            } else if (category === 'sounds') {
                // Reset to default click sound
                currentClickSound = 'click-sound';
            }
        }
    }

    points -= item.price;
    totalPurchases++;
    item.bought = true;
    item.effect?.();
          
    updatePointsDisplay();
    loadShopItems();
    checkAchievements();
  }

  function handleReturn(category, index) {
    const item = shopItems[category][index];
    if (!item.bought) return;

    // Only allow returns for themes, buttons, and sounds
    if (category !== 'themes' && category !== 'buttons' && category !== 'sounds') {
        showShopMessage("Dieses Item kann nicht zurückgegeben werden!");
        return;
    }

    // Return points to player
    points += Math.floor(item.price * 0.8);
    item.bought = false;

    // Reset effects based on item type
    if (category === 'themes') {
        if (item.name === "Farben Wechsel") {
            enableColorChange = false;
            document.body.style.backgroundColor = "#18181B";
        } else if (item.name === "Dunkler Hintergrund") {
            document.body.style.backgroundColor = "#18181B";
        } else if (item.name === "Regenbogen Hintergrund") {
            // Clear the interval
            const highestInterval = window.setInterval(() => {}, 0);
            for (let i = 0; i < highestInterval; i++) {
                window.clearInterval(i);
            }
            document.body.style.backgroundColor = "#18181B";
        } else if (item.name === "Nachtmodus") {
            document.body.style.backgroundColor = "#18181B";
            document.body.style.color = "#ccc";
        } else if (item.name === "Retro Mode") {
            document.body.style.backgroundColor = "#18181B";
            document.body.style.fontFamily = "'Poppins'";
        }
    } else if (category === 'buttons') {
        // Reset to default theme
        const btn = document.getElementById("click-button");
        applyTheme(btn, "default-theme");
    } else if (category === 'sounds') {
        // Reset to default click sound
        currentClickSound = 'click-sound';
    }

    updatePointsDisplay();
    loadShopItems();
    showShopMessage(`Item zurückgegeben! ${Math.floor(item.price * 0.8)} Punkte zurückerhalten.`);
  }

  function showShopMessage(text) {
    const messageBox = document.getElementById("shop-message");
    messageBox.textContent = text;
    messageBox.style.display = "block";
  
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 4000); // hides after 2 seconds
  }         
          
  // Switch shop category
  window.switchCategory = function(category) {
    currentCategory = category;
    loadShopItems();
  };
          
  // Show modal
  toggleShop.addEventListener("click", () => {
    shopModal.style.display = "block";
    loadShopItems();
    document.body.style.overflow = "hidden";
  });
          
  // Hide modal
  closeBtn.addEventListener("click", () => {
    shopModal.style.display = "none";
    document.body.style.overflow = "";
  });
          
  // Close modal on outside click
  window.addEventListener("click", (event) => {
    if (event.target === shopModal) {
      shopModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
          
  // Close modal with Escape
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      shopModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
          
  function updatePointsDisplay() {
    let pointsDisplay = document.getElementById("points-display");
    if (pointsDisplay) {
      pointsDisplay.textContent = points;
    }
  }

  updatePointsDisplay();
  loadShopItems();
});

let achievements = [
{ name: "100 Klicks", threshold: 100, price: 20, unlocked: false, type: "clicks" },
{ name: "500 Klicks", threshold: 500, price: 100, unlocked: false, type: "clicks" },
{ name: "1000 Klicks", threshold: 1000, price: 500, unlocked: false, type: "clicks" },
{ name: "2000 Klicks", threshold: 2000, price: 1000, unlocked: false, type: "clicks" },
{ name: "100 Punkte", threshold: 100, price: 20, unlocked: false, type: "points" },
{ name: "500 Punkte", threshold: 500, price: 100, unlocked: false, type: "points" },
{ name: "1000 Punkte", threshold: 1000, price: 500, unlocked: false, type: "points" },
{ name: "2000 Punkte", threshold: 2000, price: 1000, unlocked: false, type: "points" },
{ name: "Erster Kauf", threshold: 1, price: 20, unlocked: false, type: "purchases" },
{ name: "Treuer Kunde: 5 Käufe", threshold: 5, price: 100, unlocked: false, type: "purchases" },
];

function checkAchievements() {
  achievements.forEach((achievement) => {
    if (!achievement.unlocked) {
      const reachedThreshold =
        (achievement.type === "clicks" && count >= achievement.threshold) ||
        (achievement.type === "points" && points >= achievement.threshold) ||
        (achievement.type === "purchases" && totalPurchases >= achievement.threshold);

      if (reachedThreshold) {
        achievement.unlocked = true;
        showAchievementPopup("Errungenschaft abgeschlossen: " + achievement.name); // Use same popup as quests
        addPoints(achievement.price); // Reward the player
        confetti(); // Same visual feedback as quests
        playSound('celebration-sound'); // Play celebration sound for achievement completion
      }
    }
  });
}

function showAchievementPopup(message) {
  const popup = document.getElementById("achievement-popup");
  popup.innerText = message;  // Set the message
  popup.style.display = "block";  // Show the popup

  // Hide the popup after 3 seconds
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}
      
let level = 1;
let levelClicks = 0;
let clicksNeeded = 20; 

function handleClickForLevelSystem() {
  levelClicks++;

  if (levelClicks >= clicksNeeded) {
    updateLevelBar(true); // Show full bar
    clicksNeeded = Math.round(((clicksNeeded + 10) * 1.5) / 10) * 10;

    // Delay the reset logic so 100% renders first
    setTimeout(() => {
      level++;
      levelClicks = 0;
      
      updateLevelBar();  // Re-render with reset state
    }, 200); // Delay just long enough to see 100%
  } else {
    updateLevelBar();
  }
}


function updateLevelBar(forceFull = false) {
  const levelBar = document.getElementById("level-bar");
  const levelInfo = document.getElementById("level-info");
  const clickInfo = document.getElementById("clicks-to-next");

  const progress = forceFull ? 100 : (levelClicks / clicksNeeded) * 100;
  levelBar.style.width = `${progress}%`;

  levelInfo.textContent = `Level ${level}`;
  const remaining = clicksNeeded - levelClicks;
  clickInfo.textContent = `Noch ${remaining} Klick${remaining === 1 ? '' : 's'} bis zum nächsten Level`;
}

updatePointsDisplay();
updateQuestDisplay();

// Add a function to preload all sounds
function preloadSounds() {
    const sounds = ['click-sound', 'pop-sound', 'ding-sound', 'woosh-sound', 'tada-sound'];
    sounds.forEach(soundId => {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.load();
        }
    });
}

// Call preloadSounds when the page loads
document.addEventListener('DOMContentLoaded', () => {
    preloadSounds();
    // ... rest of your existing DOMContentLoaded code ...
});

// Load settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
        applySettings();
    }
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    applySettings();
}

// Apply settings to the game
function applySettings() {
    // Apply volume settings
    const masterVolume = settings.masterVolume / 100;
    const effectsVolume = settings.effectsVolume / 100;
    const musicVolume = settings.musicVolume / 100;

    // Update all audio elements
    document.querySelectorAll('audio').forEach(audio => {
        if (audio.id.includes('sound')) {
            audio.volume = masterVolume * effectsVolume;
        } else if (audio.id.includes('music')) {
            audio.volume = masterVolume * musicVolume;
        }
    });

    // Apply quality settings
    document.body.className = `quality-${settings.quality}`;

    // Apply particle settings
    const particleCount = {
        'off': 0,
        'low': 50,
        'medium': 100,
        'high': 200
    }[settings.particles];
    confetti.maxCount = particleCount;

    // Apply auto-save settings
    if (settings.autoSave === 'off') {
        clearInterval(autoSaveInterval);
    } else {
        const interval = {
            '1min': 60000,
            '5min': 300000,
            '10min': 600000
        }[settings.autoSave];
        clearInterval(autoSaveInterval);
        autoSaveInterval = setInterval(saveGame, interval);
    }
}

// Initialize settings controls
function initSettings() {
    // Volume controls
    ['master', 'effects', 'music'].forEach(type => {
        const slider = document.getElementById(`${type}-volume`);
        if (!slider) return;
        const value = document.querySelector(`#${type}-volume + .volume-value`);
        
        slider.value = settings[`${type}Volume`];
        if (value) value.textContent = `${settings[`${type}Volume`]}%`;

        slider.addEventListener('input', (e) => {
            const newValue = parseInt(e.target.value);
            settings[`${type}Volume`] = newValue;
            if (value) value.textContent = `${newValue}%`;
            
            // Update audio volumes
            const masterVolume = settings.masterVolume / 100;
            const effectsVolume = settings.effectsVolume / 100;
            const musicVolume = settings.musicVolume / 100;

            document.querySelectorAll('audio').forEach(audio => {
                if (audio.id.includes('sound')) {
                    audio.volume = masterVolume * effectsVolume;
                } else if (audio.id.includes('music')) {
                    audio.volume = masterVolume * musicVolume;
                }
            });
        });
    });

    // Quality and other select controls
    ['quality', 'particles', 'notifications', 'autoSave'].forEach(setting => {
        const select = document.getElementById(setting);
        if (!select) return;
        select.value = settings[setting];
        
        select.addEventListener('change', (e) => {
            settings[setting] = e.target.value;
        });
    });

    // Save and Reset buttons
    const saveBtn = document.getElementById('save-settings');
    const resetBtn = document.getElementById('reset-settings');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            showNotification('Einstellungen gespeichert!');
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Möchten Sie wirklich alle Einstellungen zurücksetzen?')) {
                settings = {
                    masterVolume: 100,
                    effectsVolume: 100,
                    musicVolume: 100,
                    quality: 'medium',
                    particles: 'medium',
                    notifications: 'all',
                    autoSave: '5min'
                };
                initSettings(); // Reset UI controls
                showNotification('Einstellungen zurückgesetzt!');
            }
        });
    }
}

// Update showNotification function to respect notification settings
function showNotification(message, type = 'info') {
    if (settings.notifications === 'none') return;
    if (settings.notifications === 'important' && type !== 'important') return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(-100%)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core game systems
    updatePointsDisplay();
    updateQuestDisplay();
    preloadSounds();
    
    // Initialize settings
    initSettings();
    
    // Initialize shop if user is logged in
    if (typeof currentUser !== 'undefined' && currentUser) {
        // Remove this line since loadShopItems will be called when the shop is opened
        // loadShopItems();
    }
});

  
