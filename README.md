# 个人主页 - [唐卓]

> 一个现代化的个人作品集网站，展示我的技能、项目和经历。

🔗 **在线访问**: [https://mr-tongs.github.io/react-portfolio/](https://mr-tongs.github.io/react-portfolio/)

![主页截图](./screenshots/home.png)

## ✨ 特性

- 🎨 现代化设计，响应式布局
- 🌓 支持亮色/暗黑模式切换
- ⚡ 使用 React 构建，性能优异
- 📱 完美适配移动端、平板、桌面端
- 🚀 部署在 GitHub Pages

## 🛠️ 技术栈

- **框架**: React 18
- **构建工具**: Vite
- **路由**: React Router v6
- **样式**: CSS3 + CSS Modules
- **部署**: GitHub Pages

## 📂 项目结构

\`\`\`
src/
├── components/    # 可复用组件
├── pages/         # 页面组件
├── context/       # 状态管理
├── data/          # 数据文件
└── styles/        # 样式文件
\`\`\`

## 🎨 设计参考

本项目的设计灵感来源于：

1. [Brittany Chiang](https://brittanychiang.com/) - 整体布局风格
2. [Dribbble](https://dribbble.com/shots/...) - 配色方案
3. [Born&Bred](https://bornandbredbrand.com/) - 文字动画效果

## 🤖 AI 协作记录

### 使用的 AI 工具
- **GitHub Copilot**: 代码补全和重构建议
- **DeepSeek & Gemini**: 问题解答和代码优化

### 主要协作场景

#### 1. 响应式布局实现
**问题**: 如何让导航栏在移动端和桌面端有不同表现
**AI 帮助**: 提供了 media query 和 CSS Grid 的解决方案
**我的修改**: 调整了断点值，增加了平滑过渡效果
**学到的知识**: CSS Grid 的 auto-fit 和 minmax 用法

#### 2. React 状态管理
**问题**: 多个组件需要共享主题状态
**AI 帮助**: 建议使用 Context API 并给出示例代码
**我的修改**: 将主题状态持久化到 localStorage
**学到的知识**: Context Provider 的实现原理

#### 3. 性能优化
**问题**: 首屏加载较慢
**AI 帮助**: 建议使用 React.lazy 进行代码分割
**我的修改**: 对项目详情页实现了懒加载
**学到的知识**: 动态 import 和 Suspense 的使用

### AI 使用心得

1. AI 能快速提供解决思路，但要理解原理后再使用
2. 对于复杂需求，要分步骤提问，逐步完善
3. AI 生成的代码需要根据实际项目调整和优化
4. 保持独立思考，不过度依赖 AI

## 🚀 本地运行

\`\`\`bash
### 克隆项目
git clone https://github.com/mr-tongs/react-portfolio.git

### 进入目录
cd react-portfolio

### 安装依赖
npm install

### 启动开发服务器
npm run dev

### 构建生产版本
npm run build
\`\`\`

访问 `http://localhost:5173` 查看项目。

## 📦 部署

\`\`\`bash
### 部署到 GitHub Pages
npm run deploy
\`\`\`

## 📄 开源协议

MIT License

---

**联系我**: [tangz@mail.ustc.edu.cn](mailto:tangz@mail.ustc.edu.cn)
\`\`\`

## ✅ 验收标准

在提交前，请对照以下清单自查：

### 功能完整性
- [ ] 所有必需页面都已完成
- [ ] 路由正常工作，无 404
- [ ] 暗黑模式切换正常
- [ ] 响应式布局在各设备上正常

### 代码质量
- [ ] 组件拆分合理
- [ ] 代码有适当注释
- [ ] 无 console.log 等调试代码
- [ ] 无 ESLint 错误
- [ ] Git commit 信息清晰

### 设计审美
- [ ] 配色协调统一
- [ ] 排版整洁有序
- [ ] 有交互动画效果
- [ ] 参考了优秀设计
- [ ] 在 README 中注明设计来源

### 文档完善
- [ ] README 完整详细
- [ ] 包含 AI 协作记录
- [ ] 有项目运行说明
- [ ] 有在线访问链接

### 部署成功
- [ ] GitHub Pages 部署成功
- [ ] 在线链接可正常访问
- [ ] 在真机上测试过
- [ ] 分享给朋友测试过

## 💡 加分项（可选）

想要更高的分数？考虑添加这些：

- 🎭 流畅的页面切换动画
- 🌍 国际化（中英文切换）
- 📊 技能可视化（进度条、雷达图）
- 📧 联系表单（集成 EmailJS 或 Formspree）
- 📝 集成博客（Markdown 渲染）
- 🎨 可自定义主题色
- ♿ 无障碍访问优化
- 🔍 SEO 优化
- 📈 Google Analytics 集成

## 🆘 常见问题

### 1. 部署后页面空白
- 检查 `vite.config.js` 中的 `base` 配置
- 确保 `package.json` 中的 `homepage` 正确

### 2. 路由刷新后 404
- GitHub Pages 不支持客户端路由
- 解决方案：使用 HashRouter 或添加 404.html 重定向

### 3. 图片加载失败
- 图片路径要使用相对路径
- 或使用 `import` 导入图片

### 4. 打包后 CSS 样式丢失
- 检查 CSS 文件是否正确导入
- 确认 Vite 配置是否正确

更多问题查看 [问题排查指南](./troubleshooting.md)。
