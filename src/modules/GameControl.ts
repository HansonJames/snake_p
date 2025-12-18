import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import { ParticleSystem } from "./ParticleEffect";
import { AudioManager } from "./AudioManager";
import { ObstacleManager } from "./ObstacleManager";
import { Boss } from "./Boss";

// 游戏控制器，控制其他所有类
class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 记分牌
    scorePanel: ScorePanel;
    // 粒子系统
    particleSystem: ParticleSystem;
    // 音效管理器
    audioManager: AudioManager;
    // 障碍物管理器
    obstacleManager: ObstacleManager;
    // Boss
    boss: Boss | null = null;
    // 子弹
    bullets: HTMLDivElement[] = [];

    // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = '';
    // 创建一个属性用来记录游戏是否结束
    isLive = true;
    
    // 游戏速度
    speed: number = 300;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 5); // 每5分升级
        this.particleSystem = new ParticleSystem();
        this.audioManager = new AudioManager();
        this.obstacleManager = new ObstacleManager();

        this.init();
    }

    // 游戏的初始化方法，调用后游戏即开始
    init() {
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        
        // 初始化障碍物
        this.obstacleManager.generateObstacles(this.scorePanel.stage);
        
        // 播放背景音乐
        // 注意：浏览器可能阻止自动播放，需要在用户交互后播放
        document.addEventListener('click', () => {
            this.audioManager.playBgm();
        }, { once: true });

        // 调用run方法，使蛇移动
        this.run();
    }

    /*
    *   ArrowUp  Up  w
    *   ArrowDown Down s
    *   ArrowLeft Left a
    *   ArrowRight Right d
    * */

    // 创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        // 需要检查event.key的值是否合法（用户是否按了正确的按键）
        // 修改direction属性
        
        // Prevent default scrolling for arrow keys
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].indexOf(event.key) > -1) {
            event.preventDefault();
        }

        switch(event.key.toLowerCase()) {
            case 'arrowup':
            case 'up':
            case 'w':
                if (this.direction !== 'ArrowDown' && this.direction !== 'Down' && this.direction !== 's')
                    this.direction = event.key;
                break;
            case 'arrowdown':
            case 'down':
            case 's':
                if (this.direction !== 'ArrowUp' && this.direction !== 'Up' && this.direction !== 'w')
                    this.direction = event.key;
                break;
            case 'arrowleft':
            case 'left':
            case 'a':
                if (this.direction !== 'ArrowRight' && this.direction !== 'Right' && this.direction !== 'd')
                    this.direction = event.key;
                break;
            case 'arrowright':
            case 'right':
            case 'd':
                if (this.direction !== 'ArrowLeft' && this.direction !== 'Left' && this.direction !== 'a')
                    this.direction = event.key;
                break;
            case 'r':
                this.restartGame();
                break;
            case 't':
                this.prevStage();
                break;
            case 'y':
                this.nextStage();
                break;
            case 'g':
                this.speed = Math.max(50, this.speed - 50);
                break;
            case 'h':
                this.speed = Math.min(1000, this.speed + 50);
                break;
            case 'f':
                this.shoot();
                break;
        }
    }

    restartGame() {
        location.reload();
    }

    prevStage() {
        if (this.scorePanel.stage > 1) {
            this.scorePanel.setStage(this.scorePanel.stage - 1);
            this.resetStage();
        }
    }

    nextStage() {
        if (this.scorePanel.stage < this.scorePanel.maxStage) {
            this.scorePanel.setStage(this.scorePanel.stage + 1);
            this.resetStage();
        }
    }

    resetStage() {
        this.obstacleManager.generateObstacles(this.scorePanel.stage);
        this.food.change(this.obstacleManager.obstacleCoords);
        
        // Boss check
        if (this.boss) {
            this.boss.die();
            this.boss = null;
        }
        if (this.scorePanel.stage % 5 === 0) {
            this.boss = new Boss(this.scorePanel.stage);
        }
    }

    shoot() {
        if (!this.isLive) return;
        
        const bullet = document.createElement('div');
        bullet.style.width = '5px';
        bullet.style.height = '5px';
        bullet.style.backgroundColor = 'yellow';
        bullet.style.position = 'absolute';
        
        let bx = this.snake.X + 5;
        let by = this.snake.Y + 5;
        
        bullet.style.left = bx + 'px';
        bullet.style.top = by + 'px';
        
        document.getElementById('stage')!.appendChild(bullet);
        
        let vx = 0;
        let vy = 0;
        
        // Determine bullet direction based on last move direction
        // Default to right if no direction
        if (this.direction === 'ArrowUp' || this.direction === 'Up' || this.direction === 'w') vy = -10;
        else if (this.direction === 'ArrowDown' || this.direction === 'Down' || this.direction === 's') vy = 10;
        else if (this.direction === 'ArrowLeft' || this.direction === 'Left' || this.direction === 'a') vx = -10;
        else vx = 10; // Default right

        const bulletInterval = setInterval(() => {
            bx += vx;
            by += vy;
            bullet.style.left = bx + 'px';
            bullet.style.top = by + 'px';

            // Hit Boss
            if (this.boss && this.boss.isAlive) {
                if (bx >= this.boss.X && bx <= this.boss.X + 30 &&
                    by >= this.boss.Y && by <= this.boss.Y + 30) {
                        this.boss.takeDamage();
                        clearInterval(bulletInterval);
                        if(bullet.parentNode) bullet.parentNode.removeChild(bullet);
                        
                        // Particle effect on hit
                        this.particleSystem.addParticles(bx, by, 5, 'red');
                        
                        if (!this.boss.isAlive) {
                            this.boss = null;
                            // Bonus points for killing boss
                            this.scorePanel.score += 50;
                            this.scorePanel.scoreEle.innerHTML = this.scorePanel.score + '';
                        }
                        return;
                }
            }

            // Hit Wall or Obstacle
            if (bx < 0 || bx > 290 || by < 0 || by > 290 || this.obstacleManager.checkCollision(bx, by)) {
                clearInterval(bulletInterval);
                if(bullet.parentNode) bullet.parentNode.removeChild(bullet);
            }
        }, 30);
    }

    // 创建一个控制蛇移动的方法
    run() {
        if(!this.isLive) return;
        /*
        *   根据方向（this.direction）来使蛇的位置改变
        *       向上 top 减少
        *       向下 top 增加
        *       向左 left 减少
        *       向右 left 增加
        * */
        // 获取蛇现在坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 根据按键方向来修改X值和Y值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
            case "w":
                // 向上移动 top 减少
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
            case "s":
                // 向下移动 top 增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
            case "a":
                // 向左移动 left 减少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
            case "d":
                // 向右移动 left 增加
                X += 10;
                break;
        }

        // 检查蛇是否吃到了食物
        this.checkEat(X, Y);

        // Check collision with obstacles
        if (this.obstacleManager.checkCollision(X, Y)) {
             this.isLive = false;
             this.audioManager.playDeath();
             alert('撞到障碍物了！ GAME OVER!');
             return;
        }
        
        // Check collision with Boss
        if (this.boss && this.boss.isAlive) {
             if (X >= this.boss.X && X <= this.boss.X + 30 &&
                 Y >= this.boss.Y && Y <= this.boss.Y + 30) {
                     this.isLive = false;
                     this.audioManager.playDeath();
                     alert('被Boss打败了！ GAME OVER!');
                     return;
             }
             // Boss moves
             if(Math.random() < 0.1) this.boss.move(); // Boss moves occasionally
        }

        //修改蛇的X和Y值
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            // 进入到catch，说明出现了异常，游戏结束，弹出一个提示框
            this.audioManager.playDeath();
            alert(e.message + ' GAME OVER!');
            // 将isLive设置为false
            this.isLive = false;
        }

        // 更新粒子系统（安全更新）
        if (this.particleSystem && this.particleSystem.update) {
            this.particleSystem.update();
        }

        // 开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this), this.speed);
    }

    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 播放吃食物音效
            this.audioManager.playEat();

            // 在食物位置创建粒子特效
            try {
                this.particleSystem.addParticles(
                    X + 5,
                    Y + 5,
                    10,
                    '#FFD700'
                );
            } catch (e) {
                // 粒子特效错误不影响游戏继续
                console.error('Particle effect error:', e);
            }
            
            // 食物的位置要进行重置
            this.food.change(this.obstacleManager.obstacleCoords);
            // 分数增加
            const currentStage = this.scorePanel.stage;
            this.scorePanel.addScore();
            // Check if stage increased
            if (this.scorePanel.stage > currentStage) {
                this.resetStage();
            }

            // 蛇要增加一节
            this.snake.addBody();
        }
    }
}

export default GameControl;
