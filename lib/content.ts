export const site = {
  name: 'Pinnacle Digital Defense Group',
  shortName: 'PDDG',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pddg-security-assessments.brandbonjour.chatgpt.site',
  email: 'Info@pddg.io',
  phone: '301-532-1463',
  phoneHref: '+13015321463',
  address: '5457 Twin Knolls Rd, Ste 300, PMB 1019, Columbia, MD 21045',
  hours: 'Monday–Friday, 8 AM–7 PM ET'
};

export type FAQ = { q: string; a: string };
export type Service = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  ideal: string;
  triggers: string[];
  scope: string[];
  deliverables: string[];
  benefits: string[];
  standards: string[];
  related: string[];
  faq: FAQ[];
  visual: string;
};

export const services: Service[] = [
  {
    slug: 'penetration-testing',
    name: 'Penetration Testing',
    eyebrow: 'Validate realistic attack paths',
    headline: 'See how far a controlled attack could go—before a real one begins.',
    summary: 'PDDG conducts scoped, authorized testing to validate exploitable weaknesses and show how individual gaps may combine into meaningful business risk.',
    ideal: 'Organizations that need evidence of exploitability, validation beyond automated scanning, or a deeper test of existing controls.',
    triggers: ['A major infrastructure or application change', 'A customer or contractual testing requirement', 'Concern about attack paths across connected systems', 'The need to validate prior vulnerability findings'],
    scope: ['External or internal systems approved during scoping', 'Authentication and access-control paths', 'Network segmentation and exposed services', 'Evidence collection designed to minimize operational impact'],
    deliverables: ['Executive summary for decision-makers', 'Validated findings with technical evidence', 'Business-impact and likelihood context', 'Prioritized remediation guidance and, where scoped, retesting'],
    benefits: ['Separate theoretical weaknesses from demonstrated exposure', 'Focus remediation on credible attack paths', 'Give technical teams reproducible evidence'],
    standards: ['NIST guidance', 'OWASP testing principles', 'PTES-aligned concepts', 'Applicable contractual requirements'],
    related: ['vulnerability-assessment', 'web-application-security-assessment', 'vulnerability-management'],
    faq: [
      { q: 'Can penetration testing disrupt systems?', a: 'Testing is planned to reduce unnecessary operational risk, but no active test is entirely risk-free. Rules of engagement, exclusions, escalation paths, and testing windows are confirmed before work begins.' },
      { q: 'Is retesting included?', a: 'Retesting may be included depending on the agreed scope. The proposal should state the retest window, eligible findings, and reporting method.' },
      { q: 'What is the difference between a scan and a penetration test?', a: 'A scan identifies potential weaknesses. A penetration test adds human validation and controlled exploitation to understand whether and how those weaknesses can be used.' }
    ],
    visual: 'path'
  },
  {
    slug: 'vulnerability-assessment',
    name: 'Vulnerability Assessment',
    eyebrow: 'Build a prioritized exposure baseline',
    headline: 'Turn a broad list of weaknesses into a risk-informed starting point.',
    summary: 'A vulnerability assessment identifies and prioritizes weaknesses across approved assets, helping teams understand exposure without assuming every finding carries equal business risk.',
    ideal: 'Teams seeking a broad security baseline, pre-audit preparation, or a structured view of weaknesses across systems and infrastructure.',
    triggers: ['No recent assessment baseline', 'Rapid asset or cloud growth', 'Audit or customer due-diligence preparation', 'A backlog with unclear remediation order'],
    scope: ['Approved hosts, services, platforms, and cloud assets', 'Configuration and patch exposure', 'Validation of selected higher-risk findings', 'Asset-context and ownership mapping where available'],
    deliverables: ['Asset-level findings', 'Severity and business-context prioritization', 'Technical evidence and affected components', 'Practical remediation sequence'],
    benefits: ['Establish a defensible exposure baseline', 'Reduce noise from raw scanner output', 'Align owners around the next actions'],
    standards: ['NIST Cybersecurity Framework', 'CIS Controls', 'CVSS as one input to prioritization', 'Relevant regulatory expectations'],
    related: ['penetration-testing', 'vulnerability-management', 'cybersecurity-policy-assessment'],
    faq: [
      { q: 'Does an assessment prove vulnerabilities are exploitable?', a: 'Not always. Validation depth depends on scope. Penetration testing is generally the better fit when controlled exploitation and attack-path validation are primary objectives.' },
      { q: 'How often should assessments occur?', a: 'Frequency depends on change rate, risk, contractual obligations, and the organization’s control environment. Many teams combine periodic assessments with ongoing vulnerability management.' },
      { q: 'Can cloud assets be included?', a: 'Cloud assets may be included when ownership, provider requirements, permissions, and the exact test boundaries are confirmed during scoping.' }
    ],
    visual: 'matrix'
  },
  {
    slug: 'vulnerability-management',
    name: 'Vulnerability Management',
    eyebrow: 'Reduce exposure over time',
    headline: 'Move from periodic findings to a repeatable risk-reduction rhythm.',
    summary: 'Vulnerability management helps organizations track, prioritize, assign, and verify remediation over time instead of treating each assessment as an isolated event.',
    ideal: 'Organizations with recurring scans, multiple asset owners, growing remediation backlogs, or a need to demonstrate continuous progress.',
    triggers: ['Findings repeatedly reopen or age past target dates', 'Ownership is unclear across teams', 'Scanning exists but risk reduction is difficult to show', 'Leadership needs consistent exposure reporting'],
    scope: ['Asset and owner context', 'Finding normalization and prioritization', 'Remediation workflow and exception handling', 'Progress reporting and validation cadence'],
    deliverables: ['Prioritized remediation register', 'Ownership and target-date model', 'Trend and aging views', 'Validation or retesting recommendations'],
    benefits: ['Create accountability without losing technical context', 'Direct capacity toward the most consequential exposure', 'Communicate measurable progress'],
    standards: ['NIST Cybersecurity Framework', 'CIS Controls', 'Risk-based service-level targets', 'Applicable governance requirements'],
    related: ['vulnerability-assessment', 'penetration-testing', 'threat-intelligence-and-monitoring'],
    faq: [
      { q: 'Is vulnerability management a one-time assessment?', a: 'No. It is an operating process that connects discovery, prioritization, ownership, remediation, exception handling, and validation.' },
      { q: 'Can PDDG work with existing tools?', a: 'The engagement may incorporate existing scanners, ticketing workflows, and reporting sources when access and integration requirements are agreed during scoping.' },
      { q: 'How are priorities set?', a: 'Technical severity is considered alongside exploitability, asset importance, exposure, compensating controls, operational impact, and remediation effort.' }
    ],
    visual: 'cycle'
  },
  {
    slug: 'web-application-security-assessment',
    name: 'Web Application Security Assessment',
    eyebrow: 'Test the logic behind the interface',
    headline: 'Identify application weaknesses that scanners and happy-path testing can miss.',
    summary: 'PDDG evaluates approved web applications for security weaknesses across authentication, authorization, input handling, business logic, configuration, and session behavior.',
    ideal: 'Organizations preparing a release, handling sensitive data, responding to customer assurance requests, or reviewing a high-value application.',
    triggers: ['A new application or major release', 'Sensitive workflows or customer data', 'Changes to identity, APIs, or payment flows', 'A contractual application-testing requirement'],
    scope: ['Authentication and session behavior', 'Authorization and role boundaries', 'Input handling and server-side validation', 'Business-logic and configuration risks'],
    deliverables: ['Reproducible application findings', 'Technical evidence and affected flows', 'Impact explanation for product and business owners', 'Prioritized developer-ready recommendations'],
    benefits: ['Find weaknesses tied to real user flows', 'Give developers specific remediation direction', 'Support safer release decisions'],
    standards: ['OWASP Web Security Testing Guide', 'OWASP Top 10', 'OWASP ASVS concepts', 'Relevant secure-development requirements'],
    related: ['penetration-testing', 'vulnerability-assessment', 'cybersecurity-policy-assessment'],
    faq: [
      { q: 'Do you need test accounts?', a: 'Authenticated testing commonly requires dedicated accounts for relevant roles. Exact access, data handling, and environment requirements are confirmed before testing.' },
      { q: 'Can APIs be assessed?', a: 'API endpoints may be included when they are explicitly listed in scope and the necessary documentation, authentication, and test data are available.' },
      { q: 'Should testing occur in production?', a: 'The right environment depends on realism, data sensitivity, operational tolerance, and test objectives. The decision is made during scoping with clear safeguards.' }
    ],
    visual: 'app'
  },
  {
    slug: 'threat-intelligence-and-monitoring',
    name: 'Threat Intelligence and Monitoring',
    eyebrow: 'Connect external signals to business risk',
    headline: 'Focus attention on emerging threats that are relevant to your organization.',
    summary: 'PDDG helps teams monitor agreed external risk signals, interpret their relevance, and prioritize action with context rather than forwarding undifferentiated alerts.',
    ideal: 'Organizations seeking ongoing visibility into exposed data, domain risk, credential exposure, or changing threat conditions.',
    triggers: ['Executives need clearer external-risk visibility', 'Potential credential or brand exposure', 'A changing threat landscape for the sector', 'Limited capacity to analyze raw threat feeds'],
    scope: ['Approved domains, brands, and external indicators', 'Credential and exposed-data signals where lawful and appropriate', 'Threat relevance and risk scoring', 'Escalation and reporting expectations'],
    deliverables: ['Contextual alerts', 'Risk-scored observations', 'Periodic executive and technical reporting', 'Recommended response and hardening actions'],
    benefits: ['Reduce time spent on irrelevant signals', 'Identify external exposure earlier', 'Connect intelligence to accountable action'],
    standards: ['NIST Cybersecurity Framework', 'MITRE ATT&CK as an analysis reference', 'Organization-specific risk criteria', 'Applicable data-handling requirements'],
    related: ['vulnerability-management', 'vulnerability-assessment', 'security-awareness-training'],
    faq: [
      { q: 'Is this an incident-response service?', a: 'Not by default. Monitoring and intelligence may identify signals that require investigation, but incident-response availability and scope must be established separately.' },
      { q: 'What is monitored?', a: 'The monitored sources, identifiers, alert thresholds, and reporting cadence depend on the agreed service scope.' },
      { q: 'Does every alert require immediate action?', a: 'No. Alerts should be evaluated for credibility, relevance, affected assets, and business impact before response is prioritized.' }
    ],
    visual: 'radar'
  },
  {
    slug: 'security-awareness-training',
    name: 'Security Awareness Training',
    eyebrow: 'Make secure judgment part of daily work',
    headline: 'Prepare people to recognize risk in the moments that matter.',
    summary: 'PDDG develops role-aware training that helps employees identify phishing, social engineering, unsafe data handling, and other behaviors relevant to their work.',
    ideal: 'Organizations strengthening security culture, responding to audit requirements, onboarding new staff, or addressing recurring human-risk patterns.',
    triggers: ['Phishing or account-compromise concerns', 'New or seasonal workforce onboarding', 'Policy changes that employees must understand', 'Training completion without visible behavior change'],
    scope: ['Role and risk discovery', 'Phishing and social-engineering awareness', 'Password, device, and data-handling practices', 'Safe simulations or knowledge checks where included'],
    deliverables: ['Tailored learning content', 'Facilitated sessions or approved delivery format', 'Participation and knowledge observations', 'Improvement recommendations'],
    benefits: ['Make guidance relevant to real roles', 'Reinforce reporting and escalation habits', 'Support evidence of an active awareness program'],
    standards: ['NIST awareness guidance', 'CIS Controls', 'Organization policy requirements', 'Applicable sector expectations'],
    related: ['cybersecurity-policy-assessment', 'threat-intelligence-and-monitoring', 'vulnerability-management'],
    faq: [
      { q: 'Can training be customized by role?', a: 'Yes, where included in scope. Executives, administrators, finance teams, frontline staff, and general users often face different decisions and threat patterns.' },
      { q: 'Are phishing simulations always included?', a: 'No. Simulations are included only when agreed, authorized, and designed with appropriate communication, safety, and measurement controls.' },
      { q: 'Does completion prove employees are secure?', a: 'No single training event removes human risk. Effective programs reinforce expectations, measure trends, and improve reporting behavior over time.' }
    ],
    visual: 'people'
  },
  {
    slug: 'physical-security-assessment',
    name: 'Physical Security Assessment',
    eyebrow: 'Evaluate where physical access meets digital risk',
    headline: 'Find on-site weaknesses that can bypass otherwise strong technical controls.',
    summary: 'PDDG reviews approved facilities, access practices, and physical-control dependencies to identify gaps that may affect people, systems, data, and operational continuity.',
    ideal: 'Organizations with sensitive facilities, public-facing environments, shared buildings, high-value assets, or regulatory physical-security expectations.',
    triggers: ['A new facility or material layout change', 'Shared access or visitor-management concerns', 'Sensitive equipment outside controlled areas', 'A need to connect physical and cyber risk'],
    scope: ['Perimeter and entry controls', 'Visitor, badge, and key practices', 'Sensitive-area and equipment protection', 'Physical-to-digital attack paths approved for review'],
    deliverables: ['Observed control gaps', 'Risk pathways and affected assets', 'Photographic evidence only where authorized', 'Prioritized procedural and physical recommendations'],
    benefits: ['Understand security as a connected system', 'Reduce opportunities for unauthorized access', 'Support operational and compliance planning'],
    standards: ['NIST physical protection concepts', 'CPTED principles where relevant', 'Organization access-control policies', 'Applicable facility requirements'],
    related: ['wireless-bluetooth-security-audit', 'cybersecurity-policy-assessment', 'penetration-testing'],
    faq: [
      { q: 'Does this include covert entry testing?', a: 'Only if explicitly authorized and carefully scoped. Many engagements are observational and procedural assessments without attempted bypass.' },
      { q: 'Will photographs be taken?', a: 'Evidence practices are agreed in advance. Photography may be restricted or excluded depending on the facility and data-handling requirements.' },
      { q: 'Can multiple sites be reviewed?', a: 'Yes, but each facility’s location, operating constraints, access process, and sampling approach must be reflected in scope.' }
    ],
    visual: 'facility'
  },
  {
    slug: 'cybersecurity-policy-assessment',
    name: 'Cybersecurity Policy Assessment',
    eyebrow: 'Align written expectations with operational reality',
    headline: 'Identify the policy gaps that create unclear ownership and inconsistent security decisions.',
    summary: 'PDDG evaluates approved cybersecurity policies, processes, and procedures for clarity, coverage, alignment, and practical use across the organization.',
    ideal: 'Organizations preparing for audits, formalizing governance, updating outdated documents, or resolving gaps between policy and practice.',
    triggers: ['Policies have not kept pace with technology or roles', 'Audit findings cite documentation or governance gaps', 'Security ownership and exceptions are unclear', 'Multiple documents conflict or duplicate requirements'],
    scope: ['Policy inventory and hierarchy', 'Roles, approvals, and exception handling', 'Alignment to selected frameworks or obligations', 'Operational evidence and stakeholder interviews where included'],
    deliverables: ['Gap and overlap analysis', 'Prioritized policy recommendations', 'Ownership and review-cycle guidance', 'Roadmap for document updates'],
    benefits: ['Clarify accountable decisions', 'Reduce policy-practice disconnects', 'Support more consistent audit readiness'],
    standards: ['NIST Cybersecurity Framework', 'CIS Controls', 'ISO/IEC 27001 concepts', 'Selected regulatory or contractual criteria'],
    related: ['security-awareness-training', 'vulnerability-management', 'physical-security-assessment'],
    faq: [
      { q: 'Does a policy review guarantee compliance?', a: 'No. A policy assessment can identify alignment gaps and improvement priorities, but compliance depends on the applicable requirements, implemented controls, evidence, and legal interpretation.' },
      { q: 'Will PDDG rewrite every policy?', a: 'Document development or revision may be included separately. The assessment scope should distinguish review, recommendations, drafting, and implementation support.' },
      { q: 'Are interviews part of the review?', a: 'Stakeholder interviews may be useful to understand how written requirements operate in practice and are included when agreed during scoping.' }
    ],
    visual: 'policy'
  },
  {
    slug: 'wireless-bluetooth-security-audit',
    name: 'Wireless and Bluetooth Security Audit',
    eyebrow: 'Map the signals that extend beyond the wall',
    headline: 'Understand wireless exposure across networks, devices, and physical space.',
    summary: 'PDDG reviews approved wireless and Bluetooth environments to identify configuration, segmentation, coverage, device, and access weaknesses that may create unintended entry paths.',
    ideal: 'Organizations with guest networks, distributed access points, connected devices, public facilities, or uncertainty about wireless assets.',
    triggers: ['A new site or wireless redesign', 'Unmanaged or unknown access-point concerns', 'Guest and internal network separation questions', 'Bluetooth-enabled operational or customer devices'],
    scope: ['Authorized Wi-Fi networks and access points', 'Encryption, authentication, and segmentation', 'Rogue or unexpected signal review', 'Approved Bluetooth services and device exposure'],
    deliverables: ['Wireless asset and signal observations', 'Configuration and segmentation findings', 'Location-aware evidence where authorized', 'Prioritized hardening recommendations'],
    benefits: ['Reveal exposure that wired inventories miss', 'Validate guest and internal separation', 'Connect radio-frequency risk to facility controls'],
    standards: ['NIST wireless guidance', 'CIS Controls', 'Vendor hardening guidance', 'Organization network policies'],
    related: ['physical-security-assessment', 'vulnerability-assessment', 'penetration-testing'],
    faq: [
      { q: 'Will you attempt to connect to every network?', a: 'No. Testing actions are limited to explicitly authorized networks, devices, methods, locations, and time windows.' },
      { q: 'Can guest Wi-Fi be assessed separately?', a: 'Yes. Guest access, segmentation, captive portals, and paths toward internal resources can be evaluated within an approved scope.' },
      { q: 'Does the audit include Bluetooth devices?', a: 'Bluetooth review is included only for approved devices and services, with safety and operational constraints agreed in advance.' }
    ],
    visual: 'wireless'
  }
];

