export function shoot(player, gameArea, playerX) {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = `${playerX + 18}px`;
    bullet.style.top = `${player.offsetTop}px`;
    gameArea.appendChild(bullet);
    return {
        element: bullet,
        y: player.offsetTop,
    };
}
