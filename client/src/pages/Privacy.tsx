/**
 * PRIVACY POLICY
 */
import LegalPage, { Section, List } from "@/components/LegalPage";

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Legal · 01"
      title="Privacy"
      intro="We collect the minimum we need to serve you, and we do not sell or share it. The full policy is below; a plain-English summary opens it."
    >
      <Section no="01" title="What we collect">
        <List
          items={[
            {
              lead: "Account and order data:",
              rest: "Name, email, shipping address, phone (where required by the courier), order history.",
            },
            {
              lead: "Concierge correspondence:",
              rest: "Anything you share with us when arranging a private viewing, commission, or atelier visit.",
            },
            {
              lead: "Access requests:",
              rest: "Email and country, used solely to send the requested access link and a short house letter.",
            },
            {
              lead: "Site analytics:",
              rest: "Anonymous page views and intent signals (PDP view, add-to-bag, enquiry). No third-party tracking pixels.",
            },
          ]}
        />
      </Section>

      <Section no="02" title="What we do not do">
        <p>
          We do not sell your data. We do not share it with advertising
          networks. We do not run retargeting pixels. We do not enrich
          your record with data brokers. If a future feature requires any
          of the above, we will ask you explicitly first.
        </p>
      </Section>

      <Section no="03" title="Where the data is held">
        <p>
          Order and account data is held on infrastructure in the UAE
          (for UAE customers) or the EU (for European customers), per
          applicable data-residency rules. Concierge email is held with a
          privacy-respecting European provider.
        </p>
      </Section>

      <Section no="04" title="Your rights">
        <p>
          You can request a copy of your data, correct it, or have it
          deleted, at any time, by emailing{" "}
          <a
            href="mailto:mohammadfazalhaque@gmail.com"
            className="text-[#6B1A2C] underline-offset-4 hover:underline"
          >
            mohammadfazalhaque@gmail.com
          </a>
          .
        </p>
      </Section>

      <Section no="05" title="Cookies">
        <p>
          The site uses first-party session cookies for the cart and
          authentication. There are no third-party cookies and no
          advertising identifiers.
        </p>
      </Section>
    </LegalPage>
  );
}
