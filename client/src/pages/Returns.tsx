import LegalPage, { Section } from "@/components/LegalPage";
import { Link } from "wouter";

export default function Returns() {
  return (
    <LegalPage
      eyebrow="Client information"
      title="Returns and exchanges"
      intro="For questions about a return, exchange or an existing purchase, please contact Cheeta Jewels."
    >
      <Section no="01" title="Purchase enquiries">
        <p>
          <Link href="/contact" className="contact-address">
            contact us
          </Link>{" "}
          with the piece name and your order details, where applicable.
        </p>
      </Section>
    </LegalPage>
  );
}
