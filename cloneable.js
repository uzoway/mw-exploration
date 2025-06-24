// const initProgressiveHover = (cardSelector = ".card") => {
//   const cards = document.querySelectorAll(cardSelector);
//   let isHovering = false;

//   const applyProgressiveScaling = (hoveredIndex) => {
//     cards.forEach((card, index) => {
//       if (index === hoveredIndex) {
//         card.classList.add("hovered");
//         card.style.transform = "scale(1.05)";
//       } else {
//         const distance = Math.abs(index - hoveredIndex);
//         const scaleReduction = Math.min(distance * 0.08, 0.3);
//         const scale = 1 - scaleReduction;

//         // Key fix: Use margin compensation to maintain gaps
//         const marginCompensation = (1 - scale) * 10; // Adjust multiplier as needed

//         card.classList.remove("hovered");
//         card.style.transform = `scale(${scale})`;
//         card.style.marginLeft = `${marginCompensation}px`;
//         card.style.marginRight = `${marginCompensation}px`;

//         // Optional: opacity effect
//         const opacityReduction = Math.min(distance * 0.1, 0.4);
//         card.style.opacity = 1 - opacityReduction;
//       }
//     });
//   };

//   const resetAllCards = () => {
//     isHovering = false;
//     cards.forEach((card) => {
//       card.classList.remove("hovered");
//       card.style.transform = "scale(1)";
//       card.style.marginLeft = "";
//       card.style.marginRight = "";
//       card.style.opacity = "1";
//     });
//   };

//   const handleCardHover = (index) => {
//     isHovering = true;
//     applyProgressiveScaling(index);
//   };

//   const handleCardLeave = () => {
//     setTimeout(() => {
//       if (!isHovering) resetAllCards();
//     }, 50);
//   };

//   // Attach event listeners
//   cards.forEach((card, index) => {
//     card.addEventListener("mouseenter", () => handleCardHover(index));
//     card.addEventListener("mouseleave", handleCardLeave);
//   });

//   // Container leave cleanup
//   const container = cards[0]?.parentElement;
//   if (container) {
//     container.addEventListener("mouseleave", resetAllCards);
//   }
// };

// // Initialize
// document.addEventListener("DOMContentLoaded", () => {
//   initProgressiveHover(".project-card_linkblock"); // Pass your card selector
// });

// $(".project-card_linkblock").hover(
//   function () {
//     $(".h-hero_content-wrap").css({
//       opacity: "0.2",
//       transform: "scale(0.9)",
//       transition:
//         "opacity 0.4s cubic-bezier(.16, 1, .3, 1), transform 0.4s cubic-bezier(.16, 1, .3, 1)",
//     });

//     $(".h-hero_arrow").css({
//       opacity: "0",
//       transition: "opacity 0.4s cubic-bezier(.16, 1, .3, 1)",
//     });

//     $(".h-hero_work-divider").css({
//       opacity: "0",
//       transition: "opacity 0.2s cubic-bezier(.16, 1, .3, 1)",
//     });
//   },
//   function () {
//     $(".h-hero_content-wrap").css({
//       opacity: "1",
//       transform: "scale(1)",
//     });

//     $(".h-hero_arrow").css({
//       opacity: "1",
//     });

//     $(".h-hero_work-divider").css({
//       opacity: "1",
//     });
//   }
// );

// let worksHeight = $(".h-hero_works").outerHeight(); // Get height including padding
// $(".h-hero_work-divider").css("margin-bottom", `calc(${worksHeight}px)`);

// // Cursor Follow mouse
// let cursorItem = document.querySelector(".cursor");
// let cursorParagraph = cursorItem.querySelector("p");
// let cursorArrow = cursorItem.querySelector(".cursor_icon");
// let targets = document.querySelectorAll("[data-cursor]");
// let xOffset = 10;
// let yOffset = 40;
// let currentTarget = null;
// let lastText = "";

// gsap.set(cursorItem, { xPercent: xOffset, yPercent: yOffset });

// let xTo = gsap.quickTo(cursorItem, "x", { ease: "power3" });
// let yTo = gsap.quickTo(cursorItem, "y", { ease: "power3" });

// window.addEventListener("mousemove", (e) => {
//   let scrollY = window.scrollY;
//   let cursorX = e.clientX;
//   let cursorY = e.clientY + scrollY;

//   gsap.to(cursorItem, {
//     xPercent: xOffset,
//     yPercent: yOffset,
//     duration: 0.3,
//     ease: "power3",
//   });

