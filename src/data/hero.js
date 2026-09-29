export const heroBadge = {
  label: 'Now in private beta',
  tone: 'nova',
}

export const heroContent = {
  headlineLead: 'Every support ticket,',
  headlineAccent: 'answered before your queue builds up.',
  subhead:
    'Nova AI reads your docs, drafts a reply in your brand voice, and hands it to a human for one-click approval. Your team stops writing the same answer twice.',
  ctas: [
    {
      label: 'Join waitlist',
      href: '#waitlist',
      variant: 'primary',
      size: 'lg',
      icon: 'arrowRight',
    },
    {
      label: 'Watch demo',
      href: '#hero-mockup',
      variant: 'ghost',
      size: 'lg',
      icon: 'play',
    },
  ],
}

export const heroMockup = {
  sidebarTitle: 'Inbox',
  queueLabel: 'Needs review',
  threads: [
    {
      id: 't1',
      subject: 'Refund stuck after plan downgrade',
      customer: 'Dana Whitfield',
      channel: 'email',
      priority: 'high',
      time: '2m',
    },
    {
      id: 't2',
      subject: 'Can I export audit logs to S3?',
      customer: 'Marcus Oyelaran',
      channel: 'chat',
      priority: 'normal',
      time: '11m',
    },
    {
      id: 't3',
      subject: 'SSO metadata for Okta setup',
      customer: 'Priya Raman',
      channel: 'email',
      priority: 'normal',
      time: '24m',
    },
    {
      id: 't4',
      subject: 'Webhook retries duplicating events',
      customer: 'Tomas Lindqvist',
      channel: 'chat',
      priority: 'high',
      time: '38m',
    },
  ],
  panelTitle: 'Refund stuck after plan downgrade',
  messages: [
    {
      id: 'm1',
      author: 'Dana Whitfield',
      role: 'user',
      body: "Hi — we downgraded from Scale to Growth last week and the difference is still being deducted. Can you release the balance?",
      time: '10:42',
    },
    {
      id: 'm2',
      author: 'Nova draft',
      role: 'ai',
      body: 'Hi Dana, thanks for flagging this. I checked billing: the prorated difference was queued when the downgrade completed, and it has now been released back to your card. You should see it within 3–5 business days. If it has not cleared by Friday, reply here and I will escalate it to our billing engineer.',
      time: '10:42',
    },
  ],
  footerStats: [
    { label: 'Confidence', value: '94%' },
    { label: 'Sources matched', value: '3' },
    { label: 'First reply', value: '38s' },
  ],
}
