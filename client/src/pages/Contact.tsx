import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { InformationFooter } from "@/components/HouseFooter";
import { productForSlug } from "@/data/retailCatalog";
import {
  CHEETA_EMAIL,
  CHEETA_PHONE_DISPLAY,
  CHEETA_PHONE_HREF,
  SHOWROOM_COLLECTIONS,
  cheetaEmailLink,
  contactTopic,
} from "@/lib/cheetaContact";
import "./Contact.css";

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );
  const [search] = useSearchParams();
  const collection = search.get("collection");
  const showroom =
    collection === "barrel" || collection === "masquerade"
      ? SHOWROOM_COLLECTIONS[collection]
      : undefined;
  const interest = search.get("interest");
  const topic = contactTopic(interest);
  const product =
    interest === "retail"
      ? productForSlug(search.get("piece") ?? undefined)
      : undefined;
  const piece =
    product?.availability === "preview" || product?.availability === "retail"
      ? product
      : undefined;
  const title = showroom?.piece ?? piece?.name ?? topic?.title ?? "Contact";
  const email = showroom
    ? cheetaEmailLink(
        `Showroom visit for ${showroom.piece}`,
        `Hello Cheeta Jewels,\n\nI’d like to arrange a showroom visit for ${showroom.name}.\n\nPreferred dates or times:\nName:`
      )
    : piece
      ? cheetaEmailLink(
          `Retail enquiry about ${piece.name}`,
          `Hello Cheeta Jewels,\n\nI’d like to know more about the ${piece.name}.\n\n`
        )
      : topic
        ? cheetaEmailLink(topic.subject, `Hello Cheeta Jewels,\n\n${topic.message}`)
        : `mailto:${CHEETA_EMAIL}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CHEETA_EMAIL);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <main className="contact-page">
      <CheetahBar />
      <HeaderWordmark />
      <div className="contact-content house-container">
        <header>
          <p className="house-kicker">The house</p>
          <h1>{title}</h1>
          {showroom && (
            <p>
              To arrange a showroom visit for {showroom.name}, email us with
              your preferred dates or give us a call.
            </p>
          )}
        </header>
        <div className="contact-actions">
          <div className="contact-email-row">
            <a href={email} className="contact-email">
              {CHEETA_EMAIL}
              <ArrowUpRight size={16} strokeWidth={1.25} aria-hidden="true" />
            </a>
            <button type="button" className="contact-copy" onClick={copyEmail}>
              Copy email
            </button>
          </div>
          <span className="contact-copy-status" role="status">
            {copyStatus === "copied" && "Email address copied."}
            {copyStatus === "failed" && "Select the address above to copy it."}
          </span>
          <a href={CHEETA_PHONE_HREF}>{CHEETA_PHONE_DISPLAY}</a>
        </div>
        {!showroom && !topic && (
          <nav
            className="contact-showroom-links"
            aria-label="Showroom enquiries"
          >
            <h2>Showroom visits</h2>
            <Link href="/contact?collection=barrel">The Gun Collection</Link>
            <Link href="/contact?collection=masquerade">The Masquerade</Link>
          </nav>
        )}
      </div>
      <InformationFooter />
    </main>
  );
}
