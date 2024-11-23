const addButton = document.getElementById('addButton');
const drawButton = document.getElementById('drawButton');
const nameInput = document.getElementById('nameInput');
const wishlistInput = document.getElementById('wishlistInput');
const rouletteList = document.getElementById('rouletteList');
const chosenNameDisplay = document.getElementById('chosenName');

let rouletteItems = [];

function addToRoulette() {
  const name = nameInput.value.trim();
  const wishlist = wishlistInput.value.trim();
  
  if (name && wishlist) {
    const rouletteItem = { name, wishlist, chosen: false };
    rouletteItems.push(rouletteItem);
    
    // Create and display the list item
    const listItem = document.createElement('li');
    listItem.textContent = `${name} - Wishlist: ${wishlist}`;
    listItem.dataset.index = rouletteItems.length - 1;
    rouletteList.appendChild(listItem);
    
    // Clear inputs
    nameInput.value = '';
    wishlistInput.value = '';
  } else {
    alert("Please enter both a name and wishlist item.");
  }
}

function drawName() {
  const availableItems = rouletteItems.filter(item => !item.chosen);
  
  if (availableItems.length === 0) {
    alert("All names have been picked.");
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * availableItems.length);
  const drawnItem = availableItems[randomIndex];
  
  // Mark item as chosen
  drawnItem.chosen = true;
  
  // Find the corresponding list item and cross it out
  const listItem = rouletteList.children[rouletteItems.indexOf(drawnItem)];
  listItem.classList.add('crossed-out');
  
  // Display the chosen name and wishlist item
  chosenNameDisplay.textContent = `${drawnItem.name} has been chosen! Wishlist: ${drawnItem.wishlist}`;
  
  // Disable the draw button if no more names are available
  if (rouletteItems.filter(item => !item.chosen).length === 0) {
    drawButton.disabled = true;
  }
}

addButton.addEventListener('click', addToRoulette);
drawButton.addEventListener('click', drawName);