import { Link } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import { useLanguage } from "../contexts/LanguageContext";
import AnimatedText from "./AnimatedText";

const sectionLinks = [
  { path: "/info", key: "navAbout" },
  { path: "/hobby", key: "navHobby" },
  { path: "/skills", key: "navSkills" },
  { path: "/education", key: "navEducation" },
  { path: "/experience", key: "navExperience" },
  { path: "/contact", key: "navContact" },
];

function Navbar() {
  const { lang, setLang, t } = useLanguage();

  return (
    <nav className="navbar">
      <div className="navbar-progress" aria-hidden="true" />
      <div className="container nav-content">
        <Link
          to="/"
          className="logo"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Home
        </Link>

        <ul className="nav-links">
          {sectionLinks.map((section) => (
            <li key={section.path}>
              <Link to={section.path}>
                <AnimatedText text={t(section.key)} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="btn lang-toggle"
            style={{ padding: "5px 10px", marginRight: 8 }}
            aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
            title={lang === "zh" ? "English" : "中文"}
          >
            <AnimatedText text={lang === "zh" ? "EN" : "中"} />
          </button>
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
