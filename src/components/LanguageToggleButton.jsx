import { useLanguage } from "../contexts/LanguageContext";
import AnimatedText from "./AnimatedText";

function LanguageToggleButton() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "zh" ? "en" : "zh")}
      className="btn lang-toggle"
      style={{ padding: "5px 10px", marginRight: 8 }}
      aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
      title={lang === "zh" ? "English" : "中文"}
    >
      <AnimatedText text={lang === "zh" ? "EN" : "中"} />
    </button>
  );
}

export default LanguageToggleButton;
