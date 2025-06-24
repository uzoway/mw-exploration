gsap.registerPlugin(ScrollTrigger);

// let animations = []; // Store all timelines and original text

// const splitTextOnScroll = () => {
//   const splitTexts = document.querySelectorAll("[js-scroll-highlight]");

//   splitTexts.forEach((element, i) => {
//     // Store original text content if not already stored
//     if (!animations[i]) {
//       animations[i] = {
//         element: element,
//         originalText: element.textContent,
//         timeline: null,
//       };
//     }

//     // Create split text
//     const text = SplitText.create(element, { types: ["chars", "words"] });

//     // Create timeline
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: "[js-scroll-trigger]",
//         start: "top top",
//         scrub: true,
//         pin: true,
//         markers: true,
//       },
//     });

//     tl.from(text.chars, {
//       opacity: 0.2,
//       stagger: 0.1,
//     });

//     // Store the timeline
//     animations[i].timeline = tl;
//   });
// };

// const cleanupAnimations = () => {
//   animations.forEach((anim) => {
//     if (anim.timeline) {
//       anim.timeline.kill(); // Kill the timeline
//     }
//     // Restore original text content
//     anim.element.textContent = anim.originalText;
//   });
// };

// // Initialize
// splitTextOnScroll();

// // Resize handler
// let windowWidth = window.innerWidth;
// window.addEventListener("resize", function () {
//   if (windowWidth !== window.innerWidth) {
//     windowWidth = window.innerWidth;

//     // Cleanup existing animations and restore text
//     cleanupAnimations();

//     // Recreate animations
//     splitTextOnScroll();
//   }
// });

// function createScrollHighlight({
//   textSelector = "[js-scroll-highlight]",
//   triggerSelector = "[js-scroll-trigger]",
//   animationOptions = {
//     opacity: 0.2,
//     stagger: 0.1,
//   },
//   scrollTriggerOptions = {
//     start: "top top",
//     scrub: true,
//     pin: true,
//     markers: true,
//   },
// } = {}) {
//   let animations = [];
//   let windowWidth = window.innerWidth;

//   const init = () => {
//     const elements = document.querySelectorAll(textSelector);

//     elements.forEach((element, i) => {
//       const split = SplitText.create(element, { types: ["chars", "words"] });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: triggerSelector,
//           ...scrollTriggerOptions,
//         },
//       });

//       tl.from(split.chars, animationOptions);

//       animations[i] = {
//         element,
//         originalText: element.textContent,
//         timeline: tl,
//         splitInstance: split, // Store this for cleanup
//       };
//     });
//   };

//   const cleanup = () => {
//     animations.forEach(({ element, timeline, splitInstance, originalText }) => {
//       if (timeline) timeline.kill();
//       if (splitInstance && typeof splitInstance.revert === "function") {
//         splitInstance.revert(); // Restore original DOM structure
//       } else {
//         element.textContent = originalText; // Fallback
//       }
//     });
//     animations = [];
//   };

//   const resizeHandler = () => {
//     if (window.innerWidth !== windowWidth) {
//       windowWidth = window.innerWidth;
//       cleanup();
//       init();
//     }
//   };

//   // Initialize on load
//   init();
//   window.addEventListener("resize", resizeHandler);

//   return () => {
//     window.removeEventListener("resize", resizeHandler);
//     cleanup();
//   };
// }

