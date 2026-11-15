import { Link } from "wouter";
import LegalPage from "@/components/LegalPage";

export default function Care() {
  return (
    <LegalPage
      title="Care"
      intro="For cleaning or repair advice, contact us with the name of your piece and a description of what it needs."
    >
      <Link
        className="contact-address inline-flex min-h-11 items-center"
        href="/contact?interest=care"
      >
        Contact Cheeta Jewels
      </Link>
    </LegalPage>
  );
}
