import ProgressBar from "../components/ProgressBar";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function Experience() {
  const { t } = useLanguage();
  const projects = [
    {
      nameKey: "expProj1Name",
      roleKey: "expProj1Role",
      detailKey: "expProj1Detail",
      level: 100,
    },
    {
      nameKey: "expProj2Name",
      roleKey: "expProj2Role",
      detailKey: "expProj2Detail",
      level: 50,
    },
  ];
  const [animated, setAnimated] = useState(Array(projects.length).fill(0));
  useEffect(() => {
    const timers = projects.map((item, i) =>
      setTimeout(
        () => {
          setAnimated((prev) => {
            const arr = [...prev];
            arr[i] = item.level;
            return arr;
          });
        },
        200 + i * 200,
      ),
    );
    return () => timers.forEach((id) => clearTimeout(id));
  }, []);
  return (
    <main>
      <section className="section reveal" data-reveal>
        <div className="container">
          <h2 className="section-title">🚀 {t("expTitle")}</h2>
          <br />
          <div
            className="skills-grid reveal-group"
            data-reveal
            style={{ marginTop: "30px" }}
          >
            {projects.map((project, i) => (
              <div key={project.nameKey} className="skill-item">
                <div className="skill-info">
                  <span>{t(project.nameKey)}</span>
                  <span>{t(project.roleKey)}</span>
                </div>
                <ProgressBar percent={animated[i]} />
                <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                  {t(project.detailKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Experience;
