import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { InformationFooter } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { useEditorialMotion } from "@/hooks/useEditorialMotion";
import "./Hayrat.css";

export default function Hayrat() {
  const page = useRef<HTMLElement>(null);
  useEditorialMotion(page);

  return (
    <main ref={page} className="hayrat-page">
      <CheetahBar />
      <HeaderWordmark />

      <section
        className="hayrat-viewing house-container"
        aria-labelledby="hayrat-title"
      >
        <div className="hayrat-introduction">
          <header>
            <h1 id="hayrat-title" className="sr-only">
              Hayrat
            </h1>
            <div className="hayrat-signature">
              <img
                className="hayrat-logo"
                src="/hayrat/hayrat-logo.png"
                alt="Hayrat, fine gems & arts"
                width="1024"
                height="1020"
              />
            </div>
            <div className="hayrat-note">
              <p>
                From sculpted masks to the openwork eyewear of The Masquerade.
              </p>
            </div>
          </header>
        </div>

        <div
          className="hayrat-gallery"
          role="group"
          aria-label="Mask photographs"
        >
          <figure className="hayrat-artwork">
            <img
              src="/hayrat/hayrat-antique-1.jpg"
              alt="A dark sculpted mask with gold eyes against a terracotta wall"
              width="589"
              height="1280"
              fetchPriority="high"
              decoding="async"
              data-editorial-camera
            />
          </figure>
          <figure className="hayrat-artwork">
            <img
              src="/hayrat/hayrat-antique-2.jpg"
              alt="A bronze-toned mask with a deeply sculpted brow and an open mouth"
              width="589"
              height="1280"
              decoding="async"
              data-editorial-camera
            />
          </figure>
        </div>
      </section>

      <div className="hayrat-continuation house-container">
        <Link href="/collection/masquerade" className="hayrat-next">
          <span>The Masquerade</span>
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.25} />
        </Link>
      </div>
      <InformationFooter />
    </main>
  );
}
