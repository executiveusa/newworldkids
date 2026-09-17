import type { Metadata } from 'next'
import Link from 'next/link'

type PrivacyPageProps = {
  params: Promise<{ locale: string }>
}

const LAST_UPDATED = 'September 17, 2026'

export const metadata: Metadata = {
  title: 'Privacy Policy | New World Kids',
  description:
    'How New World Kids collects, uses, retains, and protects information submitted through nwkids.org.',
}

export default async function PrivacyPolicyPage({ params }: PrivacyPageProps) {
  const { locale } = await params
  const isSpanish = locale === 'es'

  if (isSpanish) {
    return <SpanishPrivacyPolicy locale={locale} />
  }

  return <EnglishPrivacyPolicy locale={locale} />
}

function PolicyShell({
  locale,
  title,
  intro,
  children,
}: {
  locale: string
  title: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <main className="bg-white text-slate-900">
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          New World Kids
        </p>
        <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{intro}</p>
        <p className="mt-3 text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-12 space-y-10 text-base leading-7 text-slate-700">
          {children}
        </div>

        <div className="mt-14 border-t border-slate-200 pt-8">
          <Link
            href={`/${locale}`}
            className="font-semibold text-blue-900 underline decoration-blue-900/30 underline-offset-4 hover:decoration-blue-900"
          >
            {locale === 'es' ? 'Volver a New World Kids' : 'Back to New World Kids'}
          </Link>
        </div>
      </article>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  )
}

function EnglishPrivacyPolicy({ locale }: { locale: string }) {
  return (
    <PolicyShell
      locale={locale}
      title="Privacy Policy"
      intro="This policy explains how New World Kids handles information submitted through nwkids.org. We collect only the information needed to respond to people who want to mentor, provide a project, partner with us, or contact the organization."
    >
      <Section title="Who this policy covers">
        <p>
          This policy applies to information submitted directly to New World Kids through nwkids.org and related New World Kids forms. Donation payments are processed through third-party services and the fiscal-sponsorship structure described on the donation page; those services may have their own privacy notices.
        </p>
      </Section>

      <Section title="Information we may collect">
        <p>
          Depending on the form you use, we may collect your name, email address, optional phone number, organization or company, general location, availability, skills, project details, timeline, compensation information, safety or accessibility considerations, and other information you choose to provide.
        </p>
        <p>
          Please do not submit sensitive personal information that New World Kids has not specifically asked for.
        </p>
      </Section>

      <Section title="How we use information">
        <p>We use submitted information to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>review and respond to mentor, project, partnership, and contact requests;</li>
          <li>evaluate whether an opportunity is appropriate for New World Kids participants;</li>
          <li>coordinate screening, scheduling, and program follow-up where applicable;</li>
          <li>maintain basic operational records; and</li>
          <li>protect participants, applicants, partners, and the organization from misuse or safety risks.</li>
        </ul>
      </Section>

      <Section title="Communications and marketing">
        <p>
          If you submit an application or inquiry, New World Kids may contact you about that specific request and closely related follow-up. Submitting a form does not automatically subscribe you to a newsletter or general marketing list. Any broader marketing subscription requires a separate opt-in.
        </p>
      </Section>

      <Section title="Retention">
        <p>
          Applications and project submissions that do not move forward are normally retained for up to 12 months, then deleted or anonymized unless a legitimate operational, safeguarding, recordkeeping, or legal reason requires longer retention.
        </p>
      </Section>

      <Section title="Service providers">
        <p>
          New World Kids may use service providers to host the website, deliver forms, store operational records, send email notifications, or process donations. We expect those providers to handle information only for the services they provide. As the technical stack is consolidated, New World Kids will keep this notice aligned with the systems actually in use rather than naming unverified or legacy processors.
        </p>
      </Section>

      <Section title="Youth information">
        <p>
          The current public website is not intended to collect sensitive participant information directly from minors. New World Kids will not open youth-facing intake workflows until appropriate consent, safeguarding, access, and retention controls are defined for those workflows.
        </p>
      </Section>

      <Section title="Your choices">
        <p>
          You may ask what information New World Kids has about you, request a correction, or ask for deletion when the information is no longer needed, subject to legitimate recordkeeping, safeguarding, or legal requirements.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Privacy questions and requests should be sent to{' '}
          <a className="font-semibold text-blue-900 underline underline-offset-4" href="mailto:info@nwkids.org">
            info@nwkids.org
          </a>.
        </p>
        <p>Jeremy Bowers is the accountable New World Kids contact for organizational follow-up.</p>
      </Section>

      <Section title="Policy changes">
        <p>
          We may update this policy as New World Kids adds new forms, systems, programs, or service providers. The date at the top of this page shows the current version.
        </p>
      </Section>
    </PolicyShell>
  )
}

