/**
 * ACCESSIBILITY STATEMENT
 */
import LegalPage, { Section } from "@/components/LegalPage";

export default function Accessibility() {
  return (
    <LegalPage
      eyebrow="Legal · 03"
      title="Accessibility"
      intro="The house is for everyone who values the work. We design and build to WCAG 2.1 AA and test with assistive tech on every release."
    >
      <Section no="01" title="What we do">
        <p>
          We maintain keyboard navigation across every page, visible focus
          states, semantic heading structure, alt text on every product
          and editorial image, sufficient colour contrast on text and
          interactive elements, labels on every form field, and a
          reduced-motion mode that removes parallax, looping grain, and
          non-essential animation.
        </p>
      </Section>

      <Section no="02" title="What we test with">
        <p>
          VoiceOver on macOS and iOS, NVDA on Windows, keyboard-only
          navigation, and the accessibility audits built into our build
          pipeline (axe-core). Every release is checked against a screen
          reader, a keyboard, and a contrast analyser before it ships.
        </p>
      </Section>

      <Section no="03" title="What we are still working on">
        <p>
          Some legacy video content has auto-captioned transcripts that
          are reviewed but not always human-checked. The leopard-print
          texture and brushed-gold surfaces are intentionally high
          contrast; we are reviewing the few low-contrast decorative
          elements in the next release.
        </p>
      </Section>

      <Section no="04" title="If you need an accommodation">
        <p>
          Email{" "}
          <a
            href="mailto:mohammadfazalhaque@gmail.com"
            className="text-[#6B1A2C] underline-offset-4 hover:underline"
          >
            mohammadfazalhaque@gmail.com
          </a>{" "}
          with a description of what you need help accessing.
        </p>
      </Section>
    </LegalPage>
  );
}
