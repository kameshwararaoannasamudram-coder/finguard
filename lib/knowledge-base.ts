export interface KnowledgeEntry {
  id: string
  category: "risks" | "compliance" | "regulatory" | "recommendation"
  title: string
  severity?: "critical" | "high" | "medium" | "low"
  status?: "active" | "mitigated" | "pending" | "resolved"
  description: string
  framework?: string
  region?: string
  recommendation?: string
  lastUpdated: string
}

export const knowledgeBase: KnowledgeEntry[] = [
  // Risks
  {
    id: "RSK-001",
    category: "risks",
    title: "Third-Party Vendor Data Breach",
    severity: "critical",
    status: "active",
    description:
      "High probability of data exposure through third-party vendor integrations lacking proper encryption protocols. Affects customer PII across 3 vendor systems.",
    framework: "NIST CSF",
    recommendation:
      "Implement end-to-end encryption for all vendor data exchanges and conduct quarterly vendor security assessments.",
    lastUpdated: "2026-02-01",
  },
  {
    id: "RSK-002",
    category: "risks",
    title: "Insider Threat - Privileged Access Abuse",
    severity: "high",
    status: "active",
    description:
      "12 admin accounts with unrestricted access to production databases. No PAM solution in place. Audit logs show 3 anomalous access patterns in last 30 days.",
    framework: "ISO 27001",
    recommendation:
      "Deploy Privileged Access Management (PAM), enforce MFA for all admin accounts, and implement just-in-time access provisioning.",
    lastUpdated: "2026-01-28",
  },
  {
    id: "RSK-003",
    category: "risks",
    title: "Cloud Misconfiguration - S3 Buckets",
    severity: "high",
    status: "mitigated",
    description:
      "7 S3 buckets identified with public read access containing internal documents. Remediation in progress, 4 buckets secured.",
    framework: "CIS Benchmarks",
    recommendation:
      "Complete remediation of remaining 3 buckets. Implement automated cloud posture management (CSPM) tools.",
    lastUpdated: "2026-01-25",
  },
  {
    id: "RSK-004",
    category: "risks",
    title: "Supply Chain Software Vulnerability",
    severity: "medium",
    status: "pending",
    description:
      "Outdated dependencies detected in 15 microservices. 3 dependencies have known CVEs with CVSS scores above 7.0.",
    framework: "NIST CSF",
    recommendation:
      "Implement automated dependency scanning in CI/CD pipeline and establish a 48-hour SLA for critical vulnerability patching.",
    lastUpdated: "2026-02-05",
  },
  {
    id: "RSK-005",
    category: "risks",
    title: "Business Continuity - Single Point of Failure",
    severity: "medium",
    status: "active",
    description:
      "Primary payment processing system has no failover. Estimated revenue loss of $2.3M per hour of downtime.",
    framework: "ISO 22301",
    recommendation:
      "Implement active-passive failover architecture and conduct quarterly disaster recovery drills.",
    lastUpdated: "2026-01-20",
  },

  // Compliance
  {
    id: "CMP-001",
    category: "compliance",
    title: "GDPR Data Subject Rights - Non-Compliance",
    severity: "critical",
    status: "active",
    description:
      "Average response time for DSARs is 45 days, exceeding the 30-day GDPR mandate. 23 pending requests in backlog.",
    framework: "GDPR Art. 15-22",
    region: "EU",
    recommendation:
      "Automate DSAR processing workflow, hire additional DPO staff, and implement self-service data portal for subjects.",
    lastUpdated: "2026-02-03",
  },
  {
    id: "CMP-002",
    category: "compliance",
    title: "SOC 2 Type II - Access Control Gaps",
    severity: "high",
    status: "pending",
    description:
      "Annual SOC 2 audit revealed 8 access control deficiencies. Quarterly access reviews not conducted for 2 departments.",
    framework: "SOC 2 (CC6.1)",
    recommendation:
      "Implement automated access review tool, assign department-level compliance champions, and schedule monthly mini-audits.",
    lastUpdated: "2026-01-30",
  },
  {
    id: "CMP-003",
    category: "compliance",
    title: "PCI DSS - Encryption at Rest",
    severity: "high",
    status: "active",
    description:
      "Two legacy database systems storing cardholder data lack AES-256 encryption at rest. Affects approximately 150K records.",
    framework: "PCI DSS 4.0 (Req. 3)",
    recommendation:
      "Migrate legacy databases to encrypted storage, implement key rotation, and validate with QSA.",
    lastUpdated: "2026-02-02",
  },
  {
    id: "CMP-004",
    category: "compliance",
    title: "HIPAA - Audit Logging Incomplete",
    severity: "medium",
    status: "mitigated",
    description:
      "EHR system audit logs missing for 3 modules. Partial remediation completed, 1 module still pending.",
    framework: "HIPAA (164.312)",
    recommendation:
      "Complete audit log implementation for remaining module and deploy SIEM integration for real-time monitoring.",
    lastUpdated: "2026-01-22",
  },
  {
    id: "CMP-005",
    category: "compliance",
    title: "ISO 27001 - Incident Response Plan",
    severity: "medium",
    status: "resolved",
    description:
      "Incident response plan updated and tested. All team members trained on new procedures. Tabletop exercise completed.",
    framework: "ISO 27001 (A.16)",
    recommendation:
      "Schedule next tabletop exercise for Q2 2026 and update contact trees quarterly.",
    lastUpdated: "2026-01-15",
  },

  // Regulatory
  {
    id: "REG-001",
    category: "regulatory",
    title: "EU AI Act - High-Risk System Classification",
    severity: "critical",
    status: "active",
    description:
      "Credit scoring AI model classified as high-risk under EU AI Act. Mandatory conformity assessment required by August 2026.",
    framework: "EU AI Act (Art. 6)",
    region: "EU",
    recommendation:
      "Engage external assessor, prepare technical documentation, implement human oversight mechanisms, and establish post-market monitoring.",
    lastUpdated: "2026-02-06",
  },
  {
    id: "REG-002",
    category: "regulatory",
    title: "SEC Cybersecurity Disclosure Rules",
    severity: "high",
    status: "active",
    description:
      "New SEC rules require material cybersecurity incident disclosure within 4 business days. Current process averages 12 days.",
    framework: "SEC Rule 10-K/8-K",
    region: "US",
    recommendation:
      "Establish rapid incident triage committee, pre-draft disclosure templates, and implement automated materiality assessment.",
    lastUpdated: "2026-02-04",
  },
  {
    id: "REG-003",
    category: "regulatory",
    title: "DORA - ICT Risk Management",
    severity: "high",
    status: "pending",
    description:
      "Digital Operational Resilience Act requires comprehensive ICT risk framework for financial entities by January 2027.",
    framework: "DORA (EU 2022/2554)",
    region: "EU",
    recommendation:
      "Map all ICT dependencies, establish third-party risk registers, and implement resilience testing program.",
    lastUpdated: "2026-01-31",
  },
  {
    id: "REG-004",
    category: "regulatory",
    title: "CCPA/CPRA - Consumer Data Rights",
    severity: "medium",
    status: "active",
    description:
      "CPRA amendments require updated data retention policies and opt-out mechanisms for data sharing by March 2026.",
    framework: "CCPA/CPRA",
    region: "US (California)",
    recommendation:
      "Update privacy policy, implement universal opt-out mechanism, and conduct data mapping for all sharing arrangements.",
    lastUpdated: "2026-02-01",
  },
  {
    id: "REG-005",
    category: "regulatory",
    title: "APAC Data Localization Requirements",
    severity: "medium",
    status: "pending",
    description:
      "Multiple APAC jurisdictions now require local data storage. Currently routing through US data centers for 3 countries.",
    framework: "Various (PDPA, PIPL, APPs)",
    region: "APAC",
    recommendation:
      "Provision regional data centers in Singapore and Tokyo, implement data residency controls, and update DPAs.",
    lastUpdated: "2026-01-27",
  },

  // Recommendations
  {
    id: "REC-001",
    category: "recommendation",
    title: "Implement Zero Trust Architecture",
    severity: "high",
    status: "pending",
    description:
      "Current perimeter-based security model is insufficient. Zero Trust would address 60% of identified risk items.",
    recommendation:
      "Phase 1: Identity-centric access controls. Phase 2: Microsegmentation. Phase 3: Continuous verification.",
    lastUpdated: "2026-02-07",
  },
  {
    id: "REC-002",
    category: "recommendation",
    title: "Unified GRC Platform Deployment",
    severity: "medium",
    status: "pending",
    description:
      "Currently using 5 separate tools for GRC management. Consolidation would improve efficiency by 40% and reduce costs.",
    recommendation:
      "Evaluate ServiceNow GRC, Archer, or OneTrust. Target Q3 2026 for vendor selection and Q4 for initial deployment.",
    lastUpdated: "2026-02-05",
  },
  {
    id: "REC-003",
    category: "recommendation",
    title: "Automated Compliance Monitoring",
    severity: "high",
    status: "active",
    description:
      "Manual compliance checks consume 120 person-hours monthly. Automation can reduce this by 75% while improving coverage.",
    recommendation:
      "Deploy continuous compliance monitoring using policy-as-code. Integrate with CI/CD pipeline for shift-left compliance.",
    lastUpdated: "2026-02-03",
  },
  {
    id: "REC-004",
    category: "recommendation",
    title: "Security Awareness Training Enhancement",
    severity: "medium",
    status: "active",
    description:
      "Current phishing simulation click rate is 18%. Industry benchmark is below 5%. Training frequency is annual.",
    recommendation:
      "Move to quarterly micro-training modules, implement role-based training paths, and conduct monthly phishing simulations.",
    lastUpdated: "2026-01-29",
  },
  {
    id: "REC-005",
    category: "recommendation",
    title: "Third-Party Risk Continuous Monitoring",
    severity: "high",
    status: "pending",
    description:
      "Point-in-time vendor assessments miss 70% of emerging risks. Need continuous monitoring for 150+ critical vendors.",
    recommendation:
      "Implement SecurityScorecard or BitSight for continuous vendor monitoring. Establish risk-tiered assessment cadence.",
    lastUpdated: "2026-02-06",
  },
]

