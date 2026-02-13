import React from "react";

function Contact() {
  // 表单提交时拼接mailto链接
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    const mailto = `mailto:tangz@mail.ustc.edu.cn?subject=来自${encodeURIComponent(name)}的留言&body=姓名：${encodeURIComponent(name)}%0A邮箱：${encodeURIComponent(email)}%0A留言内容：%0A${encodeURIComponent(message)}`;
    window.location.href = mailto;
  };
  return (
    <main>
      <section className="section reveal" data-reveal id="contact">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">📬 联系我</h2>
          <p style={{ color: "var(--muted-text)", marginBottom: 24 }}>
            欢迎通过以下方式与我取得联系：
          </p>
          <form
            className="contact-form"
            style={{ maxWidth: 420, margin: "0 auto", textAlign: "left" }}
            onSubmit={handleSubmit}
          >
            <div style={{ marginBottom: 18 }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
              >
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="请输入您的姓名或昵称"
                required
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "1px solid #e5e7eb",
                }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label
                htmlFor="email"
                style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
              >
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="请输入您的邮箱"
                required
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "1px solid #e5e7eb",
                }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label
                htmlFor="message"
                style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
              >
                留言
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="请输入您的留言内容"
                required
                rows={4}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "1px solid #e5e7eb",
                  resize: "vertical",
                }}
              />
            </div>
            <button
              type="submit"
              className="btn"
              style={{ width: "100%", fontSize: 18 }}
            >
              提交
            </button>
          </form>
          <div style={{ marginTop: 32, color: "var(--muted-text)" }}>
            或在{" "}
            <a
              href="https://github.com/mr-tongs"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            上联系我。
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
