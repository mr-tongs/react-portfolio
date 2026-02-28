import { createContext, useContext, useState, useCallback, useEffect } from "react";

const translations = {
  zh: {
    navAbout: "关于",
    navHobby: "爱好",
    navSkills: "技能",
    navEducation: "教育",
    navExperience: "项目",
    navContact: "联系",
    homeGreeting: "你好，我是",
    homeName: "唐卓",
    homeSubtitle: "欢迎来到我的主页！",
    homeCta: "联系我",
    homeAvatarAlt: "头像",
    appLoading: "加载中...",
    // Info
    infoTitle: "关于我",
    infoIntro:
      "✨iGEM - Web 组成员(暂且)，一名普通大学生，对网页制作、算法设计、硬件开发等感兴趣。",
    infoCity: "常驻城市",
    infoFrom: "来自",
    infoHomepage: "主页",
    infoGitHub: "⚡GitHub",
    infoContact: "联系方式",
    infoEmail: "✉邮箱",
    infoHefei: "合肥",
    infoSichuan: "四川",
    // Hobby
    hobbyTitle: "个人爱好",
    hobbyIntro:
      "✨热爱运动，编程菜鸡，偶尔打游戏消遣，也喜欢音乐和动漫。",
    hobbySports: "🏃运动",
    hobbySportsList: "🏓乒乓球 | 🏃‍♂️跑步 | 🎱台球 | 🥏飞盘",
    hobbyMusic: "🎵音乐",
    hobbyAnime: "💮动漫",
    hobbyAnimeList: "Fate | 碧蓝之海 | 孤独摇滚",
    // Skills
    skillsTitle: "技能",
    skillsIntro:
      "✨多种编程语言的核心开发技能，运用各类开发软件与工具，并具备嵌入式开发的经验。",
    // Education
    educationTitle: "教育经历",
    eduSchool: "中国科学技术大学",
    eduPeriod1: "2024 - 2025",
    eduPeriod2: "2025 - 至今",
    eduMajor1: "化学与材料科学",
    eduMajor2: "网络空间安全",
    eduToPresent: "至今",
    // Experience
    expTitle: "项目经验",
    expProj1Name: "knight tour",
    expProj1Role: "回溯算法 DFS",
    expProj1Detail: "使用easyx库实现可视化",
    expProj2Name: "个人主页搭建",
    expProj2Role: "进行中",
    expProj2Detail: "使用HTML/CSS/JavaScript/React搭建个人主页",
    // Contact
    contactTitle: "联系我",
    contactSubtitle: "欢迎通过以下方式与我取得联系：",
    contactName: "姓名",
    contactEmail: "邮箱",
    contactMessage: "留言",
    contactNamePlaceholder: "请输入您的姓名或昵称",
    contactEmailPlaceholder: "请输入您的邮箱",
    contactMessagePlaceholder: "请输入您的留言内容",
    contactSubmit: "提交",
    contactOrPrefix: "或在",
    contactOrSuffix: "上联系我。",
    contactMailtoSubject: "来自%s的留言",
    contactMailtoName: "姓名",
    contactMailtoEmail: "邮箱",
    contactMailtoContent: "留言内容",
  },
  en: {
    navAbout: "About",
    navHobby: "Hobby",
    navSkills: "Skills",
    navEducation: "Education",
    navExperience: "Projects",
    navContact: "Contact",
    homeGreeting: "Hi, I'm",
    homeName: "Tang Zhuo",
    homeSubtitle: "Welcome to my portfolio.",
    homeCta: "Get in Touch",
    homeAvatarAlt: "Avatar",
    appLoading: "Loading...",
    // Info
    infoTitle: "About Me",
    infoIntro:
      "✨iGEM - Web team member (for now), a university student interested in web development, algorithms, and hardware.",
    infoCity: "Based in",
    infoFrom: "From",
    infoHomepage: "Homepage",
    infoGitHub: "⚡GitHub",
    infoContact: "Contact",
    infoEmail: "✉ Email",
    infoHefei: "Hefei",
    infoSichuan: "Sichuan",
    // Hobby
    hobbyTitle: "Hobbies",
    hobbyIntro:
      "✨Love sports, coding enthusiast, occasional gamer, into music and anime.",
    hobbySports: "🏃 Sports",
    hobbySportsList: "🏓 Table tennis | 🏃‍♂️ Running | 🎱 Pool | 🥏 Frisbee",
    hobbyMusic: "🎵 Music",
    hobbyAnime: "💮 Anime",
    hobbyAnimeList: "Fate | Grand Blue | Bocchi the Rock",
    // Skills
    skillsTitle: "Skills",
    skillsIntro:
      "✨Core development skills in multiple languages, various tools, and embedded development experience.",
    // Education
    educationTitle: "Education",
    eduSchool: "University of Science and Technology of China",
    eduPeriod1: "2024 - 2025",
    eduPeriod2: "2025 - Present",
    eduMajor1: "Chemistry and Materials Science",
    eduMajor2: "Cybersecurity",
    eduToPresent: "Present",
    // Experience
    expTitle: "Projects",
    expProj1Name: "knight tour",
    expProj1Role: "Backtracking & DFS",
    expProj1Detail: "Visualization with EasyX library",
    expProj2Name: "Personal Portfolio",
    expProj2Role: "In Progress",
    expProj2Detail: "Built with HTML/CSS/JavaScript/React",
    // Contact
    contactTitle: "Get in Touch",
    contactSubtitle: "Feel free to reach out:",
    contactName: "Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactNamePlaceholder: "Your name or nickname",
    contactEmailPlaceholder: "Your email address",
    contactMessagePlaceholder: "Your message",
    contactSubmit: "Send",
    contactOrPrefix: "Or contact me on",
    contactOrSuffix: ".",
    contactMailtoSubject: "Message from %s",
    contactMailtoName: "Name",
    contactMailtoEmail: "Email",
    contactMailtoContent: "Message",
  },
};

