document.addEventListener("DOMContentLoaded", function () {
    const experienceButtons = document.querySelectorAll(".experience-btn");
    const projectTabs = document.querySelectorAll(".project-tab");
    const experienceDetails = document.getElementById("experience-details");
    const projectDetails = document.getElementById("project-details");
    const contactForm = document.getElementById('contact');
    const thankYouMessage = document.getElementById('thank-you');
    const nav = document.querySelector('nav');
    const featuredButton = document.getElementById("featured-projects-button");
    const allButton = document.getElementById("all-projects-button");
    const featuredProjects = document.getElementById("featured-projects");
    const allProjects = document.getElementById("all-projects");

    const experiences = {
        tcs: `
            <div>
                <h3>Software Engineer</h3>
                    <h4>Remote, USA | Aug 2023 – May 2024</h4>
                <ul>
                    <li>Developed a scalable e-commerce platform using Python-based microservices with Django and FastAPI, enhancing the user experience through dynamic frontend components with React.js.</li>
                    <li>Created a responsive and interactive UI using HTML, CSS, and JavaScript, and streamlined CI/CD processes with Jenkins for automated builds, tests, and deployments.</li>
                    <li>Featured robust search function, personalized product recommendations, and payment integration, increasing user engagement by 30% and reducing development time by 40% through automation.</li>
                    <li>Leveraged Docker containerization with AWS Elastic Container Service (ECS) and AWS Fargate, achieving a 50% reduction in infrastructure costs.</li>
                    <li>Implemented Agile methodologies, enhancing defect management and project delivery efficiency by 70%, while boosting e-commerce sales by 40%.</li>
                </ul>
            </div>
        `,
        maxgen: `
            <div>
                <h3>Software Engineer</h3>
                <h4>Remote, India | Mar 2021 – July 2022</h4>
                <ul>
                    <li>Developed high-performance education system applications using Python, Django and React to deliver efficient, scalable solutions.</li>
                    <li>Optimized database performance by integrating educational databases using SQLAlchemy, achieving a 15% improvement in query performance and a 10% reduction in database issues.</li>
                    <li>Automated data processing workflows by implementing AWS S3 event notifications and triggers within the education platform, achieving a 50% reduction in manual intervention. </li>
                    <li>Conducted extensive unit testing with PyTest, achieving a 95% test coverage rate to minimize post-release defects.</li>
                    <li>Utilized RESTful APIs to update the student management system and ensured better information flow.</li>
                    <li>Employed AWS CloudWatch for real-time monitoring of student activities and Docker containers to create a consistent and isolated development environment for ETL pipelines used within the education system.</li>
                </ul>
            </div>
        `,
        alliant: `
            <div>
                <h3>Software Developer Intern</h3>
                <h4>Indore, India | May 2020 – Oct 2020</h4>
                <ul>
                    <li>Collaborated with the development team to build a mobile application using Android Studio and Kotlin that empowered users to achieve their goals, increasing overall productivity by up to 30%.</li>
                    <li>Developed and optimized API endpoints to facilitate seamless communication between front-end and back-end systems, reducing response times by 20% and elevating user experience.</li>
                    <li>Analyzed changes in user productivity using Power BI.</li>
                </ul>
            </div>
        `
    };

    featuredButton.addEventListener("click", function () {
        featuredButton.classList.add("active");
        allButton.classList.remove("active");
        featuredProjects.style.display = "grid";
        allProjects.style.display = "none";
    });

    allButton.addEventListener("click", function () {
        allButton.classList.add("active");
        featuredButton.classList.remove("active");
        featuredProjects.style.display = "none";
        allProjects.style.display = "grid";
    });

    

    featuredButton.click();

    function updateExperienceDetails(experience) {
        experienceDetails.innerHTML = experiences[experience] || "";
        experienceButtons.forEach(button => {
            button.classList.toggle("active", button.getAttribute("data-experience") === experience);
        });
    }

    function updateProjectDetails(project) {
        projectDetails.innerHTML = projects[project] || "";
        projectTabs.forEach(tab => {
            tab.classList.toggle("active", tab.getAttribute("data-project") === project);
        });
    }

    experienceButtons.forEach(button => {
        button.addEventListener("click", () => {
            const experience = button.getAttribute("data-experience");
            updateExperienceDetails(experience);
        });
    });

    projectTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const project = tab.getAttribute("data-project");
            updateProjectDetails(project);
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        contactForm.querySelectorAll('input, textarea').forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                valid = false;
            } else {
                input.style.borderColor = '#ccc';
            }
        });

        if (valid) {
            contactForm.style.display = 'none';
            thankYouMessage.style.display = 'block';
        }
    });

    // Load default experience and project details and highlight default buttons
    const defaultExperience = "tcs";
    const defaultProject = "featured";
    
    updateExperienceDetails(defaultExperience); // Default experience
    updateProjectDetails(defaultProject); // Default project

    // Adjust nav margin for scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
        nav.style.marginRight = `${scrollbarWidth}px`;
    }
});

document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = '#222';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = '#333';
        header.style.boxShadow = 'none';
    }
});

document.getElementById('contact').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    var form = event.target;
    var formData = new FormData(form);

    fetch('https://formspree.io/f/xgvwyzog', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Replace the entire connect-container div with the thank-you message
            document.querySelector('.connect-container').style.display = 'none';
            document.getElementById('formResponse').style.display = 'flex';
        } else {
            document.getElementById('formResponse').innerHTML = "<p>Oops! There was a problem sending your message. Please try again later.</p>";
            document.getElementById('formResponse').style.display = 'flex';
        }
    }).catch(error => {
        document.getElementById('formResponse').innerHTML = "<p>Oops! There was a problem sending your message. Please try again later.</p>";
        document.getElementById('formResponse').style.display = 'flex';
    });
});
