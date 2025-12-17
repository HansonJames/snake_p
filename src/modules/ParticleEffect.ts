// 粒子类
class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    size: number;
    element: HTMLElement;
    stage: HTMLElement | null;

    constructor(x: number, y: number, color: string = '#FFD700') {
        this.stage = document.getElementById('stage');
        
        if (!this.stage) {
            throw new Error('Stage not found');
        }

        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3 - 1;
        this.maxLife = 30;
        this.life = this.maxLife;
        this.color = color;
        this.size = 2 + Math.random() * 2;

        // 创建粒子DOM元素
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
        this.element.style.backgroundColor = this.color;
        this.element.style.borderRadius = '50%';
        this.element.style.pointerEvents = 'none';
        this.element.style.boxShadow = `0 0 6px ${this.color}`;
        this.element.style.zIndex = '999';
        this.element.style.left = Math.round(this.x) + 'px';
        this.element.style.top = Math.round(this.y) + 'px';
        this.element.style.transition = 'none';

        // 添加到舞台
        if (this.stage && this.stage.parentNode) {
            this.stage.appendChild(this.element);
        }
    }

    update() {
        // 更新位置
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // 重力效果

        // 生命递减
        this.life--;

        // 计算透明度
        const opacity = Math.max(0, this.life / this.maxLife);

        // 更新DOM元素样式
        this.element.style.left = Math.round(this.x) + 'px';
        this.element.style.top = Math.round(this.y) + 'px';
        this.element.style.opacity = opacity.toString();
    }

    isDead(): boolean {
        return this.life <= 0;
    }

    remove() {
        try {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        } catch (e) {
            // 忽略移除错误
        }
    }
}

// 粒子系统类
class ParticleSystem {
    particles: Particle[] = [];
    isActive: boolean = true;
    maxParticles: number = 200;

    addParticles(x: number, y: number, count: number = 8, color: string = '#FFD700') {
        try {
            for (let i = 0; i < count; i++) {
                if (this.particles.length < this.maxParticles) {
                    this.particles.push(new Particle(x, y, color));
                }
            }
        } catch (e) {
            console.error('Error adding particles:', e);
        }
    }

    update() {
        try {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const particle = this.particles[i];
                
                if (particle) {
                    particle.update();

                    if (particle.isDead()) {
                        particle.remove();
                        this.particles.splice(i, 1);
                    }
                }
            }
        } catch (e) {
            console.error('Error updating particles:', e);
            // 清理可能有问题的粒子
            this.particles = this.particles.filter(p => p && p.element && p.element.parentNode);
        }
    }

    clear() {
        for (const particle of this.particles) {
            if (particle) {
                particle.remove();
            }
        }
        this.particles = [];
    }
}

export { Particle, ParticleSystem };
