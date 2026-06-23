import { Bullet } from '../interface/Bullet.js';

export function shoot(player: HTMLElement, gameArea: HTMLElement, playerX: number): Bullet {
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
