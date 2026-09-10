# 咕咕寻宝 · Gugu Treasure

> 城市鸽子收集宝物的三消解压小游戏 — 单文件 HTML 原型

一只圆滚滚的鸽子"咕咕"在城市各个角落拾宝——点击叠放的宝物方块送入底部队列，集齐 3 个相同宝物即可消除。全部消完即过关。

## 🎮 在线试玩

部署在 GitHub Pages：<https://sutianba.github.io/gugu-treasure/>

任意浏览器打开即可，无需安装。

## ✨ 当前特性

- **核心三消玩法**：堆叠方块 → 7 格队列 → 集齐 3 个消除
- **5 个内置关卡**：中央公园 / 屋顶天台 / 地铁站台 / 樱花广场 / 海边码头
- **10 种宝物**：🪙🔴🪶🍬🌰🎲🔑💎🌿🧿
- **道具系统**：撤回 ×3 / 洗牌 ×1 / 透视 ×1 / 重来
- **鸽子情绪反馈**：开心 / 紧张 / 慌张 / 兴奋 / 难过 / 胜利，6 种表情实时切换
- **大橘捣乱机制**：橘猫随机盖方块，连消 2 次赶走
- **风向特效**：叶子飘过的氛围动画
- **WebAudio 即时音效**：拾取 / 消除 / 连消 / 过关 / 大橘
- **localStorage 持久化**：进度、得分、巢穴自动保存，刷新不丢
- **手机端友好**：viewport 配置 + 38-40px 触控热区

## 📁 项目结构

```
gugu-treasure/
├── index.html       # 游戏主文件（HTML+CSS+JS+SVG 单文件）
├── README.md        # 本文件
└── .gitignore       # 忽略临时文件
```

整个游戏只有一个 HTML 文件，方便分发、二次开发和、嵌入到其他平台。

## 🛠 本地运行

需要 Python 3 或 Node.js 任一即可：

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
```

然后浏览器访问 `http://localhost:8000/`。

**注意**：直接双击 `index.html`（用 `file://` 协议打开）会导致 AudioContext 在部分浏览器被禁用，请通过 HTTP 协议访问。

## 📜 版本历史

- **v0.2** (2026-09-09) — localStorage 持久化、继续游戏、重新开始
- **v0.1** (2026-09-08) — 核心玩法、5 关、道具、鸽子情绪、大橘、风向、音效

## 🎯 设计方案

完整游戏设计方案见 [`设计方案.html`](./设计方案.html)（如未上传请参考 WorkBuddy 分享链接）。

## 📝 协议

MIT License — 欢迎 fork、二次开发、提交 PR。

---

Made with 💛 by [sutianba](https://github.com/sutianba)