// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a.nav-link, a.btn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only apply smooth scrolling if the link has a hash
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;

            const targetElement = document.querySelector(hash);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Adjusted for navbar height

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close the navbar collapse on mobile after clicking
            const navbarToggler = document.querySelector('.hamburger');
            const navLinks = document.getElementById('nav-links');
            if (navbarToggler && navLinks.classList.contains('active')) {
                navbarToggler.click();
            }
        }
    });
});

// Form Submission Handling
const contactForm = document.querySelector('form');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(contactForm);
    
    // Convert formData to a format fetch can handle
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    fetch('https://formspree.io/f/mldedrgk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset(); 
        } else {
            alert('Oops! There was a problem with your submission. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again later.');
    });
});


// CV Modal Functionality
const cvModal = document.getElementById('cvModal');
const viewCVButton = document.querySelector('.view-cv');
const cvCloseButton = document.querySelector('#cvModal .btn-close');

// Open CV Modal when the View CV button is clicked
if (viewCVButton) {
    viewCVButton.addEventListener('click', (e) => {
        e.preventDefault();
        cvModal.style.display = 'block'; 
        cvModal.classList.add('show'); 
        
    });
}

// Close CV Modal when the close button is clicked
cvCloseButton.addEventListener('click', () => {
    closeCvModal();
});

// Close CV Modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === cvModal) {
        closeCvModal();
    }
});

// Function to close the CV Modal
function closeCvModal() {
    cvModal.classList.remove('show'); 
    cvModal.style.display = 'none'; 
    document.body.style.overflow = ''; 
    
}


// Video Modal Functionality
const modal = document.getElementById('videoModal');
const modalIframe = document.getElementById('modalIframe');
const closeBtn = document.querySelector('.close');
const viewDemoButtons = document.querySelectorAll('.view-demo-btn');

// Open Modal when View Demo button is clicked
viewDemoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const videoSrc = button.getAttribute('data-video');
        modalIframe.src = videoSrc; // Set the iframe src to Google Drive preview URL
        modal.style.display = 'flex'; // Show the modal
    });
});

// Close Modal when X is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalIframe.src = ''; // Reset iframe source when modal is closed
});

// Close Modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
        modalIframe.src = ''; // Reset iframe source
    }
});


// Initialize Radar Charts using Chart.js (existing code)
document.addEventListener('DOMContentLoaded', () => {
    // Function to create Radar Chart
    function createRadarChart(ctx, labels, data, label, bgColor, borderColor) {
        return new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                    pointBackgroundColor: borderColor,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: borderColor
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        },
                        pointLabels: {
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0; // Changed from context.parsed to context.raw
                                const proficiency = getProficiency(value);
                                return `${label}: ${value}% (${proficiency})`;
                            },
                            title: function(context) {
                                return context[0].dataset.label;
                            }
                        }
                    }
                }
            }
        });
    }

    // Helper function to determine proficiency level
    function getProficiency(value) {
        if (value >= 80) return 'Experienced';
        if (value >= 60) return 'Intermediate';
        return 'Beginner';
    }

    // Frontend Skills Radar Chart
    const frontendCtx = document.getElementById('frontendChart').getContext('2d');
    const frontendLabels = ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap'];
    const frontendData = [85, 80, 90, 70, 70]; // Updated expertise levels
    createRadarChart(
        frontendCtx,
        frontendLabels,
        frontendData,
        'Frontend Skills',
        'rgba(54, 162, 235, 0.2)', // Light Blue
        'rgba(54, 162, 235, 1)'    // Blue
    );

    // Backend Skills Radar Chart
    const backendCtx = document.getElementById('backendChart').getContext('2d');
    const backendLabels = ['Node.js', 'MongoDB', 'SQL', 'Python'];
    const backendData = [80, 85, 75, 50]; // Updated expertise levels
    createRadarChart(
        backendCtx,
        backendLabels,
        backendData,
        'Backend Skills',
        'rgba(153, 102, 255, 0.2)', // Light Purple
        'rgba(153, 102, 255, 1)'     // Purple
    );

    // Machine Learning Skills Radar Chart
    const mlCtx = document.getElementById('mlChart').getContext('2d');
    const mlLabels = ['Linear Regression', 'RandomForestClassifier', 'Convolutional Neural Networks', 'Transformer Models'];
    const mlData = [85, 80, 70, 70]; // Updated expertise levels
    createRadarChart(
        mlCtx,
        mlLabels,
        mlData,
        'Machine Learning Skills',
        'rgba(255, 159, 64, 0.2)', // Light Orange
        'rgba(255, 159, 64, 1)'     // Orange
    );

    // Overall Skills Radar Chart
    const overallCtx = document.getElementById('overallSkillsChart').getContext('2d');
    const overallLabels = [
        'HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap',
        'Node.js', 'MongoDB', 'SQL', 'Python',
        'Linear Regression', 'RandomForestClassifier',
        'Convolutional Neural Networks', 'Transformer Models'
    ];
    const overallData = [85, 80, 90, 70, 70, 80, 85, 75, 50, 85, 80, 70, 70]; // Combined expertise levels
    createRadarChart(
        overallCtx,
        overallLabels,
        overallData,
        'Overall Skill Proficiency',
        'rgba(75, 192, 192, 0.2)', // Light Teal
        'rgba(75, 192, 192, 1)'     // Teal
    );
});
