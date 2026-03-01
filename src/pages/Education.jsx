import ProgressBar from "../components/ProgressBar";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import AnimatedText from "../components/AnimatedText";

function Education() {
  const { t } = useLanguage();
  const education = [
    {
      periodKey: "eduPeriod1",
      schoolKey: "eduSchool",
      majorKey: "eduMajor1",
      level: 20,
    },
    {
      periodKey: "eduPeriod2",
      schoolKey: "eduSchool",
      majorKey: "eduMajor2",
      level: 37.5,
    },
  ];
  const [animated, setAnimated] = useState(Array(education.length).fill(0));
  useEffect(() => {
    const timers = education.map((item, i) =>
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
            🎓 <AnimatedText text={t("educationTitle")} />
          </h2>
          <br />
          <div
            className="skills-grid reveal-group"
            data-reveal
            style={{ marginTop: "30px" }}
          >
            {education.map((item, i) => (
              <div key={item.periodKey} className="skill-item">
                <div className="skill-info">
                  <span>
                    <AnimatedText text={t(item.schoolKey)} />
                  </span>
                  <span>
                    <AnimatedText text={t(item.periodKey)} />
                  </span>
                </div>
                <ProgressBar percent={animated[i]} />
                <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                  <AnimatedText text={t(item.majorKey)} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Education;
