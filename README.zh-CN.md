# 贪吃蛇游戏

使用 TypeScript 和 Vite 实现的经典贪吃蛇游戏，具有精美的粒子特效和视觉增强。

![版本](https://img.shields.io/badge/版本-1.2.0-blue)
![许可证](https://img.shields.io/badge/许可证-MIT-green)
![状态](https://img.shields.io/badge/状态-活跃-brightgreen)

[English Documentation](./README.md)

## ✨ 功能特性

- **经典玩法**: 控制蛇移动吃食物并变长。
- **分数与等级系统**: 吃到食物获得分数。随着分数增加，游戏等级提升，蛇的移动速度也会变快。
- **灵敏控制**: 使用方向键控制蛇的移动方向。
- **碰撞检测**: 蛇撞墙或撞到自己时游戏结束。
- **🎆 粒子特效**: 吃到食物时绽放美丽的粒子动画效果 (v1.2.0+)
- **🎨 增强视觉**: 现代化 UI 设计，包含渐变、阴影和发光效果 (v1.2.0+)
- **🌐 国际化**: 支持中英文界面切换

## 📊 技术栈

- **TypeScript**: 提供类型安全的代码和更好的开发体验。
- **Vite**: 下一代前端构建工具，提供极速的开发和构建体验。
- **Less**: CSS 预处理器，用于样式编写。
- **粒子系统**: 自定义粒子特效引擎，增强视觉效果。

## 🚀 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) (推荐最新的 LTS 版本)
- [pnpm](https://pnpm.io/)

### 安装

1. 克隆仓库:
   ```bash
   git clone https://github.com/HansonJames/snake_p.git
   cd snake_p
   ```

2. 安装依赖:
   ```bash
   pnpm install
   ```

### 运行游戏

启动开发服务器:

```bash
pnpm dev
```

打开浏览器并访问终端中显示的 URL (通常是 `http://localhost:5173`)。

### 构建生产版本

构建项目:

```bash
pnpm build
```

预览生产版本构建:

```bash
pnpm preview
```

## 📝 版本历史

### v1.2.0 (2025-12-17)
- ✨ 新增粒子特效系统
- 🎨 增强视觉设计，添加渐变和阴影效果
- 🔧 修复蛇身体初始化 bug
- 🎯 改进碰撞检测算法
- 🌐 中文界面完全支持

### v1.0.2
- 初始发布版本

## 🤝 贡献指南

欢迎提交贡献！请查看 [CONTRIBUTORS.md](./CONTRIBUTORS.md) 了解详细指南。

### 如何贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](./LICENSE) 文件。

## 👤 作者

**Hanson James** (hanson666888)
- GitHub: [@HansonJames](https://github.com/HansonJames)

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=HansonJames/snake_p&type=Date)](https://star-history.com/#HansonJames/snake_p&Date)

