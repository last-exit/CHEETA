import Ornament from "./Ornament";

/**
 * The house crest: a hunting cheetah in its red court collar, from an
 * Udaipur painting of about 1710, running along the house's rosette vine.
 */
export default function CheetahCrest({ className = "" }: { className?: string }) {
  return (
    <span className={`cheetah-crest ${className}`.trim()} aria-hidden="true">
      <img src="/mughal/cheetah.webp" alt="" width="625" height="206" loading="lazy" decoding="async" />
      <Ornament className="cheetah-crest-vine" />
    </span>
  );
}
