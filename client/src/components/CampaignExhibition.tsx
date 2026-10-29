import type { ReactNode } from "react";
import "./CampaignExhibition.css";

export function ExhibitionCover({
  title,
  lead,
  name,
}: {
  title: string;
  lead: string;
  name: string;
}) {
  return (
    <header
      className="exhibition-cover house-container"
      data-campaign-chapter="introduction"
    >
      <h1 aria-label={title}>
        <span className="exhibition-cover-lead" aria-hidden="true">
          {lead}
        </span>
        <span className="exhibition-cover-name" aria-hidden="true">
          {name}
        </span>
      </h1>
    </header>
  );
}

export function ExhibitionPassage({
  children,
  chapter,
  lead = false,
}: {
  children: ReactNode;
  chapter: string;
  lead?: boolean;
}) {
  return (
    <section
      className={
        "exhibition-passage house-container" +
        (lead ? " exhibition-prologue" : "")
      }
      data-campaign-chapter={chapter}
    >
      <p>{children}</p>
    </section>
  );
}

export function ExhibitionEssay({
  title,
  children,
  chapter,
}: {
  title: string;
  children: ReactNode;
  chapter: string;
}) {
  return (
    <section
      className="exhibition-essay house-container"
      data-campaign-chapter={chapter}
    >
      <h2>{title}</h2>
      <div className="exhibition-essay-copy">{children}</div>
    </section>
  );
}
