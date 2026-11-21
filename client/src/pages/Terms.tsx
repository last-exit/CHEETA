/**
 * TERMS OF SALE
 */
import LegalPage, { Section } from "@/components/LegalPage";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Sale"
      intro="Plain terms, written in plain English. The law is the law of the United Arab Emirates, Dubai; everything else here is just courtesy."
    >
      <Section no="01" title="The contract">
        <p>
          A contract of sale is formed when we dispatch your order, not at
          checkout. Until dispatch, we may cancel and refund an order if a
          stock or pricing error is identified, or if a fraud check flags
          the transaction.
        </p>
      </Section>

      <Section no="02" title="Pricing & currency">
        <p>
          Prices on the site are shown in AED and are inclusive of UAE VAT
          where applicable. International orders are shown exclusive of
          duties and import taxes, which are calculated at checkout where
          supported.
        </p>
      </Section>

      <Section no="03" title="Piece details">
        <p>
          The details of each piece, including any edition information, are
          confirmed with you in writing before purchase. For questions about
          a particular piece, please contact Cheeta Jewels.
        </p>
      </Section>

      <Section no="04" title="Title & risk">
        <p>
          Title to the goods passes to you on dispatch. Risk passes on
          delivery. Until delivery, the piece is insured by the house.
        </p>
      </Section>

      <Section no="05" title="Intellectual property">
        <p>
          All imagery, copy, and the Cheeta Jewels name and crest are
          property of the house. Unauthorised commercial use is
          prohibited. Press and editorial use is welcome with written
          permission.
        </p>
      </Section>

      <Section no="06" title="Governing law">
        <p>
          These terms are governed by the laws of the United Arab
          Emirates, with exclusive jurisdiction in the courts of Dubai.
          Consumers in other jurisdictions retain any mandatory
          protections granted by their local law.
        </p>
      </Section>
    </LegalPage>
  );
}
