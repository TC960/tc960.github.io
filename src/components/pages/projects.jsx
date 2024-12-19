import React from "react";
import "./Projects.css"; // Ensure you have a CSS file for Projects styling

const Projects = () => {
  // Define an array of projects with title, description, and Devpost link
  const projects = [
    {
      title: "MUNCH",
      link: "https://devpost.com/software/munch-eyqji9"
    },
    {
      title: "coming soon...",
      link: "https://devpost.com/project2-link"
    },
    {
      title: "coming soon...",
      link: "https://devpost.com/project3-link"
    }
  ];

  return (
    <div className="projects-container">
      <div className="projects-grid">
        {projects.map((project, index) => (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="project-block"
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
