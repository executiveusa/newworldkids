export function InstitutionalTrustStrip() {
  return (
    <section
      aria-label="Organization identity"
      className="border-y border-slate-200 bg-white"
    >
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Public identity
          </p>
          <p className="mt-2 max-w-3xl text-base leading-7 text-slate-700">
            <strong className="text-slate-950">New World Kids</strong> is a fiscally sponsored
            project of <strong className="text-slate-950">Humanitarian Social Innovations</strong>,
            a 501(c)(3) public charity. Donations for New World Kids are administered through the
            fiscal sponsor.
          </p>
        </div>
        <div className="text-sm leading-6 text-slate-600 md:text-right">
          <p>
            <span className="font-semibold text-slate-900">Accountable contact:</span> Jeremy Bowers
          </p>
          <a
            href="mailto:info@nwkids.org"
            className="font-semibold text-blue-950 underline decoration-blue-950/30 underline-offset-4 hover:decoration-blue-950"
          >
            info@nwkids.org
          </a>
        </div>
      </div>
    </section>
  )
}