export type Industry = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  pressures: string[];
  leaders: string[];
  surfaces: string[];
  considerations: string[];
  services: string[];
  value: string[];
  visual: string;
};

export const industries: Industry[] = [
  {
    slug: 'healthcare', name: 'Healthcare', visual: 'health',
    headline: 'Protect clinical continuity while strengthening safeguards around health information.',
    summary: 'Healthcare environments connect protected health information, clinical workflows, medical devices, third parties, and time-sensitive operations. Assessment scope must respect patient care and operational constraints.',
    pressures: ['HIPAA-related safeguards and evidence', 'Ransomware resilience and clinical availability', 'Medical-device and legacy-system constraints', 'Third-party and vendor access'],
    leaders: ['CISO and security leadership', 'CIO and IT operations', 'Privacy and compliance leaders', 'Clinical engineering and risk management'],
    surfaces: ['Identity and remote access', 'Clinical and administrative applications', 'Medical and connected devices', 'Facilities, wireless networks, and vendors'],
    considerations: ['Patient care takes priority over test convenience', 'Protected data should be minimized in evidence', 'Testing windows and escalation paths require clinical coordination', 'HIPAA alignment does not equal guaranteed compliance'],
    services: ['vulnerability-assessment', 'penetration-testing', 'cybersecurity-policy-assessment', 'security-awareness-training'],
    value: ['Prioritized exposure across clinical and business systems', 'Clearer remediation ownership', 'Reporting that supports technical and compliance discussions']
  },
  {
    slug: 'financial-services', name: 'Financial Services', visual: 'finance',
    headline: 'Assess the controls behind customer trust, transactions, and connected financial operations.',
    summary: 'Financial organizations manage sensitive customer information, fraud exposure, complex access models, vendors, and exacting regulatory or contractual expectations.',
    pressures: ['Customer financial-information protection', 'Fraud and account-takeover exposure', 'Third-party and cloud dependencies', 'Regulatory and contractual scrutiny'],
    leaders: ['CISO and security operations', 'CIO and technology leadership', 'Risk, compliance, and audit teams', 'Fraud and identity leaders'],
    surfaces: ['Customer portals and APIs', 'Identity, privileged access, and payments', 'Cloud and vendor connections', 'Employee workflows and facilities'],
    considerations: ['Production transaction paths require conservative safeguards', 'Test data and evidence handling must be defined', 'Third-party boundaries may constrain coverage', 'Assessment supports readiness but does not guarantee compliance'],
    services: ['web-application-security-assessment', 'penetration-testing', 'threat-intelligence-and-monitoring', 'cybersecurity-policy-assessment'],
    value: ['Evidence tied to realistic financial workflows', 'Clearer visibility across technical and human controls', 'Priorities leadership can connect to operational risk']
  },
  {
    slug: 'government', name: 'Government', visual: 'government',
    headline: 'Support mission continuity with assessments shaped around public-sector constraints.',
    summary: 'Government and contractor environments balance sensitive systems, procurement requirements, data classification, operational continuity, and NIST-aligned control expectations.',
    pressures: ['Sensitive public-sector systems and information', 'Procurement and authorization requirements', 'Contractor and shared-responsibility environments', 'Continuity of public services'],
    leaders: ['CISO and security program leaders', 'CIO and infrastructure teams', 'Authorizing and compliance officials', 'Program and contract leadership'],
    surfaces: ['Public-facing systems', 'Identity and administrative access', 'Contractor and partner connections', 'Facilities and wireless infrastructure'],
    considerations: ['Authorization and rules of engagement are foundational', 'Data classification affects evidence handling', 'Tooling and personnel requirements may be contract-specific', 'NIST alignment is scoped to selected controls and evidence'],
    services: ['penetration-testing', 'vulnerability-management', 'physical-security-assessment', 'cybersecurity-policy-assessment'],
    value: ['Mission-aware remediation priorities', 'Technical evidence framed for governance decisions', 'A clearer path from findings to accountable action']
  },
  {
    slug: 'education', name: 'Education', visual: 'education',
    headline: 'Strengthen open, distributed learning environments without losing operational practicality.',
    summary: 'Education combines student and employee information, open networks, distributed devices, research systems, seasonal users, and often-limited internal security capacity.',
    pressures: ['Student and employee information', 'Phishing and account compromise', 'Open networks and unmanaged devices', 'Research data and decentralized technology'],
    leaders: ['CIO and IT directors', 'Security and infrastructure teams', 'Privacy, legal, and risk leaders', 'Academic and administrative technology owners'],
    surfaces: ['Identity and email', 'Learning and administrative platforms', 'Labs, research, and endpoint fleets', 'Campus wireless and physical access'],
    considerations: ['Academic calendars affect testing windows', 'Decentralized ownership requires careful discovery', 'Open-access goals must be balanced with segmentation', 'Evidence collection should minimize student data'],
    services: ['security-awareness-training', 'wireless-bluetooth-security-audit', 'vulnerability-assessment', 'cybersecurity-policy-assessment'],
    value: ['Practical priorities for constrained teams', 'Better visibility across decentralized assets', 'Clearer guidance for staff, faculty, and leadership']
  },
  {
    slug: 'manufacturing', name: 'Manufacturing', visual: 'manufacturing',
    headline: 'Assess connected operations while respecting production safety and uptime.',
    summary: 'Manufacturing security spans operational technology, industrial systems, legacy platforms, vendor remote access, supply-chain dependencies, and production continuity.',
    pressures: ['Production availability and safety', 'Legacy and unsupported systems', 'Vendor and remote-maintenance access', 'Supply-chain and ransomware exposure'],
    leaders: ['CISO and CIO leadership', 'Plant and operations leaders', 'OT engineering and automation teams', 'Risk, safety, and supply-chain leaders'],
    surfaces: ['IT/OT boundaries', 'Industrial workstations and supervisory systems', 'Remote access and vendor pathways', 'Plant wireless and physical controls'],
    considerations: ['Safety and production constraints shape every test action', 'Passive and observational techniques may be preferred', 'Asset ownership often spans IT, OT, and vendors', 'Maintenance windows may determine validation depth'],
    services: ['vulnerability-assessment', 'wireless-bluetooth-security-audit', 'physical-security-assessment', 'cybersecurity-policy-assessment'],
    value: ['Exposure priorities tied to operational consequence', 'Better coordination between IT and plant stakeholders', 'A roadmap that respects production realities']
  },
  {
    slug: 'hospitality', name: 'Hospitality', visual: 'hospitality',
    headline: 'Protect guest trust across properties, payments, people, and connected platforms.',
    summary: 'Hospitality environments combine payment and guest information, property-management systems, extensive wireless access, seasonal staff, franchise or property variation, and third-party platforms.',
    pressures: ['Payment and guest-information protection', 'Property-management and booking platforms', 'Guest and operational wireless separation', 'Seasonal workforce and third-party access'],
    leaders: ['CIO and security leadership', 'Property and operations leaders', 'Finance and payment stakeholders', 'Risk, privacy, and vendor-management teams'],
    surfaces: ['Reservation and property-management systems', 'Payment flows and customer portals', 'Guest, staff, and device networks', 'Physical access and distributed properties'],
    considerations: ['Guest experience and property operations affect test windows', 'Multi-property scope requires consistent sampling', 'Vendor contracts may limit testing authority', 'Seasonal staffing increases awareness and access-review needs'],
    services: ['wireless-bluetooth-security-audit', 'web-application-security-assessment', 'security-awareness-training', 'physical-security-assessment'],
    value: ['Connected visibility from digital booking to on-site access', 'Actionable priorities for corporate and property teams', 'Stronger separation of guest and operational environments']
  }
];

