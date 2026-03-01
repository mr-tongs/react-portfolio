import { Fragment } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function AnimatedText({ text, className = "", as: Tag = "span" }) {
  const { lang } = useLanguage();
  const chars = Array.from(text ?? "");

  return (
    <Tag className={`i18n-animated-text ${className}`.trim()} aria-label={text}>
      {chars.map((char, index) => (
        <Fragment key={`${lang}-${index}-${char}`}>
          <span
            className="i18n-char"
            style={{ "--i18n-char-delay": `${index * 0.02}s` }}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}

export default AnimatedText;
