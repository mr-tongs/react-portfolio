import { useEffect } from "react";
// 导入 React 的 useEffect 钩子，用于处理副作用（如操作 DOM）

import { useLocalStorage } from "./useLocalStorage";
// 导入自定义的 useLocalStorage 钩子，用于在 localStorage 中持久化存储主题状态

export function useTheme() {
  // 导出一个名为 useTheme 的自定义钩子，用于管理主题（暗黑/明亮）状态和相关操作

  const [theme, setTheme] = useLocalStorage("theme", "light");
  // 调用 useLocalStorage 钩子，键名为 "theme"，默认值为 "light"
  // 返回一个数组 [theme, setTheme]，theme 为当前主题字符串，setTheme 用于更新主题

  const isDark = theme === "dark";
  // 根据当前主题计算一个布尔值 isDark，如果主题是 "dark" 则为 true，否则为 false
  // 这个变量方便在组件中判断是否为暗黑模式

  useEffect(() => {
    // 使用 useEffect 监听 isDark 的变化，在 isDark 改变时执行副作用
    // 副作用：根据 isDark 的值在 document.body 上添加或移除 CSS 类 "dark-mode"

    if (typeof document === "undefined") return;
    // 检查是否在浏览器环境（避免在服务端渲染时操作 document）
    // 如果 document 未定义（例如在 SSR 中），则直接返回，不执行后续 DOM 操作

    if (isDark) {
      // 如果当前是暗黑模式（isDark 为 true）
      document.body.classList.add("dark-mode");
      // 给 <body> 元素添加 "dark-mode" 类，触发暗黑主题的 CSS 样式
    } else {
      // 否则（明亮模式）
      document.body.classList.remove("dark-mode");
      // 从 <body> 元素移除 "dark-mode" 类，恢复明亮主题样式
    }
  }, [isDark]);
  // 依赖数组为 [isDark]，只有当 isDark 发生变化时才会重新运行此副作用
  // 这确保了主题切换时 DOM 类名及时更新

  const toggleTheme = () => {
    // 定义一个函数 toggleTheme，用于切换主题
    setTheme(isDark ? "light" : "dark");
    // 调用 setTheme 更新主题：如果当前是暗黑模式（isDark 为 true），则设为 "light"；否则设为 "dark"
  };

  return { theme, isDark, toggleTheme };
  // 返回一个对象，包含当前主题字符串 theme、布尔值 isDark 和切换函数 toggleTheme
  // 组件可以通过解构获取这些值并使用
}