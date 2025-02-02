// nav.js

export function setupNavbar() {
    const navbar = document.querySelector(".navigation-wrap");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navLinks = document.querySelectorAll(".nav-link");
    const navCollapse = document.querySelector(".navbar-collapse");

    // Function to change navbar background on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 20) {
            navbar.classList.add("scroll-on");
        } else {
            navbar.classList.remove("scroll-on");
        }
    });

    // Function to toggle menu-open class on navbar
    navbarToggler.addEventListener("click", function () {
        navbar.classList.toggle("menu-open");
    });

    // Function to close navbar when a link is clicked (for mobile)
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navCollapse.classList.remove("show");
            navbar.classList.remove("menu-open");
        });
    });
}
