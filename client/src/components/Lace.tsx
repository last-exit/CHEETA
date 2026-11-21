/**
 * The pierced, scalloped paper edge that joins one room of the house to the
 * next, like the lace bands between the sections of an album or invitation.
 * `hang="down"` hangs it from the top of a section; `hang="up"` raises it
 * from the top edge of a paper section into the room above.
 */
export default function Lace({ hang, className = "" }: { hang: "down" | "up"; className?: string }) {
  return <span className={`lace lace-${hang} ${className}`.trim()} aria-hidden="true" />;
}
