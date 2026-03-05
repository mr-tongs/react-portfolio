import React from "react";
import ProgressBar from "./ProgressBar";

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
        <span>{title}</span>
        {rightText ? (
          <span>{rightText}</span>
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
          {subtitle}
        </p>
      ) : null}
      {description ? (
        <p style={{ marginTop: "8px", color: "var(--muted-text)" }}>
          {description}
        </p>
      ) : null}
    </article>
  );
}

export default ProgressCard;
