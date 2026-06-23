export function calculateAndMovePlayer(currentX, direction, maxX, playerElement) {
    let newX = currentX + direction;
    newX = Math.max(0, Math.min(maxX, newX));
    playerElement.style.left = `${newX}px`;
    return newX;
}
