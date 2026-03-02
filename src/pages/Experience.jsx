import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import AnimatedText from "../components/AnimatedText";
import ProgressCard from "../components/ProgressCard";
import { projectsData } from "../data/projectsData";

function Experience() {
  const { t } = useLanguage();
  const [animated, setAnimated] = useState(Array(projectsData.length).fill(0));
  useEffect(() => {
    const timers = projectsData.map((item, i) =>
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
          <h2 className="section-title">
            🚀 <AnimatedText text={t("expTitle")} />
          </h2>
          <br />
          <div
            className="skills-grid reveal-group"
            data-reveal
            style={{ marginTop: "30px" }}
          >
            {projectsData.map((project, i) => (
              <ProgressCard
                key={project.id}
                title={t(project.nameKey)}
                subtitle={t(project.roleKey)}
                description={t(project.detailKey)}
                percent={animated[i]}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Experience;
