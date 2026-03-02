import { Link } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import { useLanguage } from "../contexts/LanguageContext";
import AnimatedText from "./AnimatedText";
import LanguageToggleButton from "./LanguageToggleButton";

const sectionLinks = [
  { path: "/info", key: "navAbout" },
  { path: "/hobby", key: "navHobby" },
  { path: "/skills", key: "navSkills" },
  { path: "/education", key: "navEducation" },
  { path: "/experience", key: "navExperience" },
  { path: "/contact", key: "navContact" },
];

function Navbar() {
  const { t } = useLanguage();

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
          <LanguageToggleButton />
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
