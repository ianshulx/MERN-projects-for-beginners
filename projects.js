// Please add your project details in the below array.
const projects = [
  {
    title: "Example",
    url: "https://github.com/ianshulx/MERN-projects-for-beginners/project-name ",
    description:
      "awesome project",
    imgSrc: "assets/mern.jpeg",
  },
  {
    title: "UrlShortner",
    url: "https://github.com/ianshulx/MERN-projects-for-beginners/tree/main-616/UrlShortner",
    description:
      "A URL shortening service that allows users to create shortened links for long URLs, track click statistics, and manage their links through a user-friendly interface.",
    imgSrc: "assets/urlcut.png",
  },
  {
    title: "Ai Code Review",
    url: "https://github.com/ianshulx/MERN-projects-for-beginners/tree/main-616/AI_Code_Review",
    description:
      "An AI-powered code review tool that analyzes code for potential issues, suggests improvements, and ensures adherence to coding standards, enhancing code quality and developer productivity.",
    imgSrc: "assets/aicode.png",
  },
  {
    title: "Ochi Web-Clone",
    url: "https://github.com/ianshulx/MERN-projects-for-beginners/tree/main-616/Ochi",
    description:
      "A React-based clone of the Ochi website, replicating its design and functionality to provide users with a similar browsing experience while showcasing React development skills.",
    imgSrc: "assets/ochi.png",
  },


    {
    title: "Imagify",
    url: "https://github.com/ianshulx/MERN-projects-for-beginners/tree/main-616/imagify",
    description:
      "**Imagify** – A MERN-based AI web app that converts text prompts into stunning, high-quality images using advanced text-to-image generation models.",
    imgSrc: "assets/imgtxt.png",
  },

    {
    title: "b2b workspace",
    url: "https://github.com/ianshulx/MERN-projects-for-beginners/tree/main-616/b2b-workspace-management/backend",
    description: "B2B Workspace – A MERN-based collaborative platform for businesses to manage projects, clients, and communications seamlessly in one unified dashboard.",
    imgSrc: "assets/b2b.png",
    },
    {
    title: "blog",
    url: "https://github.com/ianshulx/MERN-projects-for-beginners/tree/main-616/blog",
    description:
      "A full-stack blogging platform built with the MERN stack, allowing users to create, edit, and share blog posts, comment on articles, and manage their profiles.",
    imgSrc: "assets/blog.png",
    },
    {
    title: "Food_Delivery_App",
    url: "https://github.com/ianshulx/MERN-projects-for-beginners/tree/main-616/Food_Delivery_App ",
    description:
      "A MERN stack application for food delivery services, allowing users to browse restaurants, place orders, and track deliveries.",
    imgSrc: "assets/Fast_Food.svg",
  },



  
  
];

// Render all projects inside the container
const container = document.getElementById("projects-container");

// Enhanced rendering with staggered animation
function renderProjects(list) {
  container.innerHTML = ""; // clear existing
  list.forEach((project, index) => {
    const projectDiv = document.createElement("div");
    projectDiv.className =
      "col-md-3 mb-4 d-md-inline-block project-card-wrapper";
    projectDiv.setAttribute("data-aos", "fade-up");
    projectDiv.setAttribute("data-aos-delay", (index % 12) * 50);
    projectDiv.innerHTML = `
      <div class="custom-card text-center card-enhanced" data-bs-toggle="tooltip" data-bs-placement="top" title="${project.description}">
        <div class="card-body h-52 flex flex-col items-center justify-center md:ml-5 gap-5">
          <a href="${project.url}" target="_blank" class="project-link">
            <img src="${project.imgSrc}" class="card-img-top w-20 h-20 rounded-circle mx-auto d-block project-img" alt="React App" style="width: 85px; height:85px">
            <h5 class="card-title text-center mt-6 project-title">${project.title}</h5>
          </a>
        </div>
      </div>
    `;
    container.appendChild(projectDiv);
  });

  // Reinitialize tooltips if using Bootstrap
  if (typeof bootstrap !== "undefined") {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}

// Initially render all
renderProjects(projects);

// Update project count in intro section
const projectCount = document.getElementById("project-count");
if (projectCount) {
  projectCount.textContent = projects.length + "+";
}

// Enhanced search functionality with debouncing
const searchInput = document.getElementById("project-search-input");
const clearBtn = document.getElementById("project-clear-btn");
let searchTimeout;

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = searchInput.value.toLowerCase();
    const filtered = projects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    renderProjects(filtered);
  }, 300); // Debounce delay
});

// Clear button functionality
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  renderProjects(projects);
  searchInput.focus();
});

// Add CSS for enhanced project cards
const style = document.createElement("style");
style.textContent = `
  .project-card-wrapper {
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .card-enhanced {
    position: relative;
    overflow: hidden;
  }
  
  .card-enhanced::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(86, 221, 205, 0.1),
      transparent
    );
    transform: rotate(45deg);
    transition: all 0.5s;
  }
  
  .card-enhanced:hover::before {
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }
  
  .project-img {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }
  
  .card-enhanced:hover .project-img {
    transform: scale(1.15) rotate(5deg);
    filter: drop-shadow(0 8px 16px rgba(86, 221, 205, 0.4));
  }
  
  .project-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: #aeeafc;
    transition: all 0.3s ease;
  }
  
  .card-enhanced:hover .project-title {
    color: #56ddcd;
    transform: translateY(-2px);
  }
  
  .project-link {
    text-decoration: none;
    display: block;
    transition: transform 0.3s ease;
  }
`;
document.head.appendChild(style);
