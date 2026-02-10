import avatar from "../头像.jpg";

function Home() {
  return (
    <main>
      <section
        id="home"
        className="section section-hero reveal"
        data-section
        data-reveal
        style={{ textAlign: "center" }}
      >
        <div className="container">
          <img src={avatar} alt="头像" className="avatar" />
          <h1
            className="hero-title"
            style={{ fontSize: "3rem", marginBottom: "20px" }}
          >
            你好，我是{" "}
            <span style={{ color: "var(--primary-color)" }}>唐卓</span>
          </h1>
          <p
            className="hero-subtitle"
            style={{ fontSize: "2rem", color: "var(--muted-text)" }}
          >
            欢迎来到我的主页！
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
