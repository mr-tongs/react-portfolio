import avatar from "../头像.jpg";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import AnimatedText from "../components/AnimatedText";

function Home() {
  const { t } = useLanguage();
  return (
    <main>
      <section
        id="home"
        className="section section-hero reveal"
        data-section
        data-reveal
        style={{ textAlign: "center" }}
      >
        <div className="container">
          <img src={avatar} alt={t("homeAvatarAlt")} className="avatar" />
          <h1 className="hero-title">
            <AnimatedText text={t("homeGreeting")} />{" "}
            <span style={{ color: "var(--primary-color)" }}>
              <AnimatedText text={t("homeName")} />
            </span>
          </h1>
          <p className="hero-subtitle">
            <AnimatedText text={t("homeSubtitle")} />
          </p>
          <Link
            to="/contact"
            className="btn"
            style={{ marginTop: 24, display: "inline-block" }}
          >
            <AnimatedText text={t("homeCta")} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
