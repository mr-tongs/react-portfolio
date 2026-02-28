import { useEffect, useState } from "react";
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
        <span className="route-loader__text">{t("appLoading")}</span>
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
        <RouteLoadingOverlay />
        <RevealOnScroll />
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
