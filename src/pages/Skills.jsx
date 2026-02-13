import ProgressBar from "../components/ProgressBar";
import { useState, useEffect } from "react";

function Skills() {
  const skills = [
    { name: "🏷️HTML/CSS", level: 70 },
    { name: "JavaScript", level: 50 },
    { name: "⚛️React", level: 30 },
    { name: "C/C++", level: 90 },
    { name: "🐍Python", level: 60 },
    { name: "🔌Keil5", level: 50 },
  ];
  const [animated, setAnimated] = useState(Array(skills.length).fill(0));
  useEffect(() => {
    const timers = skills.map((skill, i) =>
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
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);
  return (
    <main>
      <section className="section reveal" data-reveal>
        <div className="container">
          <h2 className="section-title">⚙️技能</h2>
          <p style={{ textAlign: "center", color: "var(--muted-text)" }}>
            ✨多种编程语言的核心开发技能，运用各类开发软件与工具，并具备嵌入式开发的经验。
          </p>
          <div
            className="skills-grid reveal-group"
            data-reveal
            style={{ marginTop: "30px" }}
          >
            {skills.map((skill, i) => (
              <div key={skill.name} className="skill-item">
                <div className="skill-info">
                  <span>{skill.name}</span>
                </div>
                <ProgressBar percent={animated[i]} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Skills;
