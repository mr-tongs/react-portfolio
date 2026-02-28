import { useLanguage } from "../contexts/LanguageContext";

function Hobby() {
  const { t } = useLanguage();
  return (
    <main>
      <section className="section reveal" data-reveal>
        <div className="container">
          <h2 className="section-title">❤️ {t("hobbyTitle")}</h2>
          <p style={{ textAlign: "center", color: "var(--muted-text)" }}>
            {t("hobbyIntro")}
          </p>
          <div
            className="skills-grid reveal-group"
            data-reveal
            style={{ marginTop: "30px" }}
          >
            <div className="skill-item">
              <div className="skill-info">
                <span>{t("hobbySports")}</span>
              </div>
              <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                {t("hobbySportsList")}
              </p>
            </div>
            <div className="skill-item">
              <div className="skill-info">
                <span>{t("hobbyMusic")}</span>
              </div>
              <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                Martin Garrix | Viceton | Vexento
              </p>
            </div>
            <div className="skill-item">
              <div className="skill-info">
                <span>{t("hobbyAnime")}</span>
              </div>
              <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                {t("hobbyAnimeList")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Hobby;
