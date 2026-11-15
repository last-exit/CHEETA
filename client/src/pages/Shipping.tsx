import LegalPage, { Section } from "@/components/LegalPage";
import { Link } from "wouter";

export default function Shipping() {
  return (
    <LegalPage
      title="Shipping and delivery"
      intro="For delivery availability and timing for a particular piece, please contact Cheeta Jewels."
    >
      <Section no="01" title="Delivery enquiries">
        <p>
          <Link href="/contact?interest=delivery" className="contact-address">
            contact us
          </Link>{" "}
          with the name of the piece and your destination.
        </p>
      </Section>
    </LegalPage>
  );
}
