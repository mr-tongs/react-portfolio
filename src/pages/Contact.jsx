import { useLanguage } from "../contexts/LanguageContext";
import AnimatedText from "../components/AnimatedText";

function Contact() {
  const { t, lang } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    const subject =
      lang === "zh"
        ? `来自${name}的留言`
        : t("contactMailtoSubject").replace("%s", name);
    const bodyStr = `${t("contactMailtoName")}: ${name}\n${t("contactMailtoEmail")}: ${email}\n${t("contactMailtoContent")}:\n${message}`;
    const mailto = `mailto:tangz@mail.ustc.edu.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyStr)}`;
    window.location.href = mailto;
  };

  return (
    <main>
      <section className="section reveal" data-reveal id="contact">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">
            📬 <AnimatedText text={t("contactTitle")} />
          </h2>
          <p style={{ color: "var(--muted-text)", marginBottom: 24 }}>
            <AnimatedText text={t("contactSubtitle")} />
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
                <AnimatedText text={t("contactName")} />
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t("contactNamePlaceholder")}
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
                <AnimatedText text={t("contactEmail")} />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t("contactEmailPlaceholder")}
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
                <AnimatedText text={t("contactMessage")} />
              </label>
              <textarea
                id="message"
                name="message"
                placeholder={t("contactMessagePlaceholder")}
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
              <AnimatedText text={t("contactSubmit")} />
            </button>
          </form>
          <div style={{ marginTop: 32, color: "var(--muted-text)" }}>
            <AnimatedText text={t("contactOrPrefix")} />{" "}
            <a
              href="https://github.com/mr-tongs"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            <AnimatedText text={t("contactOrSuffix")} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
