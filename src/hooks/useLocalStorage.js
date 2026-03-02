import { useEffect, useState } from "react";
// 导入 React 的 useEffect 和 useState 钩子，用于管理副作用和状态

export function useLocalStorage(key, defaultValue) {
  // 定义一个自定义钩子，接收两个参数：
  // key: 要存储在 localStorage 中的键名
  // defaultValue: 当 localStorage 中没有对应键时的默认值

  const [value, setValue] = useState(() => {
    // 使用 useState 的惰性初始化函数，该函数只在组件首次渲染时执行一次
    // 这样可以避免在每次渲染时都执行 localStorage 读取操作，提升性能

    if (typeof window === "undefined") return defaultValue;
    // 检查是否在浏览器环境（避免在服务端渲染时访问 window 对象）
    // 如果 window 未定义（例如在 Node.js 或 SSR 中），直接返回 defaultValue

    try {
      const storedValue = window.localStorage.getItem(key);
      // 从 localStorage 中获取指定 key 的存储值（字符串形式）

      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
      // 如果获取到值（不为 null），则尝试用 JSON.parse 解析为 JavaScript 对象/值
      // 如果未获取到（null），则返回传入的 defaultValue
    } catch {
      return defaultValue;
      // 如果发生任何错误（如 JSON 解析失败、localStorage 访问被拒绝等），
      // 则安全地返回 defaultValue，避免应用崩溃
    }
  });

  useEffect(() => {
    // 使用 useEffect 监听 value 或 key 的变化，并在变化时将最新 value 同步到 localStorage
    // 这实现了状态持久化：每当 value 改变，都会自动保存

    if (typeof window === "undefined") return;
    // 同样检查是否在浏览器环境，避免 SSR 时执行 localStorage 操作

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      // 将当前的 value 序列化为 JSON 字符串，并存储到 localStorage 的指定 key 下
    } catch {
      // 忽略写入 localStorage 的错误（例如隐私模式）
      // 在某些浏览器隐私模式下，setItem 可能抛出异常，这里静默失败以防止程序中断
    }
  }, [key, value]);
  // 依赖数组包含 key 和 value：
  // - 当 value 变化时，重新保存最新值
  // - 当 key 变化时，会将当前 value 保存到新的 key 下（覆盖旧 key 的数据）

  return [value, setValue];
  // 返回一个数组，包含当前值和一个更新值的函数，用法与 useState 完全一致
  // 这样外部组件可以像使用 useState 一样使用这个自定义钩子，同时获得持久化功能
}