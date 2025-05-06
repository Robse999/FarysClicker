let count = 0;
let points = 0;
let totalPurchases = 0;
let pointsPerClick = 1;
let currentCategory = 'upgrades';
let enableColorChange = false;

function resetGame() {
    location.reload();
}

function countClicks() {
    count += 1;
    document.getElementById("click-count").innerHTML = count;
    checkAchievements();
    handleClickForLevelSystem();

    addPoints(pointsPerClick);
    updatePointsDisplay();

    quests.forEach(quest => {
    if (!quest.completed && count >= quest.goal) {
      quest.completed = true;
      showQuestPopup(quest.description);
      confetti();
      updateQuestDisplay();
      addPoints(quest.goal);
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
popupText.innerText = message;
popup.style.display = "block";

// Hide popup after 3 seconds
setTimeout(() => {
popup.style.display = "none";
}, 20000);
}

function addPoints(amount) {
points += amount; // Increase points by the amount passed
document.getElementById("points-display").innerText = points;
}

function updatePointsDisplay() {
  document.getElementById("points-display").innerText = points;
}
        

let quests = [
{ goal: 20, completed: false, description: "Klicke den Knopf 20 mal" },
{ goal: 50, completed: false, description: "Klicke den Knopf 50 mal" },
{ goal: 100, completed: false, description: "Klicke den Knopf 100 mal" }
];

function updateQuestDisplay() {
  const nextQuest = quests.find(q => !q.completed);
  if (nextQuest) {
    document.getElementById("current-quest").innerText = nextQuest.description;
  } else {
    document.getElementById("current-quest").innerText = "Alle Aufgaben abgeschlossen! 🎉";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const helpBtn = document.getElementById("help-btn");
  const helpModal = document.getElementById("helpModal");
  const closeBtn = document.querySelector(".close");

  // Open modal
  helpBtn.addEventListener("click", () => {
    helpModal.style.display = "block";
  });
        
  // Close modal when clicking the "X"
  closeBtn.addEventListener("click", () => {
    helpModal.style.display = "none";
  });
        
  // Close modal when clicking outside the content
  window.addEventListener("click", (event) => {
    if (event.target === helpModal) {
      helpModal.style.display = "none";
    }
  });

  window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      helpModal.style.dysplay ="none";
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
  });
        
  // Close modal when clicking the "X"
  closeBtn.addEventListener("click", () => {
    settingsModal.style.display = "none";
  });
        
  // Close modal when clicking outside the content
  window.addEventListener("click", (event) => {
    if (event.target === settingsModal) {
      settingsModal.style.display = "none";
    }
  });

  window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      settingsModal.style.display ="none";
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
    
          count += 1; // keep this unchanged
          document.getElementById("click-count").innerHTML = count;
          checkAchievements();
    
          addPoints(addedPoints);
          updatePointsDisplay();
          handleClickForLevelSystem();    
          if (isCrit) showCritEffect(); // optional effect
              
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
        price: 1000,
        bought: false, 
        levelRequired: 7,
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
      }
    ],
    themes: [
      { name: "Farben Wechsel", price: 40, bought: false, effect: function() {
        enableColorChange = true;
      }},
      { name: "Dunkler Hintergrund", price: 100, bought: false, effect: function() {
        document.body.style.backgroundColor = "#18181B";
        enableColorChange = false;
      }}
    ],
    buttons: [
      { name: "Goldener Knopf", price: 20, bought: false, effect: () => { /* Swap image, etc. */ } }
    ]
  };
            
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
      }
      // Pass both category and index
      
  
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

    points -= item.price;
    totalPurchases++;
    item.bought = true;
    item.effect?.();
          
    updatePointsDisplay();
    loadShopItems();
    checkAchievements();
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
{ name: "50 Klicks", threshold: 50, unlocked: false, type: "clicks" },
{ name: "100 Punkte", threshold: 100, unlocked: false, type: "points" },
{ name: "100 Klicks", threshold: 100, unlocked: false, type: "clicks" },
{ name: "Erster Kauf", threshold: 1, unlocked: false, type: "purchases" },
];

function checkAchievements() {
  achievements.forEach((achievement) => {
    if (!achievement.unlocked) {
      if (
        (achievement.type === "clicks" && count >= achievement.threshold) ||
        (achievement.type === "points" && points >= achievement.threshold) ||
        (achievement.type === "purchases" && totalPurchases >= achievement.threshold)
      ) {
        achievement.unlocked = true;
        showAchievementPopup("Errungenschaft abgeschlossen: " + achievement.name);
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
        
