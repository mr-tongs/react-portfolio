//处理语言切换动画

import { useEffect, useRef } from "react";

const LANG_SWITCH_ANIMATION_MIN_MS = 420;      // 最小动画时长 420ms
const I18N_CHAR_DELAY_MS = 20;                 // 每个字符的延迟增量 20ms
const I18N_CHAR_DURATION_MS = 360;              // 单个字符动画时长 360ms
const I18N_ANIMATION_BUFFER_MS = 80;            // 额外缓冲时间 80ms

export function useLanguageSwitchAnimation(lang) {
  // 存储上一次的语言
  const prevLangRef = useRef(lang);
  // 标记是否首次渲染
  const isFirstRenderRef = useRef(true);
  // 存储动画定时器，用于清理
  const animationTimeoutRef = useRef(null);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      prevLangRef.current = lang;
      return;// 直接返回，不触发动画
    }

    const body = document.body;
    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (!body || prefersReducedMotion) {
      prevLangRef.current = lang;
      return;
    }

    const directionClass =
      prevLangRef.current === "zh" && lang === "en"
        ? "lang-dir-up"
        : "lang-dir-down";

    body.classList.remove("lang-switching", "lang-dir-up", "lang-dir-down");
    void body.offsetWidth;
    body.classList.add("lang-switching", directionClass);
// 找出所有动画文本中字符数最多的元素
    const maxChars = Array.from(
      document.querySelectorAll(".i18n-animated-text"),
    ).reduce((maxCount, element) => {
      const charCount = element.querySelectorAll(".i18n-char").length;
      return Math.max(maxCount, charCount);
    }, 0);
// 计算所需动画时长
    const computedAnimationMs = Math.max(
      LANG_SWITCH_ANIMATION_MIN_MS,
      I18N_CHAR_DURATION_MS +
        Math.max(maxChars - 1, 0) * I18N_CHAR_DELAY_MS +
        I18N_ANIMATION_BUFFER_MS,
    );

    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = window.setTimeout(() => {
      body.classList.remove("lang-switching", "lang-dir-up", "lang-dir-down");
      animationTimeoutRef.current = null;
    }, computedAnimationMs);

    prevLangRef.current = lang;

    return () => {
      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
    };
  }, [lang]);
}
