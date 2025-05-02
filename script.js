// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
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

// Animate skill bars when in viewport
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate skills when scrolled into view
window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills');
    if (isInViewport(skillsSection)) {
        animateSkills();
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Build Gmail compose link
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=tanyeefong20040921@gmail.com`
            + `&su=${encodeURIComponent(subject)}`
            + `&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;

        // Open Gmail compose window
        window.open(gmailLink, '_blank');
        
        // Optionally reset form
        contactForm.reset();
    });
}

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if skills section is already in viewport on page load
    const skillsSection = document.querySelector('.skills');
    if (isInViewport(skillsSection)) {
        animateSkills();
    }
});

// Education Timeline Animation - Top to Bottom
document.addEventListener('DOMContentLoaded', function() {
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineContainer = document.querySelector('.timeline-container');
    const educationSection = document.querySelector('.education');
    
    // Function to check if an element is in viewport
    function isElementVisible(el, offset = 0) {
        if (!el) return false;
        
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Check if element is partially visible
        return (
            (rect.top + offset <= windowHeight && rect.top >= -rect.height) ||
            (rect.bottom >= 0 && rect.bottom <= windowHeight + rect.height)
        );
    }
    
    // Function to calculate how much of the timeline should be filled
    function calculateTimelineProgress() {
        if (!timelineContainer || !educationSection) return 0;
        
        // Get the positions of the timeline container
        const containerRect = timelineContainer.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the timeline should be filled based on scroll position
        let progress = 0;
        
        if (containerTop <= windowHeight && containerTop + containerHeight >= 0) {
            // Calculate how far we've scrolled into the section
            const scrolledDistance = Math.min(windowHeight, windowHeight - containerTop);
            const totalDistance = Math.min(windowHeight, containerHeight);
            
            progress = Math.min(1, scrolledDistance / totalDistance);
        } else if (containerTop + containerHeight < 0) {
            // We've scrolled past the section
            progress = 1;
        }
        
        return progress;
    }
    
    // Function to update timeline progress and active items
    function updateTimeline() {
        if (!isElementVisible(educationSection, -100)) return;
        
        // Update the progress line
        const progress = calculateTimelineProgress();
        timelineProgress.style.transform = `scaleY(${progress})`;
        
        // Update active state for timeline items
        timelineItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const itemTop = itemRect.top;
            const windowHeight = window.innerHeight;
            
            // Activate the item when it's in the viewport
            if (itemTop < windowHeight - 100) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Initial update
    setTimeout(updateTimeline, 100);
    
    // Update on scroll
    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
});