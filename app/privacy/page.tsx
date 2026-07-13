import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Closing from '@/components/Closing'

export const metadata: Metadata = {
  title: 'Privacy Policy — Mathieu&Co',
  description:
    'Privacy Policy for Mathieu&Co Studio (Architecture, Interior Design, 3D Visualization, Digital Services & AI Automation) — how we collect, use and protect your data, including LinkedIn, Google OAuth and n8n automation integrations.',
  openGraph: {
    title: 'Privacy Policy — Mathieu&Co',
    description:
      'How Mathieu&Co Studio collects, uses and protects your data across our website and third-party integrations.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Mathieu&Co',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy — Mathieu&Co',
    description: 'How Mathieu&Co Studio collects, uses and protects your data.',
  },
}

const LAST_UPDATED = 'July 13, 2026'

type Section = {
  num: string
  title: string
  body: React.ReactNode
}

const sections: Section[] = [
  {
    num: '01',
    title: 'Who We Are',
    body: (
      <p>
        Mathieu&amp;Co Studio (&quot;Mathieu&amp;Co&quot;, &quot;we&quot;, &quot;us&quot;) is an
        independent studio based in Cotonou, Bénin, operating across Architecture, Interior
        Design, 3D Visualization, Digital Services and AI Automation. This Privacy Policy explains
        how we collect, use, and protect information when you visit our website or interact with
        our services and integrations.
      </p>
    ),
  },
  {
    num: '02',
    title: 'Information We Collect',
    body: (
      <>
        <p>Depending on how you interact with us, we may collect:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>
            <span className="text-ebene/90">Contact information</span> you provide directly, such
            as your name and email address when you reach out to us.
          </li>
          <li>
            <span className="text-ebene/90">Basic profile information</span> made available
            through OAuth providers you choose to connect (see LinkedIn and Google sections below)
            — typically name, email address, and profile picture.
          </li>
          <li>
            <span className="text-ebene/90">Technical data</span> such as browser type, device
            type, and general usage analytics, collected automatically when you browse our site.
          </li>
        </ul>
      </>
    ),
  },
  {
    num: '03',
    title: 'Use of LinkedIn OAuth',
    body: (
      <p>
        We use LinkedIn&apos;s OAuth 2.0 authentication to connect our automation tools to LinkedIn
        accounts under our control, for the purpose of publishing content on our own behalf. Where
        LinkedIn sign-in is offered to visitors, we only request the minimum profile information
        needed (name, email, profile picture) to identify you and never post to your LinkedIn
        account without explicit action from you.
      </p>
    ),
  },
  {
    num: '04',
    title: 'Use of Google OAuth',
    body: (
      <p>
        We use (or plan to use) Google OAuth 2.0 to connect Google services — such as Google
        Sheets and Google Drive — to our internal automation workflows, for example to manage
        editorial calendars or retrieve project media. Access is limited to what is strictly
        necessary for these workflows, and Google account data is never used for advertising or
        sold to third parties.
      </p>
    ),
  },
  {
    num: '05',
    title: 'Automation & Third-Party Tools (n8n)',
    body: (
      <p>
        We use n8n, a workflow automation platform hosted on our own infrastructure, to automate
        internal processes such as content scheduling and publishing. n8n acts strictly as a
        processor under our control — it does not share data with any party outside the
        integrations we explicitly configure (e.g. LinkedIn, Google), and no data processed through
        n8n is sold or repurposed for unrelated use.
      </p>
    ),
  },
  {
    num: '06',
    title: 'Cookies',
    body: (
      <p>
        Our website may use a limited number of strictly necessary and analytics cookies to
        understand how visitors use our site and to improve its performance. We do not use cookies
        for third-party advertising. You can control or disable cookies through your browser
        settings at any time.
      </p>
    ),
  },
  {
    num: '07',
    title: 'Data Retention',
    body: (
      <p>
        We retain personal information only for as long as necessary to fulfil the purposes
        described in this policy, to comply with our legal obligations, or to maintain the
        security and integrity of our services. OAuth tokens are stored securely and can be
        revoked at any time by disconnecting the relevant account.
      </p>
    ),
  },
  {
    num: '08',
    title: 'Your Rights',
    body: (
      <>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your personal data.</li>
          <li>Withdraw consent or revoke connected OAuth access at any time.</li>
          <li>Object to or restrict certain processing of your data.</li>
        </ul>
        <p className="mt-4">
          To exercise any of these rights, contact us using the details below.
        </p>
      </>
    ),
  },
  {
    num: '09',
    title: 'No Sale or Unnecessary Sharing of Data',
    body: (
      <p>
        We do not sell, rent, or trade your personal data. We only share data with third parties
        when strictly necessary for technical operation of our services (for example, hosting
        providers or the OAuth providers you explicitly connect), and always under agreements that
        respect the confidentiality of your data.
      </p>
    ),
  },
  {
    num: '10',
    title: 'Changes to This Policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or
        for legal or regulatory reasons. The &quot;last updated&quot; date at the top of this page
        indicates when this policy was last revised.
      </p>
    ),
  },
  {
    num: '11',
    title: 'Contact Us',
    body: (
      <p>
        If you have any questions about this Privacy Policy or how we handle your data, contact us
        at{' '}
        <a
          href="mailto:mathieu.co.studio@gmail.com"
          className="text-sable hover:underline"
        >
          mathieu.co.studio@gmail.com
        </a>
        .
      </p>
    ),
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main lang="en" className="bg-creme min-h-screen">
      <Navbar />

      <section className="pt-40 pb-20 px-8 md:px-16">
        <div className="max-w-screen-md mx-auto">
          <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-sable mb-6">
            Legal
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-ebene leading-tight mb-6">
            Privacy Policy
          </h1>
          <p className="font-montserrat text-xs tracking-wide text-ebene/40">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="pb-32 px-8 md:px-16">
        <div className="max-w-screen-md mx-auto space-y-20">
          {sections.map((s) => (
            <div key={s.num}>
              <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-sable mb-4">
                {s.num}
              </p>
              <h2 className="font-cormorant text-2xl md:text-3xl font-light text-ebene mb-5">
                {s.title}
              </h2>
              <div className="font-montserrat text-sm font-light text-ebene/60 leading-relaxed">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Closing />
    </main>
  )
}
