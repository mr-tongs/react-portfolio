function Education() {
  const education = [
    {
      period: "2024 - 2025",
      school: "中国科学技术大学",
      major: "化学与材料科学",
      level: "20%",
    },
    {
      period: "2025 - 至今",
      school: "中国科学技术大学",
      major: "网络空间安全",
      level: "37.5%",
    },
  ];

  return (
    <main>
      <section className="section reveal" data-reveal>
        <div className="container">
          <h2 className="section-title">🎓教育经历</h2>
          <br />
          <div
            className="skills-grid reveal-group"
            data-reveal
            style={{ marginTop: "30px" }}
          >
            {education.map((item) => (
              <div key={item.period} className="skill-item">
                <div className="skill-info">
                  <span>{item.school}</span>
                  <span>{item.period}</span>
                </div>
                <div className="progress-bg">
                  <div
                    className="progress-bar"
                    style={{ width: item.level }}
                  ></div>
                </div>
                <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                  {item.major}
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
