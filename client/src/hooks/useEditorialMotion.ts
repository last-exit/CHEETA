import { useEffect, type RefObject } from "react";

/** Scoped ScrollTrigger compositions; layout is readable before the motion chunk loads. */
export function useEditorialMotion(
  root: RefObject<HTMLElement | null>,
  scopeKey: string | false = ""
) {
  useEffect(() => {
    const host = root.current;
    if (!host || scopeKey === false) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        let frame = 0;
        const refresh = () => {
          if (frame || cancelled) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            ScrollTrigger.refresh();
          });
        };
        dispose = () => {
          cancelAnimationFrame(frame);
          host.removeEventListener("load", refresh, true);
          media.revert();
        };
        media.add(
          {
            motion: "(prefers-reduced-motion: no-preference)",
            desktop: "(min-width: 1024px)",
          },
          context => {
            if (!context.conditions?.motion) return;
            const scope = gsap.context(() => {
              host
                .querySelectorAll<HTMLElement>("[data-editorial-camera]")
                .forEach(image => {
                  gsap.fromTo(
                    image,
                    { scale: 1.12, yPercent: 4 },
                    {
                      scale: 1,
                      yPercent: 0,
                      ease: "none",
                      scrollTrigger: {
                        trigger: image.parentElement,
                        start: "top bottom",
                        end: "top 30%",
                        scrub: 0.45,
                      },
                    }
                  );
                });
              host
                .querySelectorAll<HTMLElement>("[data-editorial-reveal]")
                .forEach(group => {
                  if (group.getBoundingClientRect().bottom < 0) return;
                  gsap.fromTo(
                    Array.from(group.children),
                    { opacity: 0, y: 24 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.9,
                      stagger: 0.1,
                      ease: "power3.out",
                      scrollTrigger: {
                        trigger: group,
                        start: "top 90%",
                        once: true,
                      },
                    }
                  );
                });
              if (context.conditions?.desktop) {
                host
                  .querySelectorAll<HTMLElement>("[data-editorial-drift]")
                  .forEach(image => {
                    gsap.fromTo(
                      image,
                      { y: 20 },
                      {
                        y: -16,
                        ease: "none",
                        scrollTrigger: {
                          trigger: image.parentElement,
                          start: "top bottom",
                          end: "bottom top",
                          scrub: 0.7,
                        },
                      }
                    );
                  });
              }
            }, host);
            return () => scope.revert();
          }
        );
        host.addEventListener("load", refresh, true);
        void document.fonts.ready.then(refresh);
      })
      .catch(() => {
        // A motion-chunk failure leaves visible content and ordinary page flow.
        dispose?.();
        dispose = undefined;
      });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [root, scopeKey]);
}
