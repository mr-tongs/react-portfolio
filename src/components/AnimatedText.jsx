//实现文字动画效果的组件

// 从 React 导入 Fragment 组件，用于包裹子元素列表而不额外添加 DOM 节点
import { Fragment } from "react";

// 导入自定义的语言上下文钩子，用于获取当前语言设置
import { useLanguage } from "../contexts/LanguageContext";

/**
 * 将文本分割成独立的字符（字形簇，grapheme），支持国际化语言（如 emoji、组合字符等）。
 * 使用 Intl.Segmenter API（如果可用）进行正确分割，否则回退到简单的字符数组分割。
 *
 * @param {string} value - 要分割的原始文本
 * @returns {string[]} 分割后的字符数组
 */
const segmentText = (value) => {
  // 处理 null 或 undefined，确保 source 至少是空字符串
  const source = value ?? ""; //?? 是 ES2020 引入的空值合并运算符

  // 检查 Intl.Segmenter 是否存在（浏览器支持）
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    // 创建 Segmenter 实例，使用默认语言环境，粒度设置为“字形簇”（即用户可见的单个字符）
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });

    // 使用 segment() 方法分割文本，然后通过 Array.from 和映射提取每个片段的实际字符
    return Array.from(segmenter.segment(source), (item) => item.segment);
  }

  // 降级方案：如果浏览器不支持 Intl.Segmenter，则简单地将字符串转换为字符数组
  // 注意：这种方式对于组合字符（如 é 可能由 e + ́ 组成）或 emoji 可能无法正确分割
  return Array.from(source);
};

/**
 * 一个逐字符动画组件，将文本拆分为单个字符，并为每个字符添加动画延迟样式。
 * 支持国际化语言，使用当前语言设置来重新触发动画（通过 key 中包含语言信息）。
 *
 * @param {Object} props - 组件属性
 * @param {string} props.text - 要动画显示的文本
 * @param {string} [props.className=""] - 额外的 CSS 类名
 * @param {string|React.Component} [props.as="span"] - 渲染为的 HTML 标签或自定义组件
 */
function AnimatedText({ text, className = "", as: Tag = "span" }) {
  // 从语言上下文中获取当前语言代码，用于在语言变化时强制重新渲染组件
  const { lang } = useLanguage();

  // 将文本分割成字符数组，使用 segmentText 函数保证国际化字符正确分割
  const chars = segmentText(text);

  return (
    // 使用指定的标签（默认为 span）包裹整个动画文本，并添加 ARIA 标签以便无障碍阅读
    <Tag className={`i18n-animated-text ${className}`.trim()} aria-label={text}>
      {chars.map((char, index) => (
        // 使用 Fragment 包裹每个字符的 span，key 包含语言和字符信息，确保语言变化时重新创建字符元素
        <Fragment key={`${lang}-${index}-${char}`}>
          <span
            className="i18n-char"
            // 通过 CSS 自定义属性设置每个字符的动画延迟，延迟时间随索引递增
            style={{ "--i18n-char-delay": `${index * 0.02}s` }}
            // aria-hidden="true" 使辅助技术忽略单个字符，避免逐个朗读，整个文本的 aria-label 已提供
            aria-hidden="true"
          >
            {/* 如果字符是空格，使用不间断空格（\u00A0）以防止在布局中被折叠 */}
            {char === " " ? "\u00A0" : char}
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}

// 导出 AnimatedText 组件供其他模块使用
export default AnimatedText;