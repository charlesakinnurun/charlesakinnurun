/**
 * Industry Conversations data.
 *
 * Each entry describes a professional networking / knowledge-sharing
 * conversation. These are NOT employment, endorsement, mentorship, or
 * official affiliation — just conversations.
 *
 * @typedef {Object} Conversation
 * @property {string} id - Stable slug, e.g. "google-ml-engineer".
 * @property {string} name - Person's display name. Use initials or first
 *   name only if they did not consent to full-name + screenshot publicity.
 * @property {string} role - Job title/role, e.g. "Software Engineer".
 * @property {string} company - Employer name, e.g. "Google".
 * @property {string} [companyLogo] - Optional path to a company identifier
 *   image in /public, e.g. "/google_logo.jpg".
 * @property {string} date - Month of conversation, e.g. "September 2026".
 * @property {string} description - 1-2 sentences on what was discussed.
 * @property {string} [profileUrl] - Optional LinkedIn/profile link.
 * @property {string} [image] - Optional Google Meet screenshot path under
 *   /public/images/conversations/, e.g. "/images/conversations/google-meet.jpg".
 *   Omit (or leave null) when no screenshot is approved for display.
 * @property {string} [imageAlt] - Alt text for the screenshot.
 * @property {boolean} [imageApproved] - Set true only when the other person
 *   consented AND the image was checked for sensitive content (emails, phone
 *   numbers, meeting links, private messages). The card only renders the
 *   screenshot when image + imageApproved are both set. Store a redacted
 *   version of the file if the raw capture contains private information.
 */

// ---------------------------------------------------------------------------
// Add a conversation by appending an entry here. Two examples (commented out
// so nothing fake renders) show the shape:
//
// {
//   id: "google-ml-engineer",
//   name: "Jane Doe",
//   role: "Software Engineer",
//   company: "Google",
//   companyLogo: "/google_logo.jpg",
//   date: "September 2026",
//   description: "Discussed machine learning engineering, career growth, and working in AI.",
//   profileUrl: "https://www.linkedin.com/in/...",
//   image: "/images/conversations/google-meet.jpg",
//   imageAlt: "Google Meet call screenshot (redacted) with a Google software engineer",
//   imageApproved: true,
// },
// ---------------------------------------------------------------------------

export const conversations = [
  // -- Add your conversations here. Leave empty until real ones are added. --
];

/**
 * Data-driven header stat. Update `totalLabel` as you add conversations.
 * `total` is derived from `conversations.length` when it is non-zero so the
 * count can never drift; the "10+" style label is an explicit override you
 * control for milestone display.
 */
export const conversationStats = {
  /** Override label shown big at the top, e.g. "10+ Industry Conversations". */
  totalLabel: "10+ Industry Conversations",
  /** Supporting line under the stat. */
  supportingText: "Engineers • Founders • Researchers • AI/ML Professionals",
};
