export const faqSection = {
  eyebrow: { label: 'FAQ', tone: 'blush' },
  title: 'Questions teams ask before they start',
  subtitle:
    'If something here is still unclear, email us and a person who works on Nova will answer, not a bot.',
  items: [
    {
      id: 'grounding',
      question: 'How does Nova avoid making things up?',
      answer:
        'Nova only drafts from the sources you connect: your help center, runbooks, and approved past replies. Every draft ships with the sources it used, so a reviewer can check the reasoning in one click. When nothing in your sources answers a question, Nova says so and escalates rather than improvising.',
    },
    {
      id: 'approval',
      question: 'Do customers ever get an AI answer without a person seeing it?',
      answer:
        'Not by default. Human approval is required before anything reaches a customer. Team and Business plans add auto-send rules you define for low-risk topics, and those rules are visible to your team, logged, and switchable per inbox.',
    },
    {
      id: 'onboarding',
      question: 'How long does it take to set up?',
      answer:
        'Most teams are drafting within one business day. Connecting a help center and an inbox takes minutes, and Nova reads your sources once and keeps them current as the docs change. Business plans include a guided onboarding with a named engineer and an accuracy evaluation on your own past tickets.',
    },
    {
      id: 'integrations',
      question: 'Which tools does Nova connect to?',
      answer:
        'Zendesk, Intercom, and Front for the inbox, plus Slack for digests and escalations. Billing and account data stay in sync through the API. If you are on a tool we do not support yet, tell us and we will tell you honestly how close we are.',
    },
    {
      id: 'privacy',
      question: 'Is our customer data used to train your models?',
      answer:
        'No. Your tickets and documents stay scoped to your workspace, are encrypted in transit and at rest, and are never used to train shared models. Enterprise agreements add region-specific storage and a signed data processing addendum.',
    },
    {
      id: 'billing',
      question: 'How does seat counting and billing work?',
      answer:
        'You are billed per agent seat, monthly or yearly. Seats are prorated when you add or remove someone mid-cycle, and you can change plan or cancel at any time. Yearly billing is 20 percent below monthly, with the savings shown next to the toggle.',
    },
    {
      id: 'quality',
      question: 'How do we know the answers are actually good?',
      answer:
        'Nova reports deflection rate, first-response time, and the topics that keep coming back so you can see where it helps and where your docs are thin. Business plans add a custom evaluation set, so you can measure accuracy against your own ticket history before rolling Nova out widely.',
    },
    {
      id: 'support',
      question: 'What happens if we need help?',
      answer:
        'Solo plans get email support within 2 business days, Team within 1, and Business gets a dedicated channel with a named engineer. Because you can see every draft before it sends, you are never blocked waiting on us to unblock a customer.',
    },
  ],
}