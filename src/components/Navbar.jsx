import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const sectionLinks = [
    { path: "/info", label: "关于" },
    { path: "/summary", label: "爱好" },
    { path: "/skills", label: "技能" },
    { path: "/education", label: "教育" },
    { path: "/experience", label: "项目" },
  ];

  // 初始化主题（从 localStorage 读取）
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-progress" aria-hidden="true" />
      <div className="container nav-content">
        <Link
          to="/"
          className="logo"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Homepage
        </Link>
        <ul className="nav-links">
          {sectionLinks.map((section) => (
            <li key={section.path}>
              <Link to={section.path}>{section.label}</Link>
            </li>
          ))}
        </ul>
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
