function Summary() {
  return (
    <main>
      <section className="section reveal" data-reveal>
        <div className="container">
          <h2 className="section-title">❤️个人爱好</h2>
          <p style={{ textAlign: "center", color: "var(--muted-text)" }}>
            ✨热爱运动，编程菜鸡，偶尔打游戏消遣，也喜欢音乐和动漫。
          </p>
          <div
            className="skills-grid reveal-group"
            data-reveal
            style={{ marginTop: "30px" }}
          >
            <div className="skill-item">
              <div className="skill-info">
                <span>🏃运动</span>
              </div>
              <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                🏓乒乓球 | 🏃‍♂️跑步 | 🎱台球 | 🥏飞盘
              </p>
            </div>
            <div className="skill-item">
              <div className="skill-info">
                <span>🎵音乐</span>
              </div>
              <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                Martin Garrix | Viceton | Vexento
              </p>
            </div>
            <div className="skill-item">
              <div className="skill-info">
                <span>💮动漫</span>
              </div>
              <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
                Fate | 碧蓝之海 | 孤独摇滚
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Summary;