export const resources = [
  { slug: 'penetration-testing-vs-vulnerability-assessment', title: 'Penetration Testing vs. Vulnerability Assessment', excerpt: 'How to choose between broad weakness discovery and controlled validation of attack paths.', read: '6 min', category: 'Assessment planning' },
  { slug: 'what-a-penetration-test-report-should-include', title: 'What a Penetration-Test Report Should Include', excerpt: 'The evidence, context, prioritization, and remediation detail that make a report useful.', read: '5 min', category: 'Reporting' },
  { slug: 'prioritizing-vulnerabilities-by-business-risk', title: 'Prioritizing Vulnerabilities by Business Risk', excerpt: 'Why technical severity alone cannot determine the right remediation sequence.', read: '7 min', category: 'Risk management' },
  { slug: 'cybersecurity-assessment-readiness-checklist', title: 'Cybersecurity Assessment Readiness Checklist', excerpt: 'A practical planning guide for scope, stakeholders, access, evidence, and desired outcomes.', read: '8 min', category: 'Checklist' },
  { slug: 'wireless-security-weaknesses', title: 'Wireless Security Weaknesses to Review', excerpt: 'Common questions around segmentation, access points, encryption, and connected devices.', read: '5 min', category: 'Wireless security' },
  { slug: 'building-an-effective-security-awareness-program', title: 'Building an Effective Security-Awareness Program', excerpt: 'Move beyond annual completion toward role-aware learning and measurable behavior.', read: '6 min', category: 'Human risk' }
] as const;

