"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureCampaignAttribution } from "@/lib/campaign-attribution";

export default function CampaignAttributionCapture() {
  const pathname = usePathname();
  useEffect(() => {
    // Reading location in the effect avoids useSearchParams' static-rendering/Suspense constraints.
    captureCampaignAttribution(window.location.search, pathname);
  }, [pathname]);
  return null;
}
