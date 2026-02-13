import { Link, useLocation } from "react-router-dom";

function BackToTopButton() {
  const location = useLocation();
  // 定义按钮应该显示的路由路径数组
  // 在这些页面上按钮会显示（在首页不显示）
  const showOnPages = [
    "/info",
    "/summary",
    "/skills",
    "/education",
    "/experience",
    "/contact",
  ];
  const isVisible = showOnPages.includes(location.pathname);  // 判断按钮是否应该显示：检查当前路径是否在显示数组中

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      to="/"
      className={`back-to-top${isVisible ? " is-visible" : ""}`}
      onClick={handleClick}
      aria-label="Back to home"
    >
      <span className="back-to-top__icon" aria-hidden="true">
        ^
      </span>
      <span className="back-to-top__text">Home</span>
    </Link>
  );
}

export default BackToTopButton;