export const readinessItems = [
  ['Business objectives', 'Define the decisions the assessment should support—not only the systems to scan.'],
  ['Systems and assets in scope', 'List environments, owners, locations, dependencies, and explicit exclusions.'],
  ['Known risks', 'Share relevant concerns without sending sensitive details through a public form.'],
  ['Compliance requirements', 'Identify applicable regulatory, contractual, or framework expectations.'],
  ['Previous assessments', 'Gather prior reports, open findings, exceptions, and remediation evidence.'],
  ['Existing security tools', 'Document scanners, monitoring sources, ticketing workflows, and access owners.'],
  ['Policies and procedures', 'Collect current approved documents and note known gaps or upcoming changes.'],
  ['Key stakeholders', 'Name the business, technical, legal, privacy, and operations contacts needed.'],
  ['Access requirements', 'Plan test accounts, allowlisting, VPN, facilities access, and approval lead time.'],
  ['Desired deliverables', 'Agree on executive, technical, compliance, and remediation audiences.'],
  ['Remediation ownership', 'Identify who can accept, assign, fix, and approve exceptions for findings.'],
  ['Retesting requirements', 'Define whether validation is needed, eligible findings, timing, and evidence format.']
] as const;

export const generalFaq: FAQ[] = [
  { q: 'Which cybersecurity assessment does our organization need?', a: 'Start with the decision you need to make. A vulnerability assessment builds broad visibility, penetration testing validates realistic attack paths, and policy, wireless, physical, training, or monitoring services address different control layers. A fit call can help clarify scope.' },
  { q: 'How long can an assessment take?', a: 'Timing depends on objectives, asset count, locations, access, testing restrictions, stakeholder availability, and reporting depth. PDDG confirms a schedule after discovery and scoping.' },
  { q: 'What information is required before an engagement?', a: 'Useful inputs may include objectives, systems in scope, asset owners, key constraints, prior assessments, applicable requirements, desired deliverables, and the people authorized to approve testing.' },
  { q: 'Can testing be performed remotely?', a: 'Many digital assessments can be performed remotely. Physical reviews, some wireless work, and environments with restricted access may require on-site activity.' },
  { q: 'Can testing disrupt systems?', a: 'Active testing carries some risk. PDDG defines authorization, exclusions, testing windows, stop conditions, and escalation contacts before work begins.' },
  { q: 'How are sensitive findings handled?', a: 'Handling expectations, approved communication channels, evidence minimization, access, retention, and delivery methods should be confirmed during contracting and scoping.' },
  { q: 'What may be included in the final report?', a: 'Depending on scope, a report may include an executive summary, prioritized findings, technical evidence, business-impact context, remediation recommendations, severity rationale, and a remediation or retesting view.' },
  { q: 'Is remediation guidance available?', a: 'Practical remediation recommendations are generally part of assessment reporting. Deeper implementation support depends on the selected engagement.' },
  { q: 'Is retesting available?', a: 'Retesting may be included or added depending on scope, timing, and the findings eligible for validation.' },
  { q: 'Can PDDG support regulated organizations?', a: 'PDDG serves regulated and operationally sensitive sectors. The exact service should be scoped against the organization’s applicable requirements and environment; no assessment by itself guarantees compliance.' },
  { q: 'Can assessments be customized?', a: 'Yes. Objectives, methods, assets, evidence, deliverables, and operational safeguards are established during scoping.' },
  { q: 'What happens during an initial consultation?', a: 'The conversation focuses on current concerns, desired outcomes, environment context, constraints, and which next step may be appropriate. It is exploratory and is not itself a cybersecurity assessment.' }
];

export const requiredPaths = [
  '/', '/services', ...services.map(s => `/services/${s.slug}`), '/industries', ...industries.map(i => `/industries/${i.slug}`),
  '/approach', '/about', '/resources', ...resources.map(r => `/resources/${r.slug}`), '/case-studies', '/case-studies/sanitized-engagement-example',
  '/frequently-asked-questions', '/contact', '/book-a-security-fit-call', '/request-a-sample-report', '/privacy-policy', '/terms-and-conditions',
  '/accessibility-statement', '/thank-you/contact', '/thank-you/security-fit-call', '/thank-you/resource-request'
];

export function findService(slug: string) { return services.find(s => s.slug === slug); }
export function findIndustry(slug: string) { return industries.find(i => i.slug === slug); }
export function findResource(slug: string) { return resources.find(r => r.slug === slug); }
