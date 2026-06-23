export function calculateAndMovePlayer(currentX, direction, maxX, playerElement) {
    // Compute target layout placement
    let newX = currentX + direction;
    // Constrain position between left edge (0) and max width limit
    newX = Math.max(0, Math.min(maxX, newX));
    // Render positioning modification directly on the layout node
    playerElement.style.left = `${newX}px`;
    return newX;
}