function SpanishPrivacyPolicy({ locale }: { locale: string }) {
  return (
    <PolicyShell
      locale={locale}
      title="Política de Privacidad"
      intro="Esta política explica cómo New World Kids maneja la información enviada a través de nwkids.org. Recopilamos únicamente la información necesaria para responder a personas que desean ser mentores, aportar un proyecto, colaborar con nosotros o contactar a la organización."
    >
      <Section title="A quién aplica esta política">
        <p>
          Esta política se aplica a la información enviada directamente a New World Kids mediante nwkids.org y los formularios relacionados de New World Kids. Los pagos de donaciones son procesados por servicios externos y por la estructura de patrocinio fiscal descrita en la página de donaciones; esos servicios pueden tener sus propios avisos de privacidad.
        </p>
      </Section>

      <Section title="Información que podemos recopilar">
        <p>
          Dependiendo del formulario, podemos recopilar nombre, correo electrónico, teléfono opcional, organización o empresa, ubicación general, disponibilidad, habilidades, detalles del proyecto, calendario, información de compensación, consideraciones de seguridad o accesibilidad y otra información que usted decida proporcionar.
        </p>
        <p>
          No envíe información personal sensible que New World Kids no haya solicitado específicamente.
        </p>
      </Section>

      <Section title="Cómo usamos la información">
        <p>Usamos la información enviada para:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>revisar y responder solicitudes de mentoría, proyectos, alianzas y contacto;</li>
          <li>evaluar si una oportunidad es apropiada para participantes de New World Kids;</li>
          <li>coordinar evaluación, programación y seguimiento cuando corresponda;</li>
          <li>mantener registros operativos básicos; y</li>
          <li>proteger a participantes, solicitantes, socios y a la organización frente a riesgos de uso indebido o seguridad.</li>
        </ul>
      </Section>

      <Section title="Comunicaciones y marketing">
        <p>
          Si envía una solicitud o consulta, New World Kids puede contactarle sobre esa solicitud específica y el seguimiento directamente relacionado. Enviar un formulario no le suscribe automáticamente a un boletín ni a una lista general de marketing. Cualquier suscripción de marketing más amplia requiere una aceptación separada.
        </p>
      </Section>

      <Section title="Conservación">
        <p>
          Las solicitudes y propuestas de proyectos que no continúen normalmente se conservarán por un máximo de 12 meses y después se eliminarán o anonimizarán, salvo que exista una razón operativa, de protección, de archivo o legal legítima para conservarlas por más tiempo.
        </p>
      </Section>

      <Section title="Proveedores de servicios">
        <p>
          New World Kids puede utilizar proveedores para alojar el sitio, entregar formularios, almacenar registros operativos, enviar notificaciones por correo o procesar donaciones. Esperamos que esos proveedores manejen la información únicamente para prestar sus servicios. A medida que se consolide la infraestructura técnica, New World Kids mantendrá este aviso alineado con los sistemas realmente utilizados, sin nombrar procesadores heredados o no verificados.
        </p>
      </Section>

      <Section title="Información de jóvenes">
        <p>
          El sitio público actual no está destinado a recopilar información sensible de participantes directamente de menores. New World Kids no abrirá flujos de registro dirigidos a jóvenes hasta que se definan controles apropiados de consentimiento, protección, acceso y conservación para esos flujos.
        </p>
      </Section>

      <Section title="Sus opciones">
        <p>
          Puede preguntar qué información tiene New World Kids sobre usted, solicitar una corrección o pedir su eliminación cuando ya no sea necesaria, sujeto a requisitos legítimos de archivo, protección o cumplimiento legal.
        </p>
      </Section>

      <Section title="Contacto">
        <p>
          Las preguntas y solicitudes de privacidad deben enviarse a{' '}
          <a className="font-semibold text-blue-900 underline underline-offset-4" href="mailto:info@nwkids.org">
            info@nwkids.org
          </a>.
        </p>
        <p>Jeremy Bowers es el contacto responsable de New World Kids para el seguimiento organizacional.</p>
      </Section>

      <Section title="Cambios a esta política">
        <p>
          Podemos actualizar esta política cuando New World Kids añada nuevos formularios, sistemas, programas o proveedores. La fecha en la parte superior de esta página identifica la versión vigente.
        </p>
      </Section>
    </PolicyShell>
  )
}
