import { hit } from '../utils/collision.js';
import { spawnEnemy } from './enemy.js';
import { shoot } from './bullet.js';
import { calculateAndMovePlayer } from './player.js';
export class GameController {
    constructor() {
        this.playerX = 275;
        this.score = 0;
        this.bullets = [];
        this.enemies = [];
        this.player = document.getElementById('player');
        this.gameArea = document.getElementById('gameArea');
        this.scoreText = document.getElementById('score');
        this.highScoreText = document.getElementById('highScore');
        this.highScore = parseInt(localStorage.getItem('highScore') || '0', 10);
        if (this.highScoreText) {
            this.highScoreText.textContent = this.highScore.toString();
        }
        this.setupControls();
    }
    startGame() {
        const splash = document.getElementById('splash');
        if (splash) {
            splash.style.opacity = '0';
            splash.style.transition = '0.5s ease';
            setTimeout(() => {
                splash.style.display = 'none';
                this.gameArea.style.display = 'block';
                this.startGameLoop();
            }, 500);
        }
    }
    startGameLoop() {
        this.score = 0;
        this.scoreText.textContent = this.score.toString();
        this.bullets = [];
        this.enemies = [];
        this.spawnInterval = window.setInterval(() => this.handleSpawnEnemy(), 1000);
        this.gameLoopInterval = window.setInterval(() => this.updateLoop(), 20);
    }
    updateLoop() {
        // Handle Bullets movement
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].y -= 10;
            this.bullets[i].element.style.top = `${this.bullets[i].y}px`;
            if (this.bullets[i].y < 0) {
                this.bullets[i].element.remove();
                this.bullets.splice(i, 1);
            }
        }
        // Handle Enemies movement & collisions
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            this.enemies[i].y += 3;
            this.enemies[i].element.style.top = `${this.enemies[i].y}px`;
            const playerBox = {
                x: this.player.offsetLeft,
                y: this.player.offsetTop,
                width: this.player.offsetWidth,
                height: this.player.offsetHeight,
            };
            const enemyBox = {
                x: this.enemies[i].x,
                y: this.enemies[i].y,
                width: 60,
                height: 50,
            };
            if (hit(playerBox, enemyBox)) {
                this.endGame();
                return;
            }
            // Bullet - Enemy Collision Loop
            for (let j = this.bullets.length - 1; j >= 0; j--) {
                const bulletBox = {
                    x: this.bullets[j].element.offsetLeft,
                    y: this.bullets[j].y,
                    width: 6,
                    height: 18,
                };
                if (hit(bulletBox, enemyBox)) {
                    this.bullets[j].element.remove();
                    this.bullets.splice(j, 1);
                    this.enemies[i].element.remove();
                    this.enemies.splice(i, 1);
                    this.score += 10;
                    this.scoreText.textContent = this.score.toString();
                    break;
                }
            }
        }
    }
    handleShoot() {
        const bullet = shoot(this.player, this.gameArea, this.playerX);
        this.bullets.push(bullet);
    }
    handleSpawnEnemy() {
        const enemy = spawnEnemy(this.gameArea);
        this.enemies.push(enemy);
    }
    endGame() {
        clearInterval(this.spawnInterval);
        clearInterval(this.gameLoopInterval);
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore.toString());
            alert('New High Score: ' + this.score);
        }
        else {
            alert('Game Over! Score: ' + this.score);
        }
        location.reload();
    }
    setupControls() {
        document.addEventListener('keydown', (e) => {
            const maxX = this.gameArea.clientWidth - this.player.offsetWidth;
            let direction = 0;
            if (e.key === 'ArrowLeft')
                direction = -20;
            if (e.key === 'ArrowRight')
                direction = 20;
            if (e.code === 'Space')
                this.handleShoot();
            if (direction !== 0) {
                this.playerX = calculateAndMovePlayer(this.playerX, direction, maxX, this.player);
            }
        });
        // Mobile touch controls
        let touchX = 0;
        this.gameArea.addEventListener('touchstart', (e) => {
            touchX = e.touches[0].clientX;
        });
        this.gameArea.addEventListener('touchmove', (e) => {
            let newX = e.touches[0].clientX;
            let diff = newX - touchX;
            const maxX = this.gameArea.clientWidth - this.player.offsetWidth;
            this.playerX = calculateAndMovePlayer(this.playerX, diff * 0.2, maxX, this.player);
            touchX = newX;
        });
    }
}
