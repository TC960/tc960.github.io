import React from "react";
import SiteLayout from "./SiteLayout";
import { researchPositions } from "../data/research";

const Research = () => (
  <SiteLayout>
    <section className="pt-20 sm:pt-28">
      <h1 className="text-[40px] leading-[1.08] sm:text-[54px]">Research</h1>
      <p className="mt-6 max-w-[58ch] text-[19px]">Undergraduate research at UC San Diego labs.</p>
    </section>

    {researchPositions.map((position) => (
      <article key={position.id} className="section">
        <div className="grid gap-x-8 gap-y-1 sm:grid-cols-[132px_1fr]">
          <p className="mono sm:pt-[9px]">{position.period}</p>
          <div>
            <h2 className="text-[28px]">{position.lab}</h2>
            <p className="italic text-site-ink">
              {position.type}, {position.institution}
            </p>
            {(position.pi || position.mentors) && (
              <p className="mono mt-1">
                {[position.pi && `PI: ${position.pi}`, position.mentors && `Mentor: ${position.mentors.join(", ")}`]
                  .filter(Boolean)
                  .join(" / ")}
              </p>
            )}
            <p className="mt-5 text-site-ink">{position.description}</p>
            {position.achievements.length > 0 && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] marker:text-site-muted">
                {position.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            )}
            <p className="mono mt-5">{position.tech.join(", ")}</p>
            {position.links?.length > 0 && (
              <p className="mt-3 flex flex-wrap gap-x-4 text-[16px]">
                {position.links.map(({ label, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="link">
                    {label}
                  </a>
                ))}
              </p>
            )}
          </div>
        </div>
      </article>
    ))}
  </SiteLayout>
);

export default Research;
