import { Link } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";

function Navbar() {
  const sectionLinks = [
    { path: "/info", label: "关于" },
    { path: "/hobby", label: "爱好" },
    { path: "/skills", label: "技能" },
    { path: "/education", label: "教育" },
    { path: "/experience", label: "项目" },
    { path: "/contact", label: "联系" },
  ];

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
          Home
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
        <ThemeToggleButton />
      </div>
    </nav>
  );
}

export default Navbar;
