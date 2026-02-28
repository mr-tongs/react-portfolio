import avatar from "../头像.jpg";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

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
            {t("homeGreeting")} <span style={{ color: "var(--primary-color)" }}>{t("homeName")}</span>
          </h1>
          <p className="hero-subtitle">{t("homeSubtitle")}</p>
          <Link
            to="/contact"
            className="btn"
            style={{ marginTop: 24, display: "inline-block" }}
          >
            {t("homeCta")}
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
