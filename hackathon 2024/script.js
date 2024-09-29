// Get all the draggable items
const items = document.querySelectorAll('.item');

// Set the boundaries for random placement, leaving room for bins and header
const containerWidth = window.innerWidth;
const containerHeight = window.innerHeight - 300; // Adjust to account for bins and header
const itemWidth = 80; // Item dimensions from CSS
const itemHeight = 80; 

// Store positions to avoid overlaps
let placedItems = [];

// Initialize points
let points = 0;
const pointsDisplay = document.getElementById('points-display');

// Scatter items randomly on load
function scatterItems() {
    items.forEach(item => {
        let position;
        let overlapping;

        do {
            // Generate random X and Y positions within the allowed range
            const randomX = Math.floor(Math.random() * (containerWidth - itemWidth));
            const randomY = Math.floor(Math.random() * (containerHeight - itemHeight));
            
            position = { x: randomX, y: randomY };
            overlapping = checkOverlap(position); // Check for overlap with previous items
        } while (overlapping);

        // Position items using absolute positioning
        item.style.position = 'absolute';
        item.style.left = `${position.x}px`;
        item.style.top = `${position.y}px`;

        // Save the position to avoid future overlaps
        placedItems.push(position);
    });
}

// Check if a new position overlaps with existing items
function checkOverlap(newPosition) {
    for (let i = 0; i < placedItems.length; i++) {
        const existingPosition = placedItems[i];
        const overlapX = newPosition.x < existingPosition.x + itemWidth && newPosition.x + itemWidth > existingPosition.x;
        const overlapY = newPosition.y < existingPosition.y + itemHeight && newPosition.y + itemHeight > existingPosition.y;
        
        if (overlapX && overlapY) {
            return true; // Found an overlap
        }
    }
    return false; // No overlap
}

// Drag and drop functionality
items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

const bins = document.querySelectorAll('.bin');
bins.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', dropItem);
});

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

        // Increment points and update display
        points += 10;
        updatePointsDisplay();
    } else {
        alert("Incorrect! Try again.");
    }
}

function validateDrop(item, bin) {
    if (bin.id === 'recycling-bin' && (item.id === 'water-bottle' || item.id === 'tin-can' || item.id === 'cardboard-box')) {
        return true;
    } else if (bin.id === 'garbage-bin' && (item.id === 'chip-bag' || item.id === 'plastic-straw' || item.id === 'teddy-bear' || item.id === 'styrofoam-cup')) {
        return true;
    } else if (bin.id === 'compost-bin' && (item.id === 'banana-peel' || item.id === 'apple-core' || item.id === 'eggshell')) {
        return true;
    }
    return false;
}

// Update points display
function updatePointsDisplay() {
    pointsDisplay.textContent = `Points: ${points}`;
}

// Ensure items are scattered after the page loads
window.onload = scatterItems;
