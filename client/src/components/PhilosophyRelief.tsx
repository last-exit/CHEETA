/** Static, non-repeating relief behind the Philosophy opening. */
export default function PhilosophyRelief() {
  return (
    <div className="philosophy-relief" aria-hidden="true">
      <svg viewBox="0 0 800 1000" fill="none" focusable="false">
        <defs>
          <linearGradient
            id="philosophy-relief-face"
            x1="180"
            y1="420"
            x2="780"
            y2="600"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fafaf7" stopOpacity="0" />
            <stop offset="0.48" stopColor="#e3e6df" />
            <stop offset="0.76" stopColor="#f5f5f0" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient
            id="philosophy-relief-light"
            x1="400"
            y1="480"
            x2="700"
            y2="500"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.65" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter
            id="philosophy-relief-soften"
            x="-40%"
            y="-30%"
            width="180%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        <path
          d="M750-160C260 80 810 170 420 460C180 650 430 900 880 1090L1100 1090C600 660 780 590 790 390C800 160 580 30 1000-120Z"
          fill="url(#philosophy-relief-face)"
          filter="url(#philosophy-relief-soften)"
        />
        <path
          d="M800-160C330 90 860 190 500 490C290 670 520 900 970 1090L1110 1090C670 730 780 610 820 440C890 170 650 50 1070-120Z"
          fill="url(#philosophy-relief-light)"
        />
      </svg>
    </div>
  );
}
