"use client";

import { Heart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FiscalSponsorBadgeProps {
  variant?: "full" | "compact" | "minimal";
  className?: string;
}

const sponsorInfo = {
  name: "New World Kids",
  fiscalSponsor: "Humanitarian Social Innovations",
  email: "info@nwkids.org",
  accountableContact: "Jeremy Bowers",
};

export function FiscalSponsorBadge({
  variant = "full",
  className = "",
}: FiscalSponsorBadgeProps) {
  if (variant === "minimal") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`inline-flex cursor-help items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground ${className}`}
            >
              <Heart className="size-3 fill-red-500 text-red-500" />
              <span>Fiscally sponsored project</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="font-medium">{sponsorInfo.name}</p>
            <p className="text-xs text-muted-foreground">
              Fiscal sponsor: {sponsorInfo.fiscalSponsor}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={`flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-2 ${className}`}
      >
        <Heart className="size-4 shrink-0 fill-red-500 text-red-500" />
        <div className="flex flex-col">
          <span className="text-xs font-medium">{sponsorInfo.name}</span>
          <span className="text-[10px] text-muted-foreground">
            Fiscally sponsored by {sponsorInfo.fiscalSponsor}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border border-border/50 bg-gradient-to-br from-muted/40 to-muted/20 p-4 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-red-500/10 p-2">
          <Heart className="size-5 fill-red-500 text-red-500" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold">{sponsorInfo.name}</h4>
          <p className="text-xs text-muted-foreground">Fiscally sponsored project</p>
        </div>
      </div>

      <div className="border-t border-border/30 pt-3">
        <p className="mb-1 text-xs text-muted-foreground">Fiscal sponsor</p>
        <p className="text-sm font-medium">{sponsorInfo.fiscalSponsor}</p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Donations for New World Kids are administered through Humanitarian Social Innovations.
          New World Kids does not represent itself as independently holding federal 501(c)(3)
          recognition.
        </p>
      </div>

      <div className="border-t border-border/30 pt-3 text-xs text-muted-foreground">
        <p>Accountable contact: {sponsorInfo.accountableContact}</p>
        <a
          href={`mailto:${sponsorInfo.email}`}
          className="mt-1 inline-block transition-colors hover:text-foreground"
        >
          {sponsorInfo.email}
        </a>
      </div>
    </div>
  );
}
