"use client";

import { Heart, ExternalLink } from "lucide-react";
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

export function FiscalSponsorBadge({
  variant = "full",
  className = "",
}: FiscalSponsorBadgeProps) {
  const sponsorInfo = {
    name: "New World Kids",
    fiscalSponsor: "Humanitarian Social Innovations",
    ein: "501(c)(3)",
    address: "6725 S 116th Pl, Seattle, WA 98178",
    phone: "(323) 484-2914",
    email: "info@nwkids.org",
    website: "https://nwkids.org",
  };

  if (variant === "minimal") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-help ${className}`}
            >
              <Heart className="size-3 fill-red-500 text-red-500" />
              <span>501(c)(3) Nonprofit</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="font-medium">{sponsorInfo.name}</p>
            <p className="text-xs text-muted-foreground">
              Fiscal sponsor: {sponsorInfo.fiscalSponsor}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Donations are tax-deductible
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
        <Heart className="size-4 fill-red-500 text-red-500 shrink-0" />
        <div className="flex flex-col">
          <span className="text-xs font-medium">{sponsorInfo.name}</span>
          <span className="text-[10px] text-muted-foreground">
            {sponsorInfo.ein} • Tax-deductible
          </span>
        </div>
      </div>
    );
  }

  // Full variant (default)
  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border border-border/50 bg-gradient-to-br from-muted/40 to-muted/20 p-4 backdrop-blur-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-red-500/10 p-2">
          <Heart className="size-5 fill-red-500 text-red-500" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{sponsorInfo.name}</h4>
          <p className="text-xs text-muted-foreground">
            A registered {sponsorInfo.ein} nonprofit organization
          </p>
        </div>
      </div>

      {/* Fiscal Sponsor */}
      <div className="border-t border-border/30 pt-3">
        <p className="text-xs text-muted-foreground mb-1">Fiscal Sponsor</p>
        <p className="text-sm font-medium">{sponsorInfo.fiscalSponsor}</p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
        <p>{sponsorInfo.address}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a
            href={`tel:${sponsorInfo.phone.replace(/[^\d]/g, "")}`}
            className="hover:text-foreground transition-colors"
          >
            {sponsorInfo.phone}
          </a>
          <a
            href={`mailto:${sponsorInfo.email}`}
            className="hover:text-foreground transition-colors"
          >
            {sponsorInfo.email}
          </a>
        </div>
      </div>

      {/* Tax Deductible Notice */}
      <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-xs text-green-700 dark:text-green-400">
        <svg
          className="size-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>All donations are tax-deductible to the fullest extent</span>
      </div>

      {/* Website Link */}
      <a
        href={sponsorInfo.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
      >
        Visit our website
        <ExternalLink className="size-3" />
      </a>
    </div>
  );
}
