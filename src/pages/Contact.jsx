import { useLanguage } from "../contexts/LanguageContext";
import AnimatedText from "../components/AnimatedText";
import ContactForm from "../components/ContactForm";

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
          <ContactForm onSubmit={handleSubmit} />
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
