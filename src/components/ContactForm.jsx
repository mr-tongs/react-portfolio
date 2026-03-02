import AnimatedText from "./AnimatedText";
import { useLanguage } from "../contexts/LanguageContext";

function ContactForm({ onSubmit }) {
  const { t } = useLanguage();
  return (
    <form
      className="contact-form"
      style={{ maxWidth: 420, margin: "0 auto", textAlign: "left" }}
      onSubmit={onSubmit}
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
  );
}

export default ContactForm;
