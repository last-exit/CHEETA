import LegalPage, { Section } from "@/components/LegalPage";

export default function Contact() {
  return (
    <LegalPage
      eyebrow="Cheeta Jewels"
      title="Contact"
      intro="For product enquiries and information about Cheeta Jewels."
    >
      <Section no="01" title="Email">
        <p>
          <a
            href="mailto:mohammadfazalhaque@gmail.com"
            className="contact-address"
          >
            mohammadfazalhaque@gmail.com
          </a>
        </p>
      </Section>
      <Section no="02" title="Phone">
        <p>
          <a href="tel:+971528038612" className="contact-address">
            +971 52 803 8612
          </a>
        </p>
      </Section>
    </LegalPage>
  );
}
