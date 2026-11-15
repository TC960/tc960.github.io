import React from "react";

const LINK_LABELS = {
  blog: "Write-up",
  code: "Code",
  demo: "Demo",
  devpost: "Devpost",
  paper: "Paper",
  research: "Research",
  analysis: "Analysis",
  design: "Design",
};

// projects.json awards carry a trophy emoji prefix; the plain text reads cleaner.
const cleanAward = (award) => award?.replace(/^\W+\s*/u, "");

const usableLinks = (links = {}) =>
  Object.entries(links).filter(([, url]) => url && (url.startsWith("http") || url.startsWith("/")));

// One project row: year on the left, details on the right.
// `expandable` adds the long description behind a More toggle.
const ProjectItem = ({ project, expandable = false }) => {
  const links = usableLinks(project.links);
  const award = cleanAward(project.award);

  return (
    <li className="entry">
      <p className="mono">{project.year}</p>
      <div>
        <h3 className="entry-title">
          {project.title}
          {award && <span className="ml-2 text-[17px] italic font-normal text-site-muted">{award}</span>}
        </h3>
        <p className="mt-1">{project.description}</p>
        {expandable && project.fullDescription && (
          <details className="more">
            <summary />
            <p className="mt-2 text-[17px]">{project.fullDescription}</p>
            {project.tech?.length > 0 && <p className="mono mt-2">{project.tech.join(", ")}</p>}
          </details>
        )}
        {links.length > 0 && (
          <p className="mt-2 flex flex-wrap gap-x-4 text-[16px]">
            {links.map(([type, url]) => (
              <a
                key={type}
                href={url}
                target={url.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="link"
              >
                {LINK_LABELS[type] ?? type}
              </a>
            ))}
          </p>
        )}
      </div>
    </li>
  );
};

export default ProjectItem;
