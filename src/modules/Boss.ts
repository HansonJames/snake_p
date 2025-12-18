export class Boss {
    element: HTMLElement;
    hp: number;
    maxHp: number;
    isAlive: boolean = true;
    X: number = 0;
    Y: number = 0;

    constructor(stage: number) {
        this.maxHp = stage * 5; // Boss HP scales with stage
        this.hp = this.maxHp;
        
        // Create boss element
        this.element = document.createElement('div');
        this.element.className = 'boss';
        this.element.style.width = '30px';
        this.element.style.height = '30px';
        this.element.style.backgroundColor = 'red';
        this.element.style.position = 'absolute';
        this.element.style.borderRadius = '50%';
        this.element.style.zIndex = '10';
        
        const stageElement = document.getElementById('stage')!;
        stageElement.appendChild(this.element);
        
        this.spawn();
    }

    spawn() {
        // Random position
        this.X = Math.round(Math.random() * 27) * 10;
        this.Y = Math.round(Math.random() * 27) * 10;
        this.element.style.left = this.X + 'px';
        this.element.style.top = this.Y + 'px';
    }

    takeDamage(damage: number = 1) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die();
        } else {
            // Flash effect
            this.element.style.backgroundColor = 'white';
            setTimeout(() => {
                this.element.style.backgroundColor = 'red';
            }, 100);
        }
    }

    die() {
        this.isAlive = false;
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    move() {
        // Simple random movement
        const direction = Math.floor(Math.random() * 4);
        switch(direction) {
            case 0: this.Y -= 10; break;
            case 1: this.Y += 10; break;
            case 2: this.X -= 10; break;
            case 3: this.X += 10; break;
        }
        
        // Boundaries check (0-290 for 30px boss means max is 270)
        if (this.X < 0) this.X = 0;
        if (this.X > 270) this.X = 270;
        if (this.Y < 0) this.Y = 0;
        if (this.Y > 270) this.Y = 270;

        this.element.style.left = this.X + 'px';
        this.element.style.top = this.Y + 'px';
    }
}
