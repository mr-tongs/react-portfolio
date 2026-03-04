import { useTheme } from "../hooks/useTheme";

/**
 * 主题切换按钮组件
 * 
 * 提供一个按钮，点击可在深色主题和浅色主题之间切换。
 * 按钮内的图标根据当前主题动态变化（深色显示🌞，浅色显示🌙），
 * 并添加相应的 CSS 类名以便样式定制。
 * 
 * @component
 * @returns {JSX.Element} 主题切换按钮
 */

function ThemeToggleButton() {
  // 从自定义 hook 中获取当前是否为深色主题的标志以及切换主题的函数
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme} // 点击时调用 toggleTheme 切换主题
      // 动态类名：基础样式 btn + theme-toggle，并根据主题添加 is-dark 或 is-light
      className={`btn theme-toggle ${isDark ? "is-dark" : "is-light"}`}
      style={{ padding: "5px 10px" }}
      aria-label="Toggle theme" // 为屏幕阅读器提供说明
    >
      {/* 图标元素：aria-hidden 避免辅助技术重复朗读 */}
      <span className="theme-icon" aria-hidden="true">
        {isDark ? "🌞" : "🌙"} {/* 深色主题显示太阳图标（表示可切换到亮色），浅色显示月亮图标 */}
      </span>
    </button>
  );
}

export default ThemeToggleButton;