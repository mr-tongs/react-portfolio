import { useLanguage } from "../contexts/LanguageContext";
import AnimatedText from "./AnimatedText";

/**
 * 语言切换按钮组件
 * 
 * 提供一个按钮，点击可在中文（zh）和英文（en）之间切换。
 * 按钮内显示的文本为当前语言的缩写（"中" 或 "EN"），并使用 AnimatedText 组件实现逐字动画。
 * 按钮的 aria-label 和 title 属性根据当前语言动态变化，提升无障碍和用户体验。
 * 
 * @component
 * @returns {JSX.Element} 语言切换按钮
 */
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
