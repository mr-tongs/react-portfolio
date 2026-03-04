//管理语言状态

import { useCallback, useEffect, useState } from "react";
// 导入 React 必要的钩子：useState 用于状态管理，useEffect 处理副作用，useCallback 缓存函数

// 定义存储在 localStorage 中的键名常量，用于持久化语言偏好
const STORAGE_KEY = "portfolio-lang";

/**
 * 标准化语言值，确保只返回 'en' 或 'zh' 两种有效值
 * @param {string} value - 输入的语言值
 * @returns {'en'|'zh'} 标准化后的语言
 */
function normalizeLang(value) {
  // 如果传入的值是 "en"，返回 "en"；否则返回 "zh"（包括传入 null、undefined、其他字符串等）
  return value === "en" ? "en" : "zh";
}

/**
 * 自定义钩子：管理语言状态，并与 localStorage 同步
 * @param {string} defaultLang - 默认语言，可选，默认为 "zh"
 * @returns {{ lang: 'en'|'zh', setLang: (next: string) => void }} 
 *          包含当前语言和更新语言的方法
 */
export function useLanguageState(defaultLang = "zh") {
  // 使用 useState 创建语言状态，通过惰性初始化函数从 localStorage 读取初始值
  const [lang, setLangState] = useState(() => {
    try {
      // 尝试从 localStorage 中获取之前保存的语言
      const storedLang = localStorage.getItem(STORAGE_KEY);
      // 如果存在，则标准化后使用；否则使用传入的默认语言（也经过标准化）
      return normalizeLang(storedLang ?? defaultLang);
    } catch {
      // 如果读取过程中出错（例如浏览器隐私模式、localStorage 不可用等），
      // 安全地返回标准化后的默认语言
      return normalizeLang(defaultLang);
    }
  });

  // 使用 useEffect 监听语言变化，当 lang 改变时自动保存到 localStorage
  useEffect(() => {
    try {
      // 将当前语言保存到 localStorage
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      // 忽略写入 localStorage 的错误（例如隐私模式、存储空间已满等）
      // 使用空参数名 _ 表示该错误对象不需要使用
    }
  }, [lang]); // 依赖项为 lang，仅在 lang 变化时执行

  /**
   * 设置语言的函数，对外暴露的 setLang 会自动标准化传入值
   * 使用 useCallback 缓存，避免每次渲染都创建新函数
   */
  const setLang = useCallback((next) => {
    // 调用状态更新函数时，先对传入值进行标准化，确保状态始终为 'en' 或 'zh'
    setLangState(normalizeLang(next));
  }, []); // 空依赖数组，因为 setLangState 是稳定的，不会变化

  // 返回当前语言和设置语言的方法，供组件使用
  return { lang, setLang };
}