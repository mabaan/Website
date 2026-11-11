// Working identity, editorial copy and product portfolio live here.
export const site = {
  name: 'Starturi',
  location: 'UAE',
  year: '2026',
  // Add a verified address to enable the email handoff. Until then, visitors
  // can compose and copy an introduction without contacting a fictional inbox.
  email: '',
  navigation: [
    { label: 'What we do', id: 'premise' },
    { label: 'Products', id: 'products' },
    { label: 'Approach', id: 'approach' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ],
  hero: {
    eyebrow: 'An AI product company',
    firstLine: 'Start with the problem.',
    secondLine: 'Build the product',
    thirdLine: 'around it.',
    description: 'We build focused AI products for real business problems, combining agents, models, enterprise data and human judgment into systems people can actually use.',
    principles: ['Idea.', 'Intelligence.', 'Innovation.', 'Impact.'],
  },
  premise: {
    heading: ['AI is not the product.', 'The solution is.'],
    lead: 'Most organizations do not need another AI feature.',
    description: 'They have decisions that take too long, information scattered across systems, and repetitive work that still requires judgment. Workflows that traditional software was never designed around.',
    conclusion: 'We start with those problems and build focused products around them.',
    problems: [
      { title: 'Information everywhere', description: 'The answer exists, but nobody has the complete picture.' },
      { title: 'Work between systems', description: 'People spend their time moving context from one tool to another.' },
      { title: 'Decisions without memory', description: 'The reasoning behind important decisions disappears into meetings and documents.' },
      { title: 'AI without accountability', description: 'A useful answer still needs evidence, context and oversight.' },
    ],
  },
  productsIntro: {
    heading: 'Products built around problems worth solving.',
    description: 'Each Starturi product begins with a specific workflow, decision or problem. The technology changes depending on what the product actually needs.',
  },
  showcase: {
    heading: 'Intelligence built around an investment decision.',
    question: 'What changed since the last investment committee?',
    description: 'One question. Several perspectives. A connected, evidence-backed view for the people making the decision.',
    safeguards: ['Evidence lineage', 'Human oversight', 'Enterprise connectors', 'Scenario analysis', 'Continuous monitoring'],
  },
  approach: {
    heading: 'From a messy problem to a focused product.',
    note: 'The technology follows the problem.',
    stages: [
      { title: 'Understand', description: 'Study the workflow, users, constraints, decisions, data and existing systems.', note: 'Get close to the real work.' },
      { title: 'Design', description: 'Determine where agents, models, retrieval, automation and human judgment actually belong.', note: 'Choose what earns its place.' },
      { title: 'Build', description: 'Connect the necessary data and tools, orchestrate the system, and turn it into a usable product.', note: 'Make the thinking tangible.' },
      { title: 'Improve', description: 'Evaluate the product against real work, monitor failures and refine it over time.', note: 'Keep learning from use.' },
    ],
  },
  foundations: {
    heading: ['Different products.', 'Shared intelligence.'],
    description: 'Our products share a growing foundation of technical capabilities. The engineering carries forward. The workflow is always purpose-built.',
    capabilities: ['Agent orchestration', 'Retrieval & knowledge systems', 'Enterprise integrations', 'Model selection & adaptation', 'Structured workflows', 'Evaluation', 'Monitoring', 'Human-in-the-loop controls', 'Security & permissions', 'Decision traceability'],
    conclusion: 'We reuse the engineering that should be reusable and redesign the parts that make each problem different.',
  },
  exploration: {
    heading: 'The next product could start anywhere good work is unnecessarily difficult.',
    note: 'Areas of exploration, not existing products or service offerings.',
    areas: [
      { name: 'Operations', description: 'Fragmented operational signals that need to become prioritized actions.' },
      { name: 'Research', description: 'Large amounts of evidence that need to be gathered, compared and synthesized.' },
      { name: 'Compliance', description: 'Workflows where decisions need to be explainable and tied directly to evidence.' },
      { name: 'Enterprise knowledge', description: 'Information spread across systems, teams and documents with different permissions and context.' },
      { name: 'Decision support', description: 'Complex decisions that require several sources of information and still depend on human judgment.' },
    ],
  },
  philosophy: {
    preface: 'We don’t start by asking:',
    firstQuestion: '“Where can we use AI?”',
    answer: 'We ask:',
    secondQuestion: '“What should work better?”',
    description: 'AI is part of the engineering toolkit. The purpose is a better product: one that understands the work, respects the people doing it, and makes a difficult problem easier.',
  },
  about: {
    heading: 'Small by design.\nAmbitious by nature.',
    description: 'Starturi is an early-stage technology company building AI products for complex business problems.',
    detail: 'We combine AI research, software engineering and product thinking to turn difficult workflows into focused, useful products.',
  },
  contact: {
    heading: 'Know a problem worth building around?',
    description: 'Good. That’s where we like to start.',
    cta: 'Start a conversation',
  },
}

export type Product = {
  id: string
  category: string
  name?: string
  status: 'product' | 'exploration'
  headline: string
  description: string[]
  capabilities?: string[]
  href?: string
}

export const products: Product[] = [
  {
    id: 'mais',
    category: 'Investment intelligence',
    name: 'MAIS',
    status: 'product',
    headline: 'Investment intelligence that keeps the full picture in view.',
    description: [
      'Institutional investment teams work across market data, company information, internal research, portfolio context, previous decisions and constantly changing assumptions.',
      'MAIS, our Multi-Agent Investment System, coordinates those pieces into one intelligent workflow. It helps teams research companies, track investment theses, monitor changes, explore scenarios and produce decision-ready outputs.',
    ],
    capabilities: ['Investment thesis tracking', 'Company research', 'Portfolio context', 'Scenario analysis', 'Evidence lineage', 'Event monitoring', 'Decision history', 'Enterprise data integrations'],
    href: '#mais-detail',
  },
  {
    id: 'next',
    category: 'In development',
    status: 'exploration',
    headline: 'The next product starts with another problem.',
    description: ['We are exploring workflows where large amounts of information, repetitive analysis and human judgment still have to come together manually.'],
    href: '#exploration',
  },
]

export const intelligence = [
  { id: 'research', title: 'Company research', annotation: 'Understand the business', description: 'Bring company information, internal research and enterprise sources together. Connect new findings to the business and the investment question.', output: 'A sourced company brief, with new findings separated from existing assumptions.', sources: ['Company information', 'Internal research', 'Enterprise sources'] },
  { id: 'portfolio', title: 'Portfolio context', annotation: 'See the wider exposure', description: 'Read a company in the context of the portfolio. Consider exposures, dependencies and the implications of a changing view.', output: 'A portfolio-aware view of where a change could matter and which exposures need review.', sources: ['Portfolio context', 'Existing exposures', 'Investment constraints'] },
  { id: 'thesis', title: 'Investment thesis', annotation: 'Keep the reasoning alive', description: 'Track the assumptions behind an investment. Connect fresh evidence to the thesis so the team can see what is supported, challenged or unresolved.', output: 'A thesis update linking changed assumptions to the evidence behind them.', sources: ['Thesis assumptions', 'New evidence', 'Prior investment views'] },
  { id: 'evidence', title: 'Market evidence', annotation: 'Follow the evidence', description: 'Connect market information to the question at hand. Preserve the source and context behind a finding so it can be checked and revisited.', output: 'An evidence brief with traceable sources and open questions made explicit.', sources: ['Market information', 'Source context', 'Research evidence'] },
  { id: 'scenarios', title: 'Scenario analysis', annotation: 'Explore what could change', description: 'Explore how different assumptions could affect the investment view. Make the inputs and reasoning visible for human review.', output: 'A comparison of scenarios, their assumptions and the implications for the decision.', sources: ['Scenario inputs', 'Thesis assumptions', 'Portfolio context'] },
  { id: 'events', title: 'Event monitoring', annotation: 'Notice what matters', description: 'Monitor developments against the investment thesis. Surface the changes that warrant attention rather than adding another stream of disconnected alerts.', output: 'A prioritized account of relevant changes and the assumptions they could affect.', sources: ['Company developments', 'Market events', 'Thesis relevance'] },
  { id: 'history', title: 'Decision history', annotation: 'Remember the why', description: 'Keep earlier decisions and their reasoning in view. Give the next discussion a clear record of what the team knew and why it acted.', output: 'A decision timeline that preserves previous reasoning, evidence and unresolved questions.', sources: ['Previous decisions', 'Committee context', 'Recorded reasoning'] },
]
