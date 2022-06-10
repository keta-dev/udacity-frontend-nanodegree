/**
 Rendering Dynamic Navigation
 *
 */

/**
 * Define Global Variables
 *
 */
const sectionList = Array.from(document.querySelectorAll("section"));
const menuItem = document.getElementById("navbar__list");
const menuListItems = sectionList.length;
const firstSection = document.querySelector("main section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const createList = () => {
  for (section of sectionList) {
    nameOfSection = section.getAttribute("data-nav");
    sectionLink = section.getAttribute("id");

    // to create an item for each section
    item = document.createElement("li");

    // add text to item
    item.innerHTML = `<a class ="menu__link" data-id="${sectionLink}">${nameOfSection}</a>`;

    // append item to the menu
    menuItem.appendChild(item);
  }
};

// to show the active class in viewport
function observerFunc() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  });
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => observer.observe(section));
}
document.onload = observerFunc();

// Scroll to anchor ID using scrollTO event
function scrollToElement(event) {
  if (event.target.nodeName === "A") {
    const sectionId = event.target.getAttribute("data-id");
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
const isSectionInViewPort = (ele) => {
  let post = ele.getBoundingClientRect();
  return;
  post.top >= 0 &&
    post.bottom <= window.innerHeight &&
    post.right <= window.innerWidth;
};

const scrollUp = () => {
  document.body.scrollTop > 10
    ? (toTop__btn.style.display = "block")
    : (toTop__btn.style.display = "none");
};

const toTop = () => {
  firstSection.scrollIntoView({ behavior: "smooth" });
  firstSection.classList.add("active");
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

 function init() {
    // build the nav
    createList();
    toTop__btn.addEventListener("click", toTop);
  }
  
  function onScroll() {
    scrollUp();
  }

/**
 * End Main Functions
 * Begin Events
 *
 */
// document.addEventListener('scroll', setActiveClass);

const navBarList = document.getElementById("navbar__list");
navBarList.addEventListener("click", (event) => scrollToElement(event));

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("scroll", onScroll);
