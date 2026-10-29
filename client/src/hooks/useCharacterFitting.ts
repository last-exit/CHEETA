import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  FITTING_CHARACTERS,
  fittingReducer,
  initialFittingState,
} from "@/lib/characterFitting";

const decoded = new Map<string, Promise<void>>();
function prepare(src: string) {
  if (decoded.has(src)) return decoded.get(src)!;
  const image = new Image();
  const promise = new Promise<void>((resolve, reject) => {
    image.onload = () => {
      void image.decode().then(resolve, reject);
    };
    image.onerror = () => reject(new Error("Fitting image unavailable"));
    image.src = src;
  }).catch(error => {
    decoded.delete(src);
    throw error;
  });
  decoded.set(src, promise);
  return promise;
}

export function useCharacterFitting() {
  const [state, dispatch] = useReducer(fittingReducer, initialFittingState);
  const section = useRef<HTMLDivElement>(null);
  const alive = useRef(true);
  const load = useCallback((index: number) => {
    const character = FITTING_CHARACTERS[index];
    const assets: string[] = [character.image];
    if (character.alphaMask) assets.push(character.alphaMask);
    void Promise.all(assets.map(prepare)).then(
      () => {
        if (alive.current) dispatch({ type: "ready", index });
      },
      () => {
        if (alive.current) dispatch({ type: "failed", index });
      }
    );
  }, []);
  useEffect(() => {
    alive.current = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        FITTING_CHARACTERS.forEach((_, index) => load(index));
        observer.disconnect();
      },
      { rootMargin: "500px" }
    );
    if (section.current) observer.observe(section.current);
    return () => {
      alive.current = false;
      observer.disconnect();
    };
  }, [load]);
  const selectCharacter = useCallback(
    (index: number) => {
      dispatch({ type: "character", index });
      load(index);
    },
    [load]
  );
  return { state, dispatch, section, selectCharacter };
}
