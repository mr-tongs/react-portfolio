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
  // 内部状态：当前显示的宽度百分比（用于触发过渡动画）
  const [width, setWidth] = useState(0);

  // 当 percent 发生变化时，延迟一小段时间后更新内部宽度状态，以触发 CSS 过渡动画
  useEffect(() => {
    // 使用 setTimeout 延迟更新，确保组件挂载后或每次 percent 变化后，
    // 宽度从旧值平滑过渡到新值，而不是立即跳变。
    setTimeout(() => setWidth(percent), 100);
  }, [percent]); // 依赖 percent，每次 percent 变化都会重新执行

  return (
    // 外层容器：固定背景色、圆角，宽度占满父容器
    <div
      style={{
        width: "100%",
        background: "#e5e7eb",          // 浅灰色背景，作为进度条轨道
        borderRadius: height,            // 圆角与高度一致，形成胶囊形状
        height,
      }}
    >
      {/* 内层进度指示条：宽度由内部状态 width 控制 */}
      <div
        style={{
          // 宽度：如果 width 是数字，则转换为百分比字符串；否则直接使用（如预定义的百分比字符串）
          width: typeof width === "number" ? `${width}%` : width,
          height: "100%",
          // 背景颜色：优先使用自定义 color，否则使用默认的蓝绿渐变
          background:
            color || "linear-gradient(90deg, #2563eb, #22c55e, #38bdf8)",
          borderRadius: height,           // 与容器圆角一致
          // 过渡效果：宽度变化时应用缓动动画，持续1秒，使用自定义贝塞尔曲线实现平滑的缓出效果
          transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
};

export default ProgressBar;