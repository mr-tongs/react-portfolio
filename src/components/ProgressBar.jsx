import React, { useEffect, useState } from "react";
import "../index.css";
/**
 * 进度条组件
 * 
 * 渲染一个带有平滑过渡动画的进度条，支持自定义高度、颜色和进度值。
 * 当 percent 属性变化时，进度条宽度会以动画形式过渡到新值。
 * 
 * @component
 * @param {Object} props - 组件属性
 * @param {number} [props.percent=0] - 进度百分比（0-100）
 * @param {number} [props.height=10] - 进度条高度（像素）
 * @param {string} [props.color] - 自定义进度条颜色，若不提供则使用默认渐变
 * @returns {JSX.Element} 进度条元素
 */
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
