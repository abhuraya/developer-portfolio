const currentYear = document.querySelector("#current-year");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(
    ".hero-content, .hero-card, .section-heading, .value-card, .project-card, .skills-grid > div, .contact-content"
);

currentYear.textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
    revealObserver.observe(element);
});

function updateActiveNavigation() {
    let currentSectionId = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();


const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const navigationLinks = document.querySelectorAll('a[href^="#"]');

navigationLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});