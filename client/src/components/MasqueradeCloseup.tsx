import { CampaignPhotograph } from "@/components/CampaignEditorial";
import { useCampaignFlow } from "@/hooks/useCampaignFlow";
import "./MasqueradeCloseup.css";

/** A photographic examination of the campaign frame, distinct from the 3D study. */
export default function MasqueradeCloseup({
  inspect,
}: {
  inspect: () => void;
}) {
  const section = useCampaignFlow<HTMLElement>();
  return (
    <section
      ref={section}
      className="masquerade-closeup"
      data-campaign-chapter="the-openwork"
      aria-labelledby="masquerade-closeup-title"
    >
      <div className="masquerade-closeup-copy house-container">
        <h2 id="masquerade-closeup-title">
          The <em>openwork.</em>
        </h2>
        <p>
          The frame extends past the lenses, tracing the outline of a mask. Open
          spaces let the light through, revealing the shape of the frame against
          the face.
        </p>
      </div>
      <figure className="masquerade-closeup-image house-container">
        <CampaignPhotograph
          src="/stills/masquerade-still-4.jpg"
          alt="A close view of the dark lenses and openwork surrounding the Masquerade frame"
          width={1920}
          height={1080}
          label="View The Masquerade openwork photograph"
          inspect={inspect}
        />
      </figure>
    </section>
  );
}
