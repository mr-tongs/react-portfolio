import ProgressBar from "../components/ProgressBar";
import { useState, useEffect } from "react";

function Experience() {
  const projects = [
    {
      name: "knight tour",
      role: "回溯算法 DFS",
      detail: "使用easyx库实现可视化",
      level: 100,
    },
    {
      name: "个人主页搭建",
      role: "进行中",
      detail: "使用HTML/CSS/JavaScript/React搭建个人主页",
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
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);
  return (
    <main>
      <section className="section reveal" data-reveal>
        <div className="container">
          <h2 className="section-title">🚀 项目经验</h2>
          <br />
          <div
            className="skills-grid reveal-group"
            data-reveal
            style={{ marginTop: "30px" }}
          >
            {projects.map((project, i) => (
              <div key={project.name} className="skill-item">
                <div className="skill-info">
                  <span>{project.name}</span>
                  <span>{project.role}</span>
                </div>
                <ProgressBar percent={animated[i]} />
                <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                  {project.detail}
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