//   xTo(cursorX);
//   yTo(cursorY - scrollY);
// });

// // Mouse enter handling
// targets.forEach((target) => {
//   target.addEventListener("mouseenter", () => {
//     currentTarget = target;
//     let newText = target.getAttribute("data-cursor");

//     if (newText !== lastText) {
//       cursorParagraph.innerHTML = newText;
//       lastText = newText;
//     }

//     // Show or hide the icon based on presence of data-cursor-arrow
//     if (target.matches("[data-cursor][data-cursor-arrow]")) {
//       cursorArrow.style.display = "flex";
//     } else {
//       cursorArrow.style.display = "none";
//     }
//   });
// });

// // Optional: mouse leave resets the icon (optional behavior)
// targets.forEach((target) => {
//   target.addEventListener("mouseleave", () => {
//     cursorArrow.style.display = "none";
//   });
// });

// return () => {
//   targets.forEach((item) => {
//     item.removeEventListener("mouseenter");
//     item.removeEventListener("mouseleave");
//   });

//   window.removeEventListener("mousemove");
// };

// Hero Interaction
// const navItems = document.querySelectorAll(".project-card_linkblock");

// const toggleSiblingClass = (items, index, offset, className, add) => {
//   const sibling = items[index + offset];
//   if (sibling) {
//     sibling.classList.toggle(className, add);
//   }
// };

// navItems.forEach((item, index) => {
//   item.addEventListener("mouseenter", () => {
//     item.classList.add("hover");

//     toggleSiblingClass(navItems, index, -1, "sibling-far1", true);
//     toggleSiblingClass(navItems, index, 1, "sibling-far1", true);
//     toggleSiblingClass(navItems, index, -2, "sibling-far2", true);
//     toggleSiblingClass(navItems, index, 2, "sibling-far2", true);
//     toggleSiblingClass(navItems, index, -3, "sibling-far3", true);
//     toggleSiblingClass(navItems, index, 3, "sibling-far3", true);
//     toggleSiblingClass(navItems, index, -4, "sibling-far4", true);
//     toggleSiblingClass(navItems, index, 4, "sibling-far4", true);
//   });

//   item.addEventListener("mouseleave", () => {
//     item.classList.remove("hover");
//     toggleSiblingClass(navItems, index, -1, "sibling-far1", false);
//     toggleSiblingClass(navItems, index, 1, "sibling-far1", false);
//     toggleSiblingClass(navItems, index, -2, "sibling-far2", false);
//     toggleSiblingClass(navItems, index, 2, "sibling-far2", false);
//     toggleSiblingClass(navItems, index, -3, "sibling-far3", false);
//     toggleSiblingClass(navItems, index, 3, "sibling-far3", false);
//     toggleSiblingClass(navItems, index, -4, "sibling-far4", false);
//     toggleSiblingClass(navItems, index, 4, "sibling-far4", false);
//   });
// });

const navItems = document.querySelectorAll(".project-card_linkblock");

const toggleSiblingClass = (items, index, offset, className, add) => {
  const sibling = items[index + offset];
  if (sibling) {
    sibling.classList.toggle(className, add);
  }
};

navItems.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    void item.offsetWidth;

    requestAnimationFrame(() => {
      item.classList.add("hover");
      toggleSiblingClass(navItems, index, -1, "sibling-far1", true);
      toggleSiblingClass(navItems, index, 1, "sibling-far1", true);
      toggleSiblingClass(navItems, index, -2, "sibling-far2", true);
      toggleSiblingClass(navItems, index, 2, "sibling-far2", true);
      toggleSiblingClass(navItems, index, -3, "sibling-far3", true);
      toggleSiblingClass(navItems, index, 3, "sibling-far3", true);
      toggleSiblingClass(navItems, index, -4, "sibling-far4", true);
      toggleSiblingClass(navItems, index, 4, "sibling-far4", true);
    });
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("hover");
    toggleSiblingClass(navItems, index, -1, "sibling-far1", false);
    toggleSiblingClass(navItems, index, 1, "sibling-far1", false);
    toggleSiblingClass(navItems, index, -2, "sibling-far2", false);
    toggleSiblingClass(navItems, index, 2, "sibling-far2", false);
    toggleSiblingClass(navItems, index, -3, "sibling-far3", false);
    toggleSiblingClass(navItems, index, 3, "sibling-far3", false);
    toggleSiblingClass(navItems, index, -4, "sibling-far4", false);
    toggleSiblingClass(navItems, index, 4, "sibling-far4", false);
  });
});
