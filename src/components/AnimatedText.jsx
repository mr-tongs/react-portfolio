import { Fragment } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const segmentText = (value) => {
  const source = value ?? "";
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });
    return Array.from(segmenter.segment(source), (item) => item.segment);
  }
  return Array.from(source);
};

function AnimatedText({ text, className = "", as: Tag = "span" }) {
  const { lang } = useLanguage();
  const chars = segmentText(text);

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