// const destroyHighlight = createScrollHighlight({
//   textSelector: "[js-scroll-highlight]",
//   triggerSelector: "[js-scroll-trigger]",
//   animationOptions: { opacity: 0.1, stagger: 0.08 },
//   scrollTriggerOptions: { start: "top top", scrub: true, pin: true },
// });
// CustomEase.create("ease-in-quad", "0.55,0.085,0.68,0.53");
// CustomEase.create("ease-in-cubic", "0.55,0.055,0.675,0.19");
// CustomEase.create("ease-in-quart", "0.895,0.03,0.685,0.22");
// CustomEase.create("ease-in-quint", "0.755,0.05,0.855,0.06");
// CustomEase.create("ease-in-expo", "0.95,0.05,0.795,0.035");
// CustomEase.create("ease-in-circ", "0.6,0.04,0.98,0.335");
// CustomEase.create("ease-out-quad", "0.25,0.46,0.45,0.94");
// CustomEase.create("ease-out-cubic", "0.215,0.61,0.355,1");
CustomEase.create("ease-out-quart", "0.165,0.84,0.44,1");
// CustomEase.create("ease-out-quint", "0.23,1,0.32,1");
// CustomEase.create("ease-out-expo", "0.19,1,0.22,1");
// CustomEase.create("ease-out-circ", "0.075,0.82,0.165,1");
// CustomEase.create("ease-in-out-quad", "0.455,0.03,0.515,0.955");
// CustomEase.create("ease-in-out-cubic", "0.645,0.045,0.355,1");
// CustomEase.create("ease-in-out-quart", "0.77,0,0.175,1");
CustomEase.create("ease-in-out-quint", "0.86,0,0.07,1");
// CustomEase.create("ease-in-out-expo", "1,0,0,1");
// CustomEase.create("ease-in-out-circ", "0.785,0.135,0.15,0.86");

// // Image & Text Timeline
// const ImageTextScroll = () => {
//   const imagesContainer = document.querySelector("[js-images-container]");
//   const numsCounter = document.querySelector("[js-numbers-counter]");
//   const imagesCountIndicator = document.querySelector(
//     "[js-timeline-indicator]"
//   );
//   const imageOverlays = document.querySelectorAll("[js-image-overlay]");

//   let splitTexts = [];
//   const headings = document.querySelectorAll("[js-timeline-heading]");

//   headings.forEach((heading, index) => {
//     // Split text into lines with mask
//     const splitText = SplitText.create(heading, {
//       type: "lines",
//       mask: "lines",
//       linesClass: "lines-wrapper",
//     });

//     splitTexts.push(splitText);

//     // Set initial positions
//     if (index === 0) {
//       // First heading starts visible
//       gsap.set(splitText.lines, { yPercent: 0 });
//     } else {
//       // All other headings start below (hidden)
//       gsap.set(splitText.lines, { yPercent: 100 });
//     }
//   });

//   let splitTextsSubtext = [];
//   const subtexts = document.querySelectorAll("[js-timeline-subtext]");

//   subtexts.forEach((heading, index) => {
//     // Split text into lines with mask
//     const splitText = SplitText.create(heading, {
//       type: "lines",
//       mask: "lines",
//       linesClass: "lines-wrapper",
//     });

//     splitTextsSubtext.push(splitText);

//     // Set initial positions
//     if (index === 0) {
//       // First heading starts visible
//       gsap.set(splitText.lines, { yPercent: 0 });
//     } else {
//       // All other headings start below (hidden)
//       gsap.set(splitText.lines, { yPercent: 100 });
//     }
//   });

//   const tl = gsap.timeline({
//     defaults: {
//       ease: "ease-out-quart",
//       duration: 1.5,
//     },
//     delay: 2,
//     scrollTrigger: {
//       start: "top top",
//       trigger: "[js-build-trigger]",
//       scrub: true,
//       pin: true,
//       markers: true,
//       anticipatePin: 1,
//     },
//   });

