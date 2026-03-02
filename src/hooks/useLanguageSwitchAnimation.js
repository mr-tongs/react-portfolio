import { useEffect, useRef } from "react";

const LANG_SWITCH_ANIMATION_MIN_MS = 420;
const I18N_CHAR_DELAY_MS = 20;
const I18N_CHAR_DURATION_MS = 360;
const I18N_ANIMATION_BUFFER_MS = 80;

export function useLanguageSwitchAnimation(lang) {
  const prevLangRef = useRef(lang);
  const isFirstRenderRef = useRef(true);
  const animationTimeoutRef = useRef(null);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      prevLangRef.current = lang;
      return;
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

    const maxChars = Array.from(
      document.querySelectorAll(".i18n-animated-text"),
    ).reduce((maxCount, element) => {
      const charCount = element.querySelectorAll(".i18n-char").length;
      return Math.max(maxCount, charCount);
    }, 0);

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
