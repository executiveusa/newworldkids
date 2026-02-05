// ============================================================================
// TYPOGRAPHY SYSTEM - Professional Nonprofit Design
// ============================================================================

import { Roboto, Space_Grotesk, Orbitron, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google"

// Existing Roboto font
export const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  variable: "--font-roboto",
})

// ============================================================================
// PROFESSIONAL NONPROFIT FONTS
// ============================================================================

/**
 * Playfair Display - Elegant Serif for Headlines
 * Classic, trustworthy feel perfect for nonprofit branding
 */
export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
})

/**
 * Space Grotesk - Display & Headings (kept for internal tools)
 * Geometric sans-serif with a modern, cosmic feel
 */
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
})

/**
 * Orbitron - Cosmic Accent
 * Futuristic, space-themed font
 */
export const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
  preload: true,
})

/**
 * Inter - Body Text
 * Clean, highly readable sans-serif
 */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

/**
 * JetBrains Mono - Code & Logs
 * Monospace font optimized for code
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
})

/**
 * Combined font variables for Stellar Cockpit (internal tools)
 */
export const stellarFontVariables = `${spaceGrotesk.variable} ${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable}`

/**
 * Combined font variables for Professional Nonprofit Site (public)
 */
export const professionalFontVariables = `${playfairDisplay.variable} ${inter.variable}`
