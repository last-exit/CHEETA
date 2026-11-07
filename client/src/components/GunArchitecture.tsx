import { useId } from "react";
import "./GunArchitecture.css";

/** One softly projected palace arch, shared by every white area of the page. */
export default function GunArchitecture() {
  const id = useId().replace(/:/g, "");
  return (
    <div className="gun-architecture" aria-hidden="true">
      <svg
        className="gun-architecture-light"
        viewBox="0 0 1000 1200"
        fill="none"
        focusable="false"
      >
        <defs>
          <filter
            id={`${id}-soft`}
            x="-30%"
            y="-20%"
            width="160%"
            height="150%"
          >
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter
            id={`${id}-penumbra`}
            x="-30%"
            y="-20%"
            width="160%"
            height="150%"
          >
            <feGaussianBlur stdDeviation="24" />
          </filter>
        </defs>
        <g fill="#77674F">
          <path
            d="M198 1240V510C198 451 220 417 254 389C213 358 230 304 271 297C248 244 295 200 340 215C328 162 391 128 430 153C449 109 478 79 500 50C522 79 551 109 570 153C609 128 672 162 660 215C705 200 752 244 729 297C770 304 787 358 746 389C780 417 802 451 802 510V1240H198Z
               M290 1240H710V520C710 480 695 450 660 423C701 397 686 352 646 347C672 305 630 267 590 284C609 238 559 208 534 232C527 191 510 169 500 154C490 169 473 191 466 232C441 208 391 238 410 284C370 267 328 305 354 347C314 352 299 397 340 423C305 450 290 480 290 520V1240Z"
            fillRule="evenodd"
            opacity="0.16"
            filter={`url(#${id}-soft)`}
          />
          <path
            d="M840 -100H1100V1300H745C770 1020 792 756 822 496C848 272 859 70 840 -100Z"
            opacity="0.045"
            filter={`url(#${id}-penumbra)`}
          />
        </g>
      </svg>
    </div>
  );
}
