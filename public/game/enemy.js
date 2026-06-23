export function spawnEnemy(gameArea) {
    const enemy = document.createElement("div");
    enemy.className = "enemy";
    const x = Math.random() * (gameArea.clientWidth - 60);
    enemy.style.left = `${x}px`;
    enemy.style.top = "-40px";
    gameArea.appendChild(enemy);
    return {
        element: enemy,
        x,
        y: -40
    };
}
