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
        if (draggedItem.alt === 'Water Bottle') {
            alert("Recycling water bottles helps turn old plastic into new things instead of creating more trash. It keeps plastic out of the ocean and landfills, protecting animals and the planet.");
        }
        if (draggedItem.alt === 'Tin Can') {
            alert("Tin cans need to be recycled because they can be used to make new cans and other metal items. Recycling them saves energy, reduces waste, and helps protect natural resources like trees and water.");
        }
        if (draggedItem.alt === 'Plastic Straw') {
            alert("Plastic straws should be trashed, not recycled, because they’re too small and light for recycling machines to handle. They can get stuck in the machines, causing problems, so it’s better to throw them away properly or avoid using them!");
        }
        if (draggedItem.alt === 'Chip Bag') {
            alert("Chip bags should be trashed, not recycled, because they’re made from mixed materials like plastic and foil, which can’t be separated by recycling machines. This makes them too difficult to recycle, so it’s better to dispose of them in the trash.");
        }
        if (draggedItem.alt === 'Banana Peel') {
            alert("Banana peels should be composted because they break down naturally and turn into nutrient-rich soil. Composting them helps reduce waste in landfills and creates healthy fertilizer for plants and gardens!");
        }
        if (draggedItem.alt === 'Apple Core') {
            alert("Apple cores should be composted because they decompose quickly and add valuable nutrients to the soil. Composting them reduces landfill waste and helps plants grow strong and healthy!");
        }
        if (draggedItem.alt === 'Cardboard Box') {
            alert("Cardboard boxes should be recycled because it saves a lot of resources. Recycling just one ton of cardboard can save 17 trees, 7,000 gallons of water, and enough energy to power a home for six months. It also reduces landfill waste and helps protect the Earth!");
        }
        if (draggedItem.alt === 'Eggshell') {
            alert("Eggshells should be composted because they enrich the soil with calcium, which is essential for plant growth. Composting a pound of eggshells can help improve the health of about 1,000 square feet of garden space, reducing landfill waste and creating healthier plants!");
        }
        if (draggedItem.alt === 'Styrofoam Cup') {
            alert("Styrofoam cups should be trashed because they are made from a type of plastic that doesn’t break down easily and can take hundreds of years to decompose. This contributes to landfill waste and pollution, making it better to dispose of them in the trash rather than trying to recycle.");
        }
        if (draggedItem.alt === 'Teddy Bear') {
            alert("Teddy bears should be trashed if they are damaged beyond repair because they are often made from mixed materials like fabric, plastic, and stuffing, which can complicate recycling. Throwing them away prevents contamination in recycling streams and ensures that they don’t end up causing waste issues.");
        }
        // Increment points and update display
        points += 10;
        updatePointsDisplay();
    } else {
        alert("Incorrect! Try again.");
        points -= 5;
        updatePointsDisplay();
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