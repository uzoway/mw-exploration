function initWordAnimations() {
  const animatedElements = document.querySelectorAll("[js-line-animation]");

  animatedElements.forEach((el, index) => {
    // Create SplitText instance with the specified configuration
    const splitText = SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "lines-wrapper",
    });

    const lines = splitText.lines;

    gsap.set(lines, {
      opacity: 0,
      y: 100,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(lines, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.1,
      ease: "power4.out",
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initWordAnimations();
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
