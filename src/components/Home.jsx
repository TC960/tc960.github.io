import React from "react";
import { Link } from "react-router-dom";
import SiteLayout from "./SiteLayout";
import ProjectItem from "./ProjectItem";
import Intro from "./Intro";
import projects from "../data/projects.json";
import { experience } from "../data/experience";

const FEATURED = ["rtms-biomarker-replication", "trickle", "few-words", "clueless", "winnow", "taxdaddy"];

const WRITING = [
  {
    href: "/writing/rtms-replication/",
    title: "Replicating an rTMS biomarker, and catching a circular result",
    date: "2026",
    summary:
      "A widely cited connectivity biomarker for rTMS response in depression doesn't replicate, and the dataset's best-looking accuracy comes from circular feature selection.",
  },
];

// Splits a paragraph into its first sentence and the rest, so long
// descriptions show one line by default. Skips abbreviations like "Prof.".
const splitFirstSentence = (text) => {
  const match = text.match(/^(.+?(?<!\b(?:Prof|Dr|vs|e\.g|i\.e))[.!?])\s+(?=[A-Z])/);
  if (!match) return [text, ""];
  return [match[1], text.slice(match[0].length)];
};

const Description = ({ text }) => {
  const [first, rest] = splitFirstSentence(text);
  return (
    <>
      <p className="mt-1">{first}</p>
      {rest && (
        <details className="more">
          <summary />
          <p className="mt-2 text-[17px]">{rest}</p>
        </details>
      )}
    </>
  );
};

const ExperienceItem = ({ item }) => (
  <li className="entry">
    <p className="mono">{item.date}</p>
    <div>
      {item.roles ? (
        <>
          <h3 className="entry-title">{item.company}</h3>
          <ul className="mt-2 space-y-4">
            {item.roles.map((role) => (
              <li key={role.title}>
                <p className="text-site-ink">
                  <span className="italic">{role.title}</span>
                  <span className="mono ml-2">{role.date}</span>
                </p>
                <Description text={role.description} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h3 className="entry-title">{item.title}</h3>
          <p className="italic text-site-ink">{item.company}</p>
          <Description text={item.description} />
        </>
      )}
    </div>
  </li>
);

const Home = () => {
  const featured = FEATURED.map((id) => projects.find((p) => p.id === id)).filter(Boolean);

  return (
    <>
    <Intro />
    <SiteLayout backdrop={false}>
      <section className="pt-20 sm:pt-28">
        <p className="mono">Data Science &amp; Cognitive Science, UC San Diego</p>
        <h1 className="mt-4 max-w-[16ch] text-[40px] leading-[1.08] sm:text-[54px]">
          I build machine learning systems and <span className="italic">research tools.</span>
        </h1>
        <div className="mt-8 max-w-[58ch] space-y-4 text-[19px]">
          <p>
            I'm Mohak, a Data Science student at UC San Diego with a Cognitive Science double
            major in progress. I'm an avid researcher, builder, and hackathoner.
          </p>
          <p>
            Right now I'm most excited about where neuroscience meets AI: translating EMG
            signals into speech, classifying emotion from EEG, and checking whether published
            brain biomarkers hold up.
          </p>
        </div>
      </section>

      <section id="experience" className="section">
        <h2 className="section-title">Experience</h2>
        <ul>
          {experience.map((item) => (
            <ExperienceItem key={`${item.company}-${item.date}`} item={item} />
          ))}
        </ul>
      </section>

      <section id="projects" className="section">
        <h2 className="section-title">Selected projects</h2>
        <ul>
          {featured.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </ul>
        <p className="mt-4 sm:pl-[164px]">
          <Link to="/projects" className="link">
            All {projects.length} projects
          </Link>
        </p>
      </section>

      <section id="writing" className="section">
        <h2 className="section-title">Writing</h2>
        <ul>
          {WRITING.map((post) => (
            <li key={post.href} className="entry">
              <p className="mono">{post.date}</p>
              <div>
                <h3 className="entry-title">
                  <a href={post.href} className="hover:text-site-accent">
                    {post.title}
                  </a>
                </h3>
                <p className="mt-1">{post.summary}</p>
                <p className="mt-2 text-[16px]">
                  <a href={post.href} className="link">
                    Read the case study
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
    </>
  );
};

export default Home;
