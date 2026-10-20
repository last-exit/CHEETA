import { toast } from "sonner";
import { useLocation } from "wouter";

export function useBagConfirmation() {
  const [, navigate] = useLocation();

  return (name: string, priceDisplay: string) =>
    toast.success("Added to bag", {
      className: "bag-confirmation",
      description: `${name} · ${priceDisplay}`,
      duration: 8000,
      action: {
        label: "View bag",
        onClick: () => navigate("/cart"),
      },
    });
}
