// gsap.registerPlugin(ScrollTrigger);

// const mediaQueries = {
//   mobile: window.matchMedia("(max-width: 479px)"),
//   tablet: window.matchMedia("(min-width: 480px) and (max-width: 991px)"),
//   desktop: window.matchMedia("(min-width: 992px)"),
// };

// const openGateScrollAnim = () => {
//   if (!mediaQueries.desktop.matches) return;

//   const statsBlockRow = document.querySelector("[data-stats-row]");
//   const statFirstChild = document.querySelector("[data-stats-row]").children[0];
//   const statSecondChild =
//     document.querySelector("[data-stats-row]").children[1];
//   const statThirdChild = document.querySelector("[data-stats-row]").children[2];
//   const gateLeftImg = document.querySelector("[data-gate-left]");
//   const gateRightImg = document.querySelector("[data-gate-right]");
//   const gateWrapper = document.querySelector("[data-gate-wrapper]");

//   let openGateMM = gsap.matchMedia();

//   openGateMM.add("(min-width: 992px)", () => {
//     const openGateTl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".stat-gate_wrapper",
//         pin: true,
//         start: "top 15%",
//         end: "bottom 30%",
//         scrub: 1,
//       },
//     });

//     openGateTl
//       .from(statsBlockRow, {
//         x: "100vw",
//         duration: 4,
//       })
//       .to(
//         gateLeftImg,
//         {
//           x: "-50vw",
//           duration: 8,
//         },
//         0
//       )
//       .to(
//         gateRightImg,
//         {
//           x: "100vw",
//           duration: 8,
//         },
//         0
//       )
//       .to(gateWrapper, { borderBottomWidth: 0, duration: 1 })
//       .to(statThirdChild, {
//         yPercent: -10,
//         duration: 2,
//       })
//       .to(
//         statSecondChild,
//         {
//           yPercent: 45,
//           duration: 2,
//         },
//         "<"
//       )
//       .to(
//         statFirstChild,
//         {
//           yPercent: 75,
//           duration: 2,
//         },
//         "<"
//       );
//   });
// };

// const initFAQFolderAccordion = () => {
//   const folders = document.querySelectorAll(".faqs_folder");

//   const accordionContainer = document.querySelector(".faqs-scroll_container");
//   const accordionItems = accordionContainer
//     ? accordionContainer.querySelectorAll(".c-accordion-item")
//     : [];

//   const accordionButtons = accordionContainer
//     ? accordionContainer.querySelectorAll(".accordion-btn")
//     : [];

//   // Flag to prevent infinite loops during synchronization
//   let isSync = false;

//   const closeAllFolders = () => {
//     folders.forEach((folder) => folder.classList.remove("uc-open"));
//   };

//   const closeAllAccordions = () => {
//     accordionItems.forEach((item) => item.classList.remove("uc-is-open"));
//     accordionButtons.forEach((btn) => btn.classList.remove("w--open"));

//     accordionContainer
//       .querySelectorAll(".accordion-content")
//       .forEach((content) => {
//         content.classList.remove("uc-is-open");
//       });

//     accordionContainer.querySelectorAll(".accordion-arrow").forEach((arrow) => {
//       arrow.classList.remove("uc-is-open");
//     });
//   };

//   const openFolder = (index) => {
//     if (index >= 0 && index < folders.length) {
//       closeAllFolders();
//       folders[index].classList.add("uc-open");
//     }
//   };

//   const openAccordion = (index) => {
//     if (index >= 0 && index < accordionItems.length) {
//       closeAllAccordions();

//       const item = accordionItems[index];
//       item.classList.add("uc-is-open");

//       if (accordionButtons[index]) {
//         accordionButtons[index].classList.add("w--open");
//       }

//       const content = item.querySelector(".accordion-content");
//       if (content) {
//         content.classList.add("uc-is-open");
//       }

//       const arrow =
//         item.querySelector(".accordion-arrow") ||
//         accordionButtons[index].querySelector(".accordion-arrow");
//       if (arrow) {
//         arrow.classList.add("uc-is-open");
//       }
//     }
//   };

//   // Folder click events
//   folders.forEach((folder, folderIndex) => {
//     folder.addEventListener("click", () => {
//       if (isSync) return;
//       isSync = true;

//       const isCurrentlyOpen = folder.classList.contains("uc-open");

//       if (isCurrentlyOpen) {
//         closeAllFolders();
//         closeAllAccordions();
//       } else {
//         openFolder(folderIndex);
//         openAccordion(folderIndex);
//       }

//       setTimeout(() => {
//         isSync = false;
//       }, 50);
//     });
//   });

//   // Handle accordion clicks
//   accordionButtons.forEach((button, buttonIndex) => {
//     button.addEventListener("click", function (e) {
//       e.stopPropagation();

//       if (isSync) return;
//       isSync = true;

//       const parentItem = button.closest(".c-accordion-item");
//       const isOpen = button.classList.contains("w--open");

//       const accordionContent = parentItem
//         ? parentItem.querySelector(".accordion-content")
//         : null;
//       const arrow =
//         button.querySelector(".accordion-arrow") || parentItem
//           ? parentItem.querySelector(".accordion-arrow")
//           : null;

//       if (isOpen) {
//         // If open, then close
//         button.classList.remove("w--open");
//         if (parentItem) parentItem.classList.remove("uc-is-open");
//         if (accordionContent) accordionContent.classList.remove("uc-is-open");
//         if (arrow) arrow.classList.remove("uc-is-open");

//         // Sync with folders
//         closeAllFolders();
//       } else {
//         closeAllAccordions();

//         button.classList.add("w--open");
//         if (parentItem) parentItem.classList.add("uc-is-open");
//         if (accordionContent) accordionContent.classList.add("uc-is-open");
//         if (arrow) arrow.classList.add("uc-is-open");

//         // Sync with folders - find index and open corresponding folder
//         const accordionIndex = Array.from(accordionItems).indexOf(parentItem);
//         openFolder(accordionIndex);
//       }

//       setTimeout(() => {
//         isSync = false;
//       }, 50);
//     });
//   });

//   // Open first folder and accordion on page load/by default
//   setTimeout(() => {
//     openFolder(0);
//     openAccordion(0);
//   }, 100);
// };

// document.addEventListener("DOMContentLoaded", (event) => {
//   openGateScrollAnim();
//   initFAQFolderAccordion();
// });

// const initTestimonialSwiper = () => {
//   const testimonialsSwiper = document.querySelectorAll(".swiper-container");

//   testimonialsSwiper.forEach((swiperContainer) => {
//     const swiperEl = swiperContainer.querySelector(".swiper");

//     new Swiper(swiperEl, {
//       slidesPerView: 1,
//       allowTouchMove: false,
//       spaceBetween: 16,
//       pagination: {
//         el: swiperEl.querySelector(".swiper-pagination"),
//       },
//       navigation: {
//         nextEl: swiperContainer.querySelector(".swiper-button-next"),
//         prevEl: swiperContainer.querySelector(".swiper-button-prev"),
//       },
//     });
//   });
// };

// initTestimonialSwiper();
{
  /* <script src="http://127.0.0.1:5501/rivy.js"></script> */
}
