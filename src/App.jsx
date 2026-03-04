import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Hobby from "./pages/Hobby";
import Skills from "./pages/Skills";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import AnimatedText from "./components/AnimatedText";

function RevealOnScroll() {
  const location = useLocation();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (elements.length === 0) return;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    elements.forEach((element) => {
      element.classList.remove("is-visible");
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname, location.hash]);

  return null;
}

function RouteLoadingOverlay() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 420);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname, location.hash]);

  return (
    <div
      className={`route-loader${isLoading ? " is-active" : ""}`}
      aria-hidden={!isLoading}
    >
      <div className="route-loader__panel">
        <span className="route-loader__spinner" aria-hidden="true" />
        <span className="route-loader__text">
          <AnimatedText text={t("appLoading")} />
        </span>
      </div>
    </div>
  );
}

function RouteProgressBar() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("is-nav-progress");
    const timeoutId = window.setTimeout(() => {
      document.body.classList.remove("is-nav-progress");
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
      document.body.classList.remove("is-nav-progress");
    };
  }, [location.pathname, location.hash]);

  return null;
}

function RouteTextAnimation() {
  const location = useLocation();
  const isFirstRenderRef = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const body = document.body;
    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (!body || prefersReducedMotion) return;

    body.classList.remove("page-switching");
    void body.offsetWidth;
    body.classList.add("page-switching");

    const maxChars = Array.from(
      document.querySelectorAll(".i18n-animated-text"),
    ).reduce((maxCount, element) => {
      const charCount = element.querySelectorAll(".i18n-char").length;
      return Math.max(maxCount, charCount);
    }, 0);

    const durationMs = Math.max(420, 360 + Math.max(maxChars - 1, 0) * 20 + 80);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      body.classList.remove("page-switching");
      timeoutRef.current = null;
    }, durationMs);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      body.classList.remove("page-switching");
    };
  }, [location.pathname, location.hash]);

  return null;
}

function RouteCardDropAnimation() {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (!body || prefersReducedMotion) return;

    body.classList.remove("page-card-enter");
    void body.offsetWidth;
    body.classList.add("page-card-enter");

    const timeoutId = window.setTimeout(() => {
      body.classList.remove("page-card-enter");
    }, 1400);

    return () => {
      window.clearTimeout(timeoutId);
      body.classList.remove("page-card-enter");
    };
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  useEffect(() => {
    const root = document.documentElement;

    // 如果是触控设备或无法悬停的环境，则不添加鼠标监听（移动端隐藏效果）
    const cannotHover =
      window.matchMedia &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches);
    if (cannotHover) return;

    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      root.style.setProperty("--cursor-x", `${x}%`);
      root.style.setProperty("--cursor-y", `${y}%`);
    };

    const handleLeave = () => {
      root.style.setProperty("--cursor-x", "50%");
      root.style.setProperty("--cursor-y", "15%");
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <RouteProgressBar />
        <RouteTextAnimation />
        <RouteCardDropAnimation />
        <RouteLoadingOverlay />
        <RevealOnScroll />
        <div className="scan-lines" aria-hidden="true">
          <span
            className="scan-line"
            style={{
              "--line-left": "24%",
              "--line-tilt": "10deg",
              "--line-spin": "150deg",
              "--line-sway": "26px",
              "--line-delay": "0s",
              "--line-duration": "10.8s",
              "--line-height": "92vh",
              "--line-color-a": "rgba(96, 165, 250, 0.86)",
              "--line-color-b": "rgba(34, 211, 238, 0.64)",
            }}
          />
          <span
            className="scan-line"
            style={{
              "--line-left": "34%",
              "--line-tilt": "6deg",
              "--line-spin": "126deg",
              "--line-sway": "18px",
              "--line-delay": "1.4s",
              "--line-duration": "11.6s",
              "--line-height": "84vh",
              "--line-color-a": "rgba(59, 130, 246, 0.78)",
              "--line-color-b": "rgba(96, 165, 250, 0.56)",
            }}
          />
          <span
            className="scan-line"
            style={{
              "--line-left": "44%",
              "--line-tilt": "2deg",
              "--line-spin": "108deg",
              "--line-sway": "12px",
              "--line-delay": "2.6s",
              "--line-duration": "12.2s",
              "--line-height": "88vh",
              "--line-color-a": "rgba(34, 211, 238, 0.72)",
              "--line-color-b": "rgba(16, 185, 129, 0.54)",
            }}
          />
          <span
            className="scan-line"
            style={{
              "--line-left": "56%",
              "--line-tilt": "-2deg",
              "--line-spin": "-108deg",
              "--line-sway": "-12px",
              "--line-delay": "3.7s",
              "--line-duration": "10.9s",
              "--line-height": "96vh",
              "--line-color-a": "rgba(16, 185, 129, 0.72)",
              "--line-color-b": "rgba(34, 211, 238, 0.52)",
            }}
          />
          <span
            className="scan-line"
            style={{
              "--line-left": "66%",
              "--line-tilt": "-6deg",
              "--line-spin": "-126deg",
              "--line-sway": "-18px",
              "--line-delay": "4.8s",
              "--line-duration": "11.8s",
              "--line-height": "90vh",
              "--line-color-a": "rgba(96, 165, 250, 0.74)",
              "--line-color-b": "rgba(59, 130, 246, 0.5)",
            }}
          />
          <span
            className="scan-line"
            style={{
              "--line-left": "76%",
              "--line-tilt": "-10deg",
              "--line-spin": "-150deg",
              "--line-sway": "-26px",
              "--line-delay": "6s",
              "--line-duration": "12.6s",
              "--line-height": "86vh",
              "--line-color-a": "rgba(59, 130, 246, 0.72)",
              "--line-color-b": "rgba(96, 165, 250, 0.48)",
            }}
          />
        </div>
        <Navbar />
        <div className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/hobby" element={<Hobby />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
        <BackToTopButton />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
