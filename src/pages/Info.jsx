function Info() {
  return (
    <main>
      <section className="section reveal" data-reveal>
        <div className="container">
          <h2 className="section-title">👨‍💻关于我</h2>
          <p style={{ textAlign: "center", color: "var(--muted-text)" }}>
            ✨iGEM - Web
            组成员(暂且)，一名普通大学生，对网页制作、算法设计、硬件开发等感兴趣。
          </p>
          <div
            className="skills-grid reveal-group"
            data-reveal
            style={{ marginTop: "30px" }}
          >
            <div className="skill-item">
              <div className="skill-info">
                <span>🏙️常驻城市</span>
                <span>合肥</span>
              </div>
              <div className="skill-info">
                <span>🏙️来自</span>
                <span>四川</span>
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-info">
                <span>🔗主页</span>
                <span>⚡GitHub</span>
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
                <span>📧联系方式</span>
                <span>✉邮箱</span>
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
