"use strict";

document.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key.toLowerCase() === "g") {
    document.querySelector(".overlay").classList.toggle("active");
  }
});

const initAnimation = () => {
  const textRevealElem = gsap.utils.toArray("[data-text-reveal]");
  const textDivider = document.querySelector(
    ".c-nav_container .nav-logo .nav-line"
  );
  const revealImages = gsap.utils.toArray("[data-reveal-image]");
  const secondImage = revealImages[2];
  const thirdImage = revealImages[3];

  // Create a reusable timeline
  let pageLoadTl;
  let mm;

  const createPageLoadTimeline = () => {
    if (pageLoadTl) {
      pageLoadTl.kill();
    }

    // Recalculate translate values each time the function is called
    const xTranslateValue = (paddingLeftValue) => {
      const imageRectXValue = secondImage.getBoundingClientRect().x;
      return -(imageRectXValue - paddingLeftValue);
    };

    const thirdImageXTransValue = (paddingLeftValue) => {
      const imageRectXValue = thirdImage.getBoundingClientRect().x;
      return -(imageRectXValue - paddingLeftValue);
    };

    const yTranslateValue = (paddingBottomValue) => {
      const imageRectYValue = secondImage.getBoundingClientRect().top;
      return imageRectYValue - paddingBottomValue;
    };

    let breakPoint = 750;

    // Destroy existing matchMedia if it exists
    if (mm) {
      mm.revert();
    }

    mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        let { isDesktop, isMobile, reduceMotion } = context.conditions;

        pageLoadTl = gsap.timeline();

        pageLoadTl
          .to(revealImages, {
            delay: 1,
            y: 0,
            duration: 1.3,
            stagger: 0.48,
            ease: "power3.out",
          })
          .to(textDivider, {
            scale: 1,
            duration: 1,
            ease: "power4.inOut",
          })
          .to(
            textRevealElem,
            {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              y: 0,
              duration: 0.5,
              stagger: 0.1,
            },
            "-=0.55"
          )
          .to(
            secondImage,
            {
              x: isDesktop
                ? () => xTranslateValue(16)
                : () => xTranslateValue(8),
              y: isDesktop
                ? () => yTranslateValue(16)
                : () => yTranslateValue(8),
              ease: "power3.inOut",
              duration: 1.4,
            },
            "-=1.1"
          )
          .to(
            thirdImage,
            {
              x: isDesktop
                ? () => -thirdImageXTransValue(16)
                : () => -thirdImageXTransValue(8),
              y: isDesktop ? "25%" : "50%",
              ease: "power3.inOut",
              duration: 1.4,
            },
            "-=1.15"
          );
      }
    );

    return mm;
  };

  // Initial animation creation
  createPageLoadTimeline();

  // Debounce resize event to prevent excessive calculations
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      createPageLoadTimeline();
    }, 250);
  });
};

window.addEventListener("DOMContentLoaded", initAnimation);