export function getEntriesByCategory(
  category: KnowledgeEntry["category"]
): KnowledgeEntry[] {
  return knowledgeBase.filter((entry) => entry.category === category)
}

export function searchKnowledgeBase(query: string): KnowledgeEntry[] {
  const lowerQuery = query.toLowerCase()
  return knowledgeBase.filter(
    (entry) =>
      entry.title.toLowerCase().includes(lowerQuery) ||
      entry.description.toLowerCase().includes(lowerQuery) ||
      (entry.framework && entry.framework.toLowerCase().includes(lowerQuery)) ||
      (entry.recommendation &&
        entry.recommendation.toLowerCase().includes(lowerQuery)) ||
      (entry.region && entry.region.toLowerCase().includes(lowerQuery))
  )
}

export function getKnowledgeBaseAsContext(
  category?: KnowledgeEntry["category"]
): string {
  const entries = category
    ? getEntriesByCategory(category)
    : knowledgeBase
  return entries
    .map(
      (e) =>
        `[${e.id}] ${e.title} | Category: ${e.category} | Severity: ${e.severity || "N/A"} | Status: ${e.status || "N/A"} | Framework: ${e.framework || "N/A"} | Region: ${e.region || "N/A"} | Description: ${e.description} | Recommendation: ${e.recommendation || "N/A"} | Last Updated: ${e.lastUpdated}`
    )
    .join("\n\n")
}
