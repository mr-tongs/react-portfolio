import { useLanguage } from "../contexts/LanguageContext";
import AnimatedText from "../components/AnimatedText";

function Info() {
  const { t } = useLanguage();
  return (
    <main>
      <section className="section reveal" data-reveal>
        <div className="container">
          <h2 className="section-title">
            👨‍💻 <AnimatedText text={t("infoTitle")} />
          </h2>
          <p style={{ textAlign: "center", color: "var(--muted-text)" }}>
            <AnimatedText text={t("infoIntro")} />
          </p>
          <div
            className="skills-grid reveal-group"
            data-reveal
            style={{ marginTop: "30px" }}
          >
            <div className="skill-item">
              <div className="skill-info">
                <span>
                  🏙️
                  <AnimatedText text={t("infoCity")} />
                </span>
                <span>
                  <AnimatedText text={t("infoHefei")} />
                </span>
              </div>
              <div className="skill-info">
                <span>
                  🏙️
                  <AnimatedText text={t("infoFrom")} />
                </span>
                <span>
                  <AnimatedText text={t("infoSichuan")} />
                </span>
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-info">
                <span>
                  🔗
                  <AnimatedText text={t("infoHomepage")} />
                </span>
                <span>
                  <AnimatedText text={t("infoGitHub")} />
                </span>
              </div>
              <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                <a
                  href="https://github.com/mr-tongs"
                  target="_blank"
                  rel="noopener"
                >
                  mr-tongs
                </a>
              </p>
            </div>
            <div className="skill-item">
              <div className="skill-info">
                <span>
                  📧
                  <AnimatedText text={t("infoContact")} />
                </span>
                <span>
                  <AnimatedText text={t("infoEmail")} />
                </span>
              </div>
              <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                <a href="mailto:tangz@mail.ustc.edu.cn">
                  tangz@mail.ustc.edu.cn
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Info;
