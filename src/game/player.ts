export function calculateAndMovePlayer(
    currentX: number,
    direction: number,
    maxX: number,
    playerElement: HTMLElement
): number {
   
    let newX = currentX + direction;

    newX = Math.max(0, Math.min(maxX, newX));

    playerElement.style.left = `${newX}px`;

    return newX;
}