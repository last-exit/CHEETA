import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { InformationLinks } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import "./Hayrat.css";

export default function Hayrat() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="hayrat-page">
      <CheetahBar dark={false} />
      <HeaderWordmark dark={false} />

      <section className="hayrat-viewing" aria-labelledby="hayrat-title">
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
          </header>
        </div>

        <div
          className="hayrat-gallery"
          role="group"
          aria-label="Masks from Hayrat"
        >
          <figure className="hayrat-artwork">
            <img
              src="/hayrat/hayrat-antique-1.jpg"
              alt="A dark sculpted mask with gold eyes against a terracotta wall"
              width="589"
              height="1280"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
          <figure className="hayrat-artwork">
            <img
              src="/hayrat/hayrat-antique-2.jpg"
              alt="A bronze-toned mask with a deeply sculpted brow and an open mouth"
              width="589"
              height="1280"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <footer className="hayrat-continuation">
        <Link href="/collection/masquerade" className="hayrat-next">
          <span>The masquerade</span>
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.25} />
        </Link>
        <div className="mt-8 flex justify-center">
          <InformationLinks />
        </div>
      </footer>
    </main>
  );
}
