// Function to activate the navbar based on scroll position
export function activateNavbar() {
    // Select the navigation wrap element
    let nav = document.querySelector(".navigation-wrap");

    // When the user scrolls, check the scroll position
    window.onscroll = function () {
        // If the scroll position is greater than 20px, add 'scroll-on' class
        if (document.documentElement.scrollTop > 20) {
            nav.classList.add("scroll-on");
        } else {
            // Otherwise, remove the 'scroll-on' class
            nav.classList.remove("scroll-on");
        }
    };
}

// Function to hide the navbar when a nav link is clicked
export function hideNavbarOnClick() {
    // Select all the nav links
    let navBar = document.querySelectorAll('.nav-link');
    // Select the collapsible navbar
    let navCollapse = document.querySelector('.navbar-collapse.collapse');

    // Loop through each nav link and add a click event listener
    navBar.forEach(function(a) {
        a.addEventListener("click", function() {
            // Remove the 'show' class from the navbar collapse to hide it
            navCollapse.classList.remove("show");
        });
    });
}

// Function to toggle the navbar color when the toggler button is clicked
export function toggleNavbarColor() {
    // Wait for the DOM to be fully loaded
    document.addEventListener("DOMContentLoaded", function () {
        // Select the navbar toggler button
        const navbarToggler = document.querySelector(".navbar-toggler");
        // Select the navigation wrap element
        const navbar = document.querySelector(".navigation-wrap");

        // Add a click event listener to the navbar toggler
        navbarToggler.addEventListener("click", function () {
            // Toggle the 'menu-open' class on the navigation wrap when the button is clicked
            navbar.classList.toggle("menu-open");
        });
    });
}
