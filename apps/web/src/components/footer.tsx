import Link from "next/link";
import { Heart, Mail } from "lucide-react";
import { FiscalSponsorBadge } from "./FiscalSponsorBadge";

export function Footer() {
  return (
    <footer className="bg-background/95 w-full border-t backdrop-blur-sm">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1 order-last lg:order-first">
            <FiscalSponsorBadge variant="full" />
          </div>

          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Heart className="size-6 fill-red-500 text-red-500" />
              <span>New World Kids</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              New World Kids connects young people with real community projects, experienced mentors, and clear next steps.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href="mailto:info@nwkids.org"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="size-4" />
                info@nwkids.org
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/donate" className="text-muted-foreground hover:text-foreground transition-colors">Donate Now</Link></li>
              <li><Link href="/impact" className="text-muted-foreground hover:text-foreground transition-colors">Our Impact</Link></li>
              <li><Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</Link></li>
              <li><Link href="/volunteer" className="text-muted-foreground hover:text-foreground transition-colors">Volunteer</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">Our Story</Link></li>
              <li><Link href="/team" className="text-muted-foreground hover:text-foreground transition-colors">Team</Link></li>
              <li><Link href="/partners" className="text-muted-foreground hover:text-foreground transition-colors">Partners</Link></li>
              <li><Link href="/transparency" className="text-muted-foreground hover:text-foreground transition-colors">Transparency</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-border/40 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <div className="flex flex-col gap-1 text-muted-foreground text-xs sm:flex-row sm:items-center sm:gap-4">
            <p>&copy; {new Date().getFullYear()} New World Kids. All rights reserved.</p>
            <span className="hidden sm:inline">•</span>
            <span className="font-medium">Fiscally sponsored project of Humanitarian Social Innovations</span>
          </div>
          <div className="flex gap-4 text-xs">
            <Link href="/en/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/accessibility" className="text-muted-foreground hover:text-foreground transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
