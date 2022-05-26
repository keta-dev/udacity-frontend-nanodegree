/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sectionList = Array.from(document.querySelectorAll('section'));
const menuItem = document.getElementById('navbar__list');
const menuListItems = sectionList.length;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const createList = () => {
    for (section of sectionList) {
        nameOfSection = section.getAttribute('data-nav');
        sectionLink = section.getAttribute('id');

        // to create an item for each section
        item = document.createElement('li');

        // add text to item
        item.innerHTML = `<a class ="menu__link" data-id="${sectionLink}">${nameOfSection}</a>`

        // append item to the menu
        menuItem.appendChild(item);
    }
}


// The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.

const isSectionInViewPort = (ele) => {
    let position = ele.getBoundingClientRect();
    return (position.top >= 0);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// to check for section in viewport generally:

// to show the active class in viewport
const toggleClass = () => {
    for (section in sectionList) {
        // if true
        if (isSectionInViewPort(sectionList[section])) {
            // if section does not contain active class
            if (!sectionList[section].classList.contains('your-active-class')) {
                // add
                sectionList[section].classList.add('your-active-class');
            }
        }  else {
            sectionList[section].classList.remove('your-active-class');
        }
    }
}
// Scroll to anchor ID using scrollTO event
function scrollToElement(event){
    if(event.target.nodeName === 'A'){
        const sectionId = event.target.getAttribute('data-id');
        const section = document.getElementById(sectionId);
        section.scrollIntoView({behavior: "smooth"});
    }
}



/**
 * End Main Functions
 * Begin Events
 * 
*/
// document.addEventListener('scroll', setActiveClass);

const navBarList = document.getElementById('navbar__list');
navBarList.addEventListener('click', (event) => scrollToElement(event));

// Build menu 
createList();

// this scrolls to the selected link
document.addEventListener('scroll', toggleClass);