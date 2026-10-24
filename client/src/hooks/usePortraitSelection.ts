import { useCallback, useEffect, useRef, useState } from "react";

const portraits = new Map<string, Promise<void>>();
function decodePortrait(src: string) {
  const existing = portraits.get(src);
  if (existing) return existing;
  const image = new Image();
  const ready = new Promise<void>((resolve, reject) => {
    image.onload = () => {
      image.decode().then(resolve, reject);
    };
    image.onerror = () => reject(new Error("Portrait unavailable"));
    image.src = src;
  }).catch(error => {
    portraits.delete(src);
    throw error;
  });
  portraits.set(src, ready);
  return ready;
}

/** Commit the portrait and its purchase identity together; stale requests never win. */
export function usePortraitSelection(sources: string[]) {
  const [index, setIndex] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const request = useRef(0);
  const sourcesRef = useRef(sources);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        sourcesRef.current.forEach(src => {
          void decodePortrait(src).catch(() => {});
        });
        observer.disconnect();
      },
      { rootMargin: "500px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      request.current += 1;
      observer.disconnect();
    };
  }, []);
  const select = useCallback(async (next: number) => {
    const token = ++request.current;
    setPending(true);
    setError("");
    try {
      await decodePortrait(sourcesRef.current[next]);
      if (token !== request.current) return;
      setIndex(next);
    } catch {
      if (token === request.current)
        setError("portrait unavailable; please try again");
    } finally {
      if (token === request.current) setPending(false);
    }
  }, []);
  return { index, pending, error, select, sectionRef };
}
