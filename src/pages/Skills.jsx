import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import AnimatedText from "../components/AnimatedText";
import ProgressCard from "../components/ProgressCard";
import { skillsData } from "../data/skillsData";

function Skills() {
  const { t } = useLanguage();
  const [animated, setAnimated] = useState(Array(skillsData.length).fill(0));
  useEffect(() => {
    const timers = skillsData.map((skill, i) =>
      setTimeout(
        () => {
          setAnimated((prev) => {
            const arr = [...prev];
            arr[i] = skill.level;
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
            ⚙️ <AnimatedText text={t("skillsTitle")} />
          </h2>
          <p style={{ textAlign: "center", color: "var(--muted-text)" }}>
            <AnimatedText text={t("skillsIntro")} />
          </p>
          <div
            className="skills-grid reveal-group"
            data-reveal
            style={{ marginTop: "30px" }}
          >
            {skillsData.map((skill, i) => (
              <ProgressCard
                key={skill.id}
                title={skill.name}
                percent={animated[i]}
                showPercent={false}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Skills;
