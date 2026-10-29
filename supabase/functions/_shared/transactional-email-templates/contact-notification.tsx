import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  country?: string
  zip?: string
  roles?: string
  subject?: string
  message?: string
}

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Text style={row}><strong>{label}:</strong> {value || '—'}</Text>
)

const Email = (p: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact message from {p.name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New contact form message</Heading>
        <Row label="Name" value={p.name} />
        <Row label="Email" value={p.email} />
        <Row label="Country" value={p.country} />
        <Row label="ZIP / Postal code" value={p.zip} />
        <Row label="Roles" value={p.roles} />
        <Row label="Subject" value={p.subject} />
        <Hr />
        <Section>
          <Text style={label}>Message</Text>
          <Text style={msg}>{p.message || '—'}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => `MakeHug contact: ${d.subject || 'New message'} — ${d.name || ''}`.trim(),
  displayName: 'Contact form notification',
  to: 'makehug44@gmail.com',
  previewData: { name: 'Jane', email: 'jane@example.com', country: 'Spain', zip: '28001', roles: 'Maker', subject: 'Hello', message: 'Hi there!' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px' }
const h1 = { fontSize: '20px', color: '#111111', margin: '0 0 16px' }
const row = { fontSize: '14px', color: '#333333', margin: '4px 0' }
const label = { fontSize: '14px', fontWeight: 'bold', color: '#333333', margin: '8px 0 4px' }
const msg = { fontSize: '14px', color: '#333333', whiteSpace: 'pre-wrap' as const }