//   tl.to(imagesCountIndicator, {
//     left: "20%",
//   })
//     .to(imageOverlays[0], { opacity: 0 }, "<")
//     .to(
//       imagesCountIndicator,
//       {
//         left: "40%",
//       },
//       "1"
//     )
//     .to(
//       imagesContainer,
//       {
//         yPercent: -20,
//       },
//       "1"
//     )
//     .to(
//       numsCounter,
//       {
//         yPercent: -20,
//       },
//       "1"
//     )
//     .to(imageOverlays[1], { opacity: 0 }, "1")
//     .to(
//       splitTexts[0].lines,
//       {
//         yPercent: -100,
//         duration: 0.65,
//         ease: "power2.in",
//       },
//       ".7"
//     )
//     .to(
//       splitTexts[1].lines,
//       {
//         yPercent: 0,
//         duration: 0.65,
//         ease: "power2.out",
//       },
//       ">-0.3"
//     )
//     .to(
//       splitTextsSubtext[0].lines,
//       {
//         yPercent: -100,
//         duration: 0.7,
//         ease: "power2.out",
//       },
//       "1"
//     )
//     .to(
//       splitTextsSubtext[1].lines,
//       {
//         yPercent: 0,
//         duration: 0.7,
//         ease: "power2.out",
//       },
//       ">-0.45"
//     )
//     /* 40% Starts here */
//     .to(
//       imagesCountIndicator,
//       {
//         left: "60%",
//       },
//       "2.5"
//     )
//     .to(
//       imagesContainer,
//       {
//         yPercent: -40,
//       },
//       "2.5"
//     )
//     .to(
//       numsCounter,
//       {
//         yPercent: -40,
//       },
//       "2.5"
//     )
//     .to(imageOverlays[2], { opacity: 0 }, "2.5")
//     .to(
//       splitTexts[1].lines,
//       {
//         yPercent: -100,
//         duration: 0.6,
//         ease: "power2.in",
//       },
//       "2.35"
//     )
//     .to(
//       splitTexts[2].lines,
//       {
//         yPercent: 0,
//         duration: 0.6,
//         ease: "power2.out",
//       },
//       ">-0.3"
//     )
//     .to(
//       splitTextsSubtext[1].lines,
//       {
//         yPercent: -100,
//         duration: 0.6,
//         ease: "power2.out",
//       },
//       "2.5"
//     )
//     .to(
//       splitTextsSubtext[2].lines,
//       {
//         yPercent: 0,
//         duration: 0.6,
//         ease: "power2.out",
//       },
//       ">-0.45"
//     )
//     /* 60% Starts here */
//     .to(
//       imagesCountIndicator,
//       {
//         left: "80%",
//       },
//       "4"
//     )
//     .to(
//       imagesContainer,
//       {
//         yPercent: -60,
//       },
//       "4"
//     )
//     .to(
//       numsCounter,
//       {
//         yPercent: -60,
//       },
//       "4"
//     )
//     .to(imageOverlays[3], { opacity: 0 }, "4")
//     .to(
//       splitTexts[2].lines,
//       {
//         yPercent: -100,
//         duration: 0.6,
//         ease: "power2.in",
//       },
//       "3.75"
//     )
//     .to(
//       splitTexts[3].lines,
//       {
//         yPercent: 0,
//         duration: 0.6,
//         ease: "power2.out",
//       },
//       ">-0.3"
//     )
//     .to(
//       splitTextsSubtext[2].lines,
//       {
//         yPercent: -100,
//         duration: 0.6,
//         ease: "power2.out",
//       },
//       "4"
//     )
//     .to(
//       splitTextsSubtext[3].lines,
//       {
//         yPercent: 0,
//         duration: 0.6,
//         ease: "power2.out",
//       },
//       ">-0.45"
//     )
//     /* 80% Starts here */
//     .to(
//       imagesCountIndicator,
//       {
//         left: "100%",
//       },
//       "5.5"
//     )
//     .to(
//       imagesContainer,
//       {
//         yPercent: -80,
//       },
//       "5.5"
//     )
//     .to(
//       numsCounter,
//       {
//         yPercent: -80,
//       },
//       "5.5"
//     )
//     .to(imageOverlays[4], { opacity: 0 }, "5.5")
//     .to(
//       splitTexts[3].lines,
//       {
//         yPercent: -100,
//         duration: 0.6,
//         ease: "power2.in",
//       },
//       5.3
//     )
//     .to(
//       splitTexts[4].lines,
//       {
//         yPercent: 0,
//         duration: 0.6,
//         ease: "power2.out",
//       },
//       ">-0.3"
//     )
//     .to(
//       splitTextsSubtext[3].lines,
//       {
//         yPercent: -100,
//         duration: 0.6,
//         ease: "power2.out",
//       },
//       "5.5"
//     )
//     .to(
//       splitTextsSubtext[4].lines,
//       {
//         yPercent: 0,
//         duration: 0.6,
//         ease: "power2.out",
//       },
//       ">-0.45"
//     );
// };

