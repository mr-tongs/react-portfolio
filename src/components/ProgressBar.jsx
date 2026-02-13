import React, { useEffect, useState } from "react";
import "../index.css";

const ProgressBar = ({ percent = 0, height = 10, color }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setTimeout(() => setWidth(percent), 100);
  }, [percent]);
  return (
    <div
      style={{
        width: "100%",
        background: "#e5e7eb",
        borderRadius: height,
        height,
      }}
    >
      <div
        style={{
          width: typeof width === "number" ? `${width}%` : width,
          height: "100%",
          background:
            color || "linear-gradient(90deg, #2563eb, #22c55e, #38bdf8)",
          borderRadius: height,
          transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
};

export default ProgressBar;
