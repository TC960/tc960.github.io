import React, { useState } from "react";
import SiteLayout from "./SiteLayout";
import ProjectItem from "./ProjectItem";
import projects from "../data/projects.json";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "ml", label: "ML" },
  { key: "research", label: "Research" },
  { key: "fullstack", label: "Full-stack" },
  { key: "nlp", label: "NLP" },
  { key: "data", label: "Data" },
];

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const shown = projects
    .filter((p) => filter === "all" || p.category.includes(filter))
    .sort((a, b) => b.year - a.year);

  return (
    <SiteLayout>
      <section className="pt-20 sm:pt-28">
        <h1 className="text-[40px] leading-[1.08] sm:text-[54px]">Projects</h1>
        <p className="mt-6 max-w-[58ch] text-[19px]">
          Hackathon builds, research, and class projects, newest first.
        </p>
      </section>

      <div
        className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-b border-site-rule pb-4 font-mono text-[13px]"
        role="group"
        aria-label="Filter projects"
      >
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
            className={
              filter === key
                ? "text-site-accent underline decoration-1 underline-offset-4"
                : "text-site-muted hover:text-site-accent"
            }
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="mt-4">
        {shown.map((project) => (
          <ProjectItem key={project.id} project={project} expandable />
        ))}
      </ul>
    </SiteLayout>
  );
};

export default Projects;