// document.addEventListener("DOMContentLoaded", () => {
//   ImageTextScroll();
//   ScrollTrigger.refresh();
// });

// const plmScrollTrigger = () => {
//   const triggerEl = document.querySelector("[js-plm-trigger]");
//   const clipEl = document.querySelector("[js-clip-overlay]");

//   const triggerTween = gsap.fromTo(
//     clipEl,
//     {
//       clipPath:
//         "polygon(evenodd, 0% 0%, 100.25% 0%, 100.25% 100.25%, 0% 100.25%, 34.01% 67.62%, 34.01% 35.5%, 71.91% 35.5%, 71.91% 67.62%, 34.01% 67.62%, 0% 100.25%)",
//     },
//     {
//       clipPath:
//         "polygon(evenodd, 0% 0%, 100.25% 0%, 100.25% 100.25%, 0% 100.25%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100.25%)",
//       scrollTrigger: {
//         trigger: triggerEl,
//         start: "top top",
//         pin: true,
//         scrub: 1,
//         markers: true,
//       },
//     }
//   );
// };

// document.addEventListener("DOMContentLoaded", () => {
//   plmScrollTrigger();
//   ScrollTrigger.refresh();
// });

const plmScrollTrigger = () => {
  let triggerTween;

  const init = () => {
    const triggerEl = document.querySelector("[js-plm-trigger]");
    const clipEl = document.querySelector("[js-clip-overlay]");

    // Safety check
    if (!triggerEl || !clipEl) return;

    // Kill existing instance if it exists
    if (triggerTween) {
      triggerTween.scrollTrigger.kill();
      triggerTween.kill();
    }

    triggerTween = gsap.fromTo(
      clipEl,
      {
        clipPath:
          "polygon(evenodd, 0% 0%, 100.25% 0%, 100.25% 100.25%, 0% 100.25%, 34.01% 67.62%, 34.01% 35.5%, 71.91% 35.5%, 71.91% 67.62%, 34.01% 67.62%, 0% 100.25%)",
      },
      {
        clipPath:
          "polygon(evenodd, 0% 0%, 100.25% 0%, 100.25% 100.25%, 0% 100.25%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100.25%)",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          pin: true,
          scrub: 1,
          markers: true,
        },
      }
    );
  };

  // Initialize on load
  init();

  // Re-initialize on resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
};

const scrambleTextsOnScroll = () => {
  let triggerTween;

  const init = () => {
    const scrambleTexts = document.querySelector("[js-scramble-numbers]");
    const triggerEl = document.querySelector("[js-scramble-trigger]");
    const tagWrap = document.querySelector("[js-scramble-tag-wrap]");

    // Safety Check
    if (!scrambleTexts || !triggerEl || !tagWrap) return;

    // Kill existing instance if it exists
    if (triggerTween) {
      triggerTween.scrollTrigger.kill();
      triggerTween.kill();
    }

    triggerTween = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        // pin: true,
        markers: true,
        // scrub: true,
        start: "top top",
        refreshPriority: 0,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
      defaults: {
        ease: "ease-in-out-quint",
      },
    });

    triggerTween
      .to(
        tagWrap,
        {
          yPercent: () => "-35",
          duration: 3,
        },
        0
      )
      .to(
        scrambleTexts,
        {
          duration: 3,
          scrambleText: {
            text: "100,000",
            chars: "012345",
            tweenLength: true,
          },
        },
        "<"
      )
      .to(
        tagWrap,
        {
          yPercent: () => "-70",
          duration: 3,
        },
        3
      )
      .to(
        scrambleTexts,
        {
          duration: 3,
          scrambleText: {
            text: "15,000",
            chars: "01234",
          },
        },
        "<"
      );
  };

  init();

  // Re-initialize on resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
};

