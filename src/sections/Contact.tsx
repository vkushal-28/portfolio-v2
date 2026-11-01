import { Reveal } from '@/components/motion'
import {
  Glow,
  MonoLabel,
  NavLink,
  RichText,
  Section,
  SectionHeader,
  SectionTitle,
} from '@/components/ui'
import { contact, profile, socials } from '@/data'
import { ContactForm } from './contact/ContactForm'

const elsewhere = [...socials, { label: contact.resumeLabel, href: profile.resumeUrl }]

export function Contact() {
  return (
    <Section id="contact" aria-labelledby="contact-title" className="isolate overflow-hidden">
      <Glow
        size={700}
        motion="drift"
        strength={16}
        className="top-[-120px] left-[calc(50%-350px)] -z-10"
      />
      <SectionHeader index={contact.header.index} label={contact.header.label} />
      <SectionTitle id="contact-title" size="display">
        {contact.titleLines.map((line, i) => (
          <span key={i} className="block">
            <RichText runs={line} />
          </span>
        ))}
      </SectionTitle>

      <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <Reveal className="flex flex-col">
          <p className="max-w-md text-lg leading-[1.7] text-mu">{contact.intro}</p>

          <MonoLabel className="mt-10">{contact.emailLabel}</MonoLabel>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-3 self-start text-[clamp(22px,2.4vw,32px)] font-medium tracking-[-0.02em] break-all text-tx"
          >
            <span className="underline-grow pb-1 [--underline-h:3px]">{profile.email}</span>
          </a>

          <MonoLabel className="mt-10">{contact.elsewhereLabel}</MonoLabel>
          <ul className="mt-3 border-t border-ln2">
            {elsewhere.map((link) => (
              <li key={link.label}>
                <NavLink
                  href={link.href}
                  variant="row"
                  trailing="↗"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
