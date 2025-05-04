const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.padding = '20px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills');
    if (isInViewport(skillsSection)) {
        animateSkills();
    }
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=tanyeefong20040921@gmail.com`
            + `&su=${encodeURIComponent(subject)}`
            + `&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;

        window.open(gmailLink, '_blank');

        contactForm.reset();
    });
}

document.getElementById('currentYear').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('.skills');
    if (isInViewport(skillsSection)) {
        animateSkills();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineContainer = document.querySelector('.timeline-container');
    const educationSection = document.querySelector('.education');

    function isElementVisible(el, offset = 0) {
        if (!el) return false;
        
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        return (
            (rect.top + offset <= windowHeight && rect.top >= -rect.height) ||
            (rect.bottom >= 0 && rect.bottom <= windowHeight + rect.height)
        );
    }

    function calculateTimelineProgress() {
        if (!timelineContainer || !educationSection) return 0;

        const containerRect = timelineContainer.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;

        let progress = 0;
        
        if (containerTop <= windowHeight && containerTop + containerHeight >= 0) {
            const scrolledDistance = Math.min(windowHeight, windowHeight - containerTop);
            const totalDistance = Math.min(windowHeight, containerHeight);
            
            progress = Math.min(1, scrolledDistance / totalDistance);
        } else if (containerTop + containerHeight < 0) {
            progress = 1;
        }
        
        return progress;
    }
    
    function updateTimeline() {
        if (!isElementVisible(educationSection, -100)) return;

        const progress = calculateTimelineProgress();
        timelineProgress.style.transform = `scaleY(${progress})`;

        timelineItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const itemTop = itemRect.top;
            const windowHeight = window.innerHeight;

            if (itemTop < windowHeight - 100) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    setTimeout(updateTimeline, 100);
    
    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
});