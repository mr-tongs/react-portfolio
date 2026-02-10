import { Link, useLocation } from "react-router-dom";

function BackToTopButton() {
  const location = useLocation();
  const showOnPages = [
    "/info",
    "/summary",
    "/skills",
    "/education",
    "/experience",
  ];
  const isVisible = showOnPages.includes(location.pathname);

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