// 定义用于本地存储的键名常量，用于保存用户的语言偏好
const STORAGE_KEY = "portfolio-lang";

// 创建一个 React 上下文对象，初始值为 null，后续由 Provider 提供具体值
const LanguageContext = createContext(null);

/**
 * LanguageProvider 组件：作为上下文提供者，管理语言状态并提供翻译功能。
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件，将能够访问语言上下文
 */
export function LanguageProvider({ children }) {
  // 使用 useState 定义语言状态 lang，初始值通过函数计算得到
  const [lang, setLangState] = useState(() => {
    // 尝试从 localStorage 读取之前保存的语言
    try {
      // 如果 localStorage 中有值则使用，否则默认返回 "zh"
      return localStorage.getItem(STORAGE_KEY) || "zh";
    } catch {
      // 如果读取失败（例如在浏览器隐私模式下可能抛出异常），则返回默认语言 "zh"
      return "zh";
    }
  });

  // 使用 useEffect 监听语言变化，当 lang 改变时将其保存到 localStorage
  useEffect(() => {
    try {
      // 将当前语言保存到 localStorage
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      // 如果保存失败（例如隐私模式），静默忽略错误
    }
  }, [lang]); // 依赖项为 lang，仅当 lang 变化时重新执行

  /**
   * 设置语言的函数，使用 useCallback 缓存以避免不必要的重新渲染。
   * @param {string} next - 期望设置的语言，只允许 "en" 或 "zh"
   */
  const setLang = useCallback((next) => {
    // 调用 setLangState 更新语言，根据 next 是否为 "en" 决定新值，否则强制为 "zh"
    setLangState((prev) => (next === "en" ? "en" : "zh"));
  }, []); // 空依赖数组，因为函数不依赖外部变量

  /**
   * 翻译函数，根据当前语言从 translations 对象中获取对应文本。
   * @param {string} key - 翻译键名
   * @returns {string} 翻译后的文本，若找不到则返回 key 本身
   */
  const t = useCallback(
    (key) => {
      // 尝试从 translations[lang] 对象中获取 key 对应的值
      // 如果不存在（null 或 undefined），则使用 ?? 返回 key 作为降级显示
      return translations[lang]?.[key] ?? key;
    },
    [lang] // 依赖项为 lang，当语言变化时重新创建该函数
  );

  // 返回 JSX：使用 LanguageContext.Provider 向子组件提供上下文值
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children} {/* 渲染所有子组件 */}
    </LanguageContext.Provider>
  );
}

/**
 * 自定义 Hook，用于在函数组件中方便地访问语言上下文。
 * @returns {Object} 包含 lang、setLang、t 的对象
 * @throws {Error} 如果在 LanguageProvider 外部使用，则抛出错误
 */
export function useLanguage() {
  // 使用 useContext 获取当前上下文值
  const ctx = useContext(LanguageContext);
  // 如果上下文不存在（即未在 Provider 内使用），则抛出错误
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  // 返回上下文对象，包含 lang, setLang, t
  return ctx;
}