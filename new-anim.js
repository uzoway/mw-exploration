gsap.registerPlugin(SplitText);

// Spring animation configuration
const springConfig = {
  mass: 1,
  stiffness: 100,
  damping: 15,
};

// Custom elastic ease for GSAP
const customSpring = gsap.parseEase(
  `elastic.out(${springConfig.mass},${springConfig.stiffness / 100},${
    springConfig.damping / 100
  })`
);

const dimensions = {
  desktop: {
    home: { width: "37.5rem", height: 250 },
    about: { width: "37.5rem", height: "77vh" },
    work: { width: "98vw", height: "77vh" },
  },
  mobile: {
    home: { width: "98vw", height: "26.7rem" },
    about: { width: "92vw", height: "77vh" },
    work: { width: "92vw", height: "77vh" },
  },
};

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  const initializeTextSplitting = () => {
    // Select all elements with the data-text-split attribute
    const splitElements = document.querySelectorAll('[data-text-split="true"]');

    // Create array to store all SplitText instances
    const splitTextInstances = [];

    // Initialize SplitText for each element
    splitElements.forEach((element) => {
      // Create SplitText instance
      const split = new SplitText(element, {
        type: "lines",
        linesClass: "split-line",
      });

      // Add class to parent for proper styling
      element.classList.add("split-parent");

      // Store the instance
      splitTextInstances.push(split);

      // Wrap each line in a div for clean animation
      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });
    });
  };

  initializeTextSplitting();

  // Create master timeline
  const masterTl = gsap.timeline({ delay: 0.5 });

  // Add animations to timeline
  masterTl
    .set(splitElements, {
      opacity: 1,
      visibility: "visible",
    })
    .from("[data-tab-container]", {
      scale: 0,
      transformOrigin: "top",
      ease: customSpring,
      duration: 1,
    })
    .from(
      splitTextInstances.map((split) => split.lines),
      {
        yPercent: 105,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.85"
    );

  const initializeBarbaTransitions = () => {
    barba.init({
      transitions: [
        {
          name: "opacity-transition",
          leave(data) {
            return gsap.to(data.current.container, {
              opacity: 0,
            });
          },
          enter(data) {
            return gsap.from(data.next.container, {
              opacity: 0,
            });
          },
        },
      ],
    });
  };

  initializeBarbaTransitions();

  const initializeTabInteractions = () => {
    const tabsContainer = document.querySelector(".hero_tabs-container");
    const tabButtons = document.querySelectorAll(".hero_tabs-button");
    const tabContents = document.querySelectorAll(".hero_tab-content");
    const closeButton = document.querySelector(".hero_tab-close-button");

    // Add animation state flag
    let isAnimating = false;

    // Check if the current page is the home page
    if (window.location.pathname === "/") {
      // Set default state for CLOSE MODAL button
      closeButton.classList.remove("is-visible");
    }

    // const dimensions = {
    //   home: { width: "37.5rem", height: 250 },
    //   about: { width: "37.5rem", height: "77vh" },
    //   work: { width: "98vw", height: "77vh" },
    // };

    // const mobileDimensions = {
    //   home: { width: "98vw", height: "26.7rem" },
    //   about: { width: "92vw", height: "77vh" },
    //   work: { width: "92vw", height: "77vh" },
    // };

    function switchTab(targetTab) {
      let mm = gsap.matchMedia(),
        breakPoint = 479;

      mm.add(
        {
          isDesktop: `(min-width: ${breakPoint}px)`,
          isMobile: `(max-width: ${breakPoint - 1}px)`,
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
          let { isDesktop, isMobile, reduceMotion } = context.conditions;

          // If animation is in progress, ignore the click
          if (isAnimating) return;

          // Set animation flag
          isAnimating = true;

          // Update active states
          tabButtons.forEach((btn) => {
            btn.classList.toggle("is-active", btn.dataset.tab === targetTab);
          });

          // Handle content transition
          const currentContent = document.querySelector(
            ".hero_tab-content.is-active"
          );
          const targetContent = document.querySelector(
            `.hero_tab-content[data-tab="${targetTab}"]`
          );

          const contentTransitionTl = gsap.timeline({
            onComplete: () => {
              // Reset animation flag when all animations are complete
              isAnimating = false;
            },
          });

          contentTransitionTl
            .to(currentContent, {
              // Fade out current content
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                currentContent.classList.remove("is-active");
                currentContent.style.visibility = "hidden";
              },
            })
            .to(
              [tabsContainer, tabContents],
              {
                // Animate container dimensions
                width: isDesktop
                  ? dimensions.desktop[targetTab].width
                  : dimensions.mobile[targetTab].width,
                height: isDesktop
                  ? dimensions.desktop[targetTab].height
                  : dimensions.mobile[targetTab].height,
                duration: 1,
                ease: customSpring,
              },
              "-=0.1"
            )
            .to(
              targetContent,
              {
                // Fade in new content with delay
                opacity: 1,
                visibility: "visible",
                duration: 0.3,
                onStart: () => {
                  targetContent.classList.add("is-active");
                },
              },
              "-=0.8"
            )
            .to(
              closeButton,
              {
                opacity: targetTab === "home" ? 0 : 1,
                visibility: targetTab === "home" ? "hidden" : "visible",
                duration: 0.3,
              },
              "0.3"
            );
        }
      );

      // Update container classes for responsive styling
      tabsContainer.classList.remove("about-active", "work-active");
      if (targetTab !== "home") {
        tabsContainer.classList.add(`${targetTab}-active`);
      }
    }

    // Event Listeners
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.dataset.tab;
        if (!button.classList.contains("is-active")) {
          switchTab(targetTab);
        }
      });
    });

    closeButton.addEventListener("click", () => {
      switchTab("home");
    });
  };

  initializeTabInteractions();
});
