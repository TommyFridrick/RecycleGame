// Get all the draggable items
const items = document.querySelectorAll('.item');

// Get all the bins
const bins = document.querySelectorAll('.bin');

// Initialize points
let points = 0;

// Add drag and drop event listeners to items
items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

// Add drag event listeners to bins
bins.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', dropItem);
});

// Drag functions
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function dropItem(e) {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData('text/plain');
    const draggedItem = document.getElementById(draggedItemId);

    if (validateDrop(draggedItem, e.target)) {
        e.target.appendChild(draggedItem);
        alert("Correct! " + draggedItem.alt + " goes in the " + e.target.alt + ".");
        
        // Increment points for correct drop
        points++;
        updatePointsDisplay();
    } else {
        alert("Incorrect! Try again.");
    }
}

// Function to check if the item matches the bin
function validateDrop(item, bin) {
    if (bin.id === 'recycling-bin' && (item.id === 'water-bottle' || item.id === 'tin-can')) {
        return true;
    } else if (bin.id === 'garbage-bin' && (item.id === 'chip-bag' || item.id === 'plastic-straw')) {
        return true;
    } else if (bin.id === 'compost-bin' && (item.id === 'banana-peel' || item.id === 'apple-core')) {
        return true;
    }
    return false;
}

// Function to update the points display
function updatePointsDisplay() {
    const pointsDisplay = document.getElementById('points-display');
    pointsDisplay.innerText = `Points: ${points}`;
}
