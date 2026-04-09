document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");

  // ===== NAV HEIGHT OFFSET (stops content cutting) =====
  function setNavOffset(){
    if(!nav) return;
    document.documentElement.style.setProperty("--nav-h", nav.offsetHeight + "px");
  }

  // run once + update on resize
  setNavOffset();
  window.addEventListener("resize", setNavOffset);

  // ===== NAV SHRINK =====
  function onScroll(){
    if(!nav) return;
    nav.classList.toggle("shrink", window.scrollY > 50);
    setNavOffset(); // update because height changes when shrink toggles
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ===== CASE STUDY SIDEBAR ACTIVE LINK (Digital Health) =====
  const sections = document.querySelectorAll(".case-content section[id]");
  const navLinks = document.querySelectorAll(".case-nav a");

  if(sections.length && navLinks.length){
    const setActive = (id) => {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) setActive(entry.target.id);
      });
    }, {
      root: null,
      threshold: 0.35
    });

    sections.forEach(section => observer.observe(section));
  }
});
// ScrollSpy for Photography page
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".photography_Project .case-section");
  const navLinks = document.querySelectorAll(".photography_Project .case-nav a");

  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  };

  const observer = new IntersectionObserver((entries) => {
    // pick the entry closest to top that is intersecting
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActive(visible.target.id);
  }, {
    root: null,
    threshold: 0.35,
    rootMargin: "-20% 0px -60% 0px"
  });

  sections.forEach(sec => observer.observe(sec));

  // default active on load
  setActive(sections[0].id);
});

const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}