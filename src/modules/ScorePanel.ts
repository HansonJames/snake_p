// 定义表示记分牌的类
class ScorePanel {
    // score和stage用来记录分数和关卡
    score = 0;
    stage = 1;

    // 分数和关卡所在的元素，在构造函数中进行初始化
    scoreEle: HTMLElement;
    stageEle: HTMLElement;

    // 设置一个变量限制关卡
    maxStage: number;
    // 设置一个变量表示多少分升级
    upScore: number;

    constructor(maxStage: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.stageEle = document.getElementById('level')!; // Reuse level element for stage
        this.maxStage = maxStage;
        this.upScore = upScore;
    }

    // 设置一个加分的方法
    addScore() {
        // 使分数自增
        this.scoreEle.innerHTML = ++this.score + '';
        // 判断分数是多少
        if (this.score % this.upScore === 0) {
            this.stageUp();
        }
    }

    // 提升关卡的方法
    stageUp() {
        if (this.stage < this.maxStage) {
            this.stageEle.innerHTML = ++this.stage + '';
        }
    }
    
    // 设置关卡
    setStage(stage: number) {
        if (stage >= 1 && stage <= this.maxStage) {
            this.stage = stage;
            this.stageEle.innerHTML = this.stage + '';
        }
    }

    reset() {
        this.score = 0;
        this.stage = 1;
        this.scoreEle.innerHTML = '0';
        this.stageEle.innerHTML = '1';
    }
}

export default ScorePanel;
