import { useState, useEffect } from "react"; // 导入React hooks
import { Link } from "react-router-dom";

function Navbar() {
  const [isDark, setIsDark] = useState(false); // 状态：当前是否为深色模式，默认为浅色模式(false)
  const sectionLinks = [
    { path: "/info", label: "关于" },
    { path: "/summary", label: "爱好" },
    { path: "/skills", label: "技能" },
    { path: "/education", label: "教育" },
    { path: "/experience", label: "项目" },
    { path: "/contact", label: "联系" },
  ];

  // 初始化主题（从 localStorage 读取）
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.body.classList.add("dark-mode"); // 给body添加深色模式类
    }
  }, []); // 空依赖数组：只在组件挂载时执行一次

  // 切换主题的函数
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      // 切换到深色模式
      document.body.classList.add("dark-mode"); // 添加深色类
      localStorage.setItem("theme", "dark"); // 保存到本地存储
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="navbar">
      {/* 进度条指示器 - 路由切换时会有动画效果 */}
      <div className="navbar-progress" aria-hidden="true" />
      <div className="container nav-content">
        <Link
          to="/" // 指向根路径
          className="logo"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Homepage
        </Link>

        {/* 导航链接列表 */}
        <ul className="nav-links">
          {sectionLinks.map((section) => (
            <li key={section.path}>
              <Link to={section.path}>{section.label}</Link>
            </li>
          ))}
        </ul>

        {/* 主题切换按钮 */}
        <button
          onClick={toggleTheme}
          className={`btn theme-toggle ${isDark ? "is-dark" : "is-light"}`}
          style={{ padding: "5px 10px" }}
          aria-label="Toggle theme"
        >
          <span className="theme-icon" aria-hidden="true">
            {isDark ? "🌞" : "🌙"}
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
