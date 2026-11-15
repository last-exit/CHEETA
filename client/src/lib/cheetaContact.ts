export const CHEETA_EMAIL = "mohammadfazalhaque@gmail.com";
export const CHEETA_PHONE_DISPLAY = "+971 52 803 8612";
export const CHEETA_PHONE_HREF = "tel:+971528038612";

export const SHOWROOM_COLLECTIONS = {
  barrel: { name: "The Gun Collection", piece: "Maharajah" },
  masquerade: { name: "The Masquerade", piece: "The Masquerade" },
} as const;

export type ShowroomCollection = keyof typeof SHOWROOM_COLLECTIONS;

export const CONTACT_TOPICS = {
  retail: {
    title: "Retail enquiries",
    subject: "Retail enquiry",
    message: "I’d like to know more about the Retail range.",
  },
  care: {
    title: "Care enquiries",
    subject: "Care enquiry",
    message: "I’d like advice on caring for my piece.\n\nPiece name:\nWhat I need help with:",
  },
  delivery: {
    title: "Delivery enquiries",
    subject: "Delivery enquiry",
    message: "I’d like to ask about delivery.\n\nPiece name:\nDestination:",
  },
  returns: {
    title: "Returns and exchanges",
    subject: "Return or exchange enquiry",
    message: "I’d like to ask about a return or exchange.\n\nPiece name:\nOrder reference, if applicable:",
  },
} as const;

export function contactTopic(interest: string | null) {
  if (interest && Object.hasOwn(CONTACT_TOPICS, interest))
    return CONTACT_TOPICS[interest as keyof typeof CONTACT_TOPICS];
}

export function cheetaEmailLink(subject: string, body: string) {
  return `mailto:${CHEETA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
