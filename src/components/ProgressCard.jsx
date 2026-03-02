import ProgressBar from "./ProgressBar";
import AnimatedText from "./AnimatedText";

/**
 * 技能进度卡片组件
 * 
 * 用于展示一个技能项，包含标题、副标题（可选）、进度条以及描述（可选）。
 * 标题、副标题和描述文本均会以动画效果呈现（通过 AnimatedText 组件实现）。
 * 
 * @component
 * @param {Object} props - 组件属性
 * @param {string} props.title - 技能主标题（必填）
 * @param {string} [props.subtitle] - 技能副标题，显示在标题右侧（可选）
 * @param {string} [props.description] - 技能详细描述，显示在进度条下方（可选）
 * @param {number} props.percent - 技能掌握百分比，取值范围 0-100（必填）
 * @returns {JSX.Element} 渲染的技能卡片
 */
function ProgressCard({ title, subtitle, description, percent }) {
  return (
    <div className="skill-item">
      {/* 标题区域：左侧主标题，右侧副标题（如果存在） */}
      <div className="skill-info">
        <span>
          <AnimatedText text={title} />
        </span>
        {subtitle ? (
          <span>
            <AnimatedText text={subtitle} />
          </span>
        ) : null}
      </div>

      {/* 进度条组件，显示技能掌握程度 */}
      <ProgressBar percent={percent} />

      {/* 可选描述，带有淡入动画效果 */}
      {description ? (
        <p style={{ marginTop: "10px", color: "var(--muted-text)" }}>
          <AnimatedText text={description} />
        </p>
      ) : null}
    </div>
  );
}

export default ProgressCard;