const createScrollHighlight = ({
  textSelector = "[js-scroll-highlight]",
  triggerSelector = "[js-scroll-trigger]",
  animationOptions = {
    opacity: 0.2,
    stagger: 0.1,
  },
  scrollTriggerOptions = {
    start: "top top",
    scrub: true,
    pin: true,
    markers: true,
    anticipatePin: 1,
  },
} = {}) => {
  let animations = [];
  let windowWidth = window.innerWidth;

  const init = () => {
    const elements = document.querySelectorAll(textSelector);

    elements.forEach((element, i) => {
      const split = SplitText.create(element, { types: ["chars", "words"] });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerSelector,
          ...scrollTriggerOptions,
        },
      });

      tl.from(split.chars, animationOptions).to(
        "[js-scale-image]",
        {
          scale: 1.5,
          stagger: 4,
          duration: 3,
          ease: "ease-out-quart",
        },
        "1"
      );

      animations[i] = {
        element,
        originalText: element.textContent,
        timeline: tl,
        splitInstance: split, // Store this for cleanup
      };
    });
  };

  const cleanup = () => {
    animations.forEach(({ element, timeline, splitInstance, originalText }) => {
      if (timeline) timeline.kill();
      if (splitInstance && typeof splitInstance.revert === "function") {
        splitInstance.revert(); // Restore original DOM structure
      } else {
        element.textContent = originalText; // Fallback
      }
    });
    animations = [];
  };

  const resizeHandler = () => {
    if (window.innerWidth !== windowWidth) {
      windowWidth = window.innerWidth;
      cleanup();
      init();
    }
  };

  // Initialize on load
  init();
  window.addEventListener("resize", resizeHandler);

  return () => {
    window.removeEventListener("resize", resizeHandler);
    cleanup();
  };
};

https://cdn.prod.website-files.com/6834333a15ddac869f49aea5/6855870253a8f571890c2053_1DTI-Load%202_000.webp
    https://cdn.prod.website-files.com/6834333a15ddac869f49aea5/685586db7b1ea511aaa48353_1DTI-Load%202_150.webp
    https://cdn.prod.website-files.com/6834333a15ddac869f49aea5/685586e854a7a392251b1ec7_1DTI-Load%202_103.webp

    https://res.cloudinary.com/dp20bvzhn/image/upload/v1750758168/DTI%20Global/1DTI-Load_2_156_s5am3y.webp
    https://res.cloudinary.com/dp20bvzhn/image/upload/v1750758198/DTI%20Global/1DTI-Load_2_150_ai6lqe.webp

const heroImagesSequence = () => {
  const frameCount = 180; // update to your total number of frames
  const image = document.querySelector(".cc-sequence-images");

  const currentFrame = (index) =>
    `https://cdn.prod.website-files.com/6834333a15ddac869f49aea5/6855870253a8f571890c2053_1DTI-Load%202_${String(
      index
    ).padStart(3, "0")}.webp`;
    

  // Preload frames
  const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  preloadImages();

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const maxScrollTop = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    image.src = currentFrame(frameIndex + 1);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  plmScrollTrigger();
  scrambleTextsOnScroll();
  createScrollHighlight({
    textSelector: "[js-scroll-highlight]",
    triggerSelector: "[js-scroll-trigger]",
    animationOptions: { opacity: 0.1, stagger: 0.08 },
    scrollTriggerOptions: { start: "top top", scrub: true, pin: true },
  });
  heroImagesSequence();

  ScrollTrigger.refresh();
});

console.log("working");
