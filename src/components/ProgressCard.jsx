import React from "react";
import ProgressBar from "./ProgressBar";
import AnimatedText from "./AnimatedText";

const renderAnimatedIfText = (value) => {
  if (typeof value === "string" || typeof value === "number") {
    return <AnimatedText text={String(value)} />;
  }

  return value;
};

function ProgressCard({
  title,
  subtitle,
  description,
  percent = 0,
  showPercent = true,
  rightText,
}) {
  return (
    <article className="skill-item">
      <div className="skill-info">
        <span>{renderAnimatedIfText(title)}</span>
        {rightText ? (
          <span>{renderAnimatedIfText(rightText)}</span>
        ) : showPercent ? (
          <span>{Math.round(percent)}%</span>
        ) : null}
      </div>
      <ProgressBar percent={percent} />
      {subtitle ? (
        <p
          style={{
            marginTop: "10px",
            color: "var(--muted-text)",
            fontWeight: 600,
          }}
        >
          {renderAnimatedIfText(subtitle)}
        </p>
      ) : null}
      {description ? (
        <p style={{ marginTop: "8px", color: "var(--muted-text)" }}>
          {renderAnimatedIfText(description)}
        </p>
      ) : null}
    </article>
  );
}

export default ProgressCard;
