(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cancelEvents = ["wheel", "touchstart", "keydown", "mousedown"];
  let activeFrame = null;
  let teardownCancelHandlers = null;

  function stopActiveScroll() {
    if (activeFrame !== null) {
      window.cancelAnimationFrame(activeFrame);
      activeFrame = null;
    }

    if (typeof teardownCancelHandlers === "function") {
      teardownCancelHandlers();
      teardownCancelHandlers = null;
    }
  }

  function easeInOutCubic(progress) {
    return progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  }

  function getHeaderOffset() {
    const header = document.querySelector("header");
    const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0;
    return headerHeight + 18;
  }

  function getTargetTop(target) {
    const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    return Math.max(0, top);
  }

  function bindCancelHandlers() {
    const cancel = () => stopActiveScroll();

    cancelEvents.forEach((eventName) => {
      window.addEventListener(eventName, cancel, { passive: true, once: true });
    });

    return () => {
      cancelEvents.forEach((eventName) => {
        window.removeEventListener(eventName, cancel);
      });
    };
  }

  function animateScrollTo(target, hash) {
    stopActiveScroll();

    const startY = window.scrollY;
    const destinationY = getTargetTop(target);
    const distance = destinationY - startY;

    if (Math.abs(distance) < 4 || prefersReducedMotion) {
      window.scrollTo(0, destinationY);
      if (hash) {
        window.history.pushState(null, "", hash);
      }
      return;
    }

    const duration = Math.max(620, Math.min(1180, Math.abs(distance) * 0.55));
    const startTime = performance.now();
    teardownCancelHandlers = bindCancelHandlers();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        activeFrame = window.requestAnimationFrame(step);
        return;
      }

      stopActiveScroll();
      if (hash) {
        window.history.pushState(null, "", hash);
      }
    };

    activeFrame = window.requestAnimationFrame(step);
  }

  function isSamePageAnchor(link) {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#") || href === "#") {
      return false;
    }

    return true;
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      if (!(link instanceof HTMLAnchorElement) || !isSamePageAnchor(link)) {
        return;
      }

      link.addEventListener("click", (event) => {
        const hash = link.getAttribute("href");
        if (!hash) {
          return;
        }

        const target = document.querySelector(hash);
        if (!(target instanceof HTMLElement)) {
          return;
        }

        event.preventDefault();

        window.requestAnimationFrame(() => {
          animateScrollTo(target, hash);
        });
      });
    });
  }

  function syncInitialHashOffset() {
    if (!window.location.hash || window.location.hash === "#") {
      return;
    }

    const target = document.querySelector(window.location.hash);
    if (!(target instanceof HTMLElement)) {
      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo(0, getTargetTop(target));
      });
    });
  }

  window.RoyalSmoothScroll = {
    animateScrollTo,
    initSmoothAnchors,
    syncInitialHashOffset,
    stopActiveScroll,
  };

  document.addEventListener("DOMContentLoaded", () => {
    initSmoothAnchors();
    syncInitialHashOffset();
  });
})();
