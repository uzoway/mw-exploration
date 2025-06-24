{
  /* <script src="http://127.0.0.1:5501/mura.js"></script> */
}

// Home Page "Mura Fixes That" scroll animation
// const sequentialTextReveal = () => {
//   const timeline = gsap.timeline({
//     scrollTrigger: {
//       trigger: "[data-section='mission']",
//       start: "top top",
//     },
//   });

//   const animateSplit = (
//     selector,
//     type,
//     fromProps,
//     toProps,
//     className,
//     ease,
//     position = "<"
//   ) => {
//     SplitText.create(selector, {
//       type,
//       [`${type}Class`]: className,
//       autoSplit: true,
//       mask: type,
//       onSplit: (self) => {
//         timeline.fromTo(
//           self[type],
//           fromProps,
//           {
//             ...toProps,
//             stagger: 0.012,
//             ease: ease,
//           },
//           position
//         );
//       },
//     });
//   };

//   animateSplit(
//     "[data-split-type='lines']",
//     "lines",
//     { yPercent: 0 },
//     { yPercent: -115, duration: 1.7 },
//     "line",
//     "power4.inOut",
//     "0"
//   );

//   SplitText.create("[data-split-type='chars']", {
//     type: "words,chars",
//     wordsClass: "word",
//     charsClass: "char",
//     autoSplit: true,
//     mask: "chars",
//     onSplit: (self) => {
//       timeline.fromTo(
//         self.chars,
//         { yPercent: 105 },
//         {
//           yPercent: 0,
//           duration: 0.5,
//           stagger: 0.012,
//           ease: "power4.out",
//         },
//         "1.5"
//       );
//     },
//   });

//   timeline.to(
//     ".mission_gradient-overlay",
//     {
//       scaleX: 1,
//       duration: 1.75,
//       ease: "ease-in-out-quart",
//     },
//     ".5"
//   );
// };

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  //   sequentialTextReveal();
});
