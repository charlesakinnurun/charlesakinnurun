# Conversation screenshots

Drop consented, privacy-checked Google Meet screenshots here.

## Naming

Use clear, lowercase filenames, for example:

- `google-meet.jpg`
- `goldman-sachs-meet.jpg`
- `ml-engineer-meet.jpg`

Reference them in `data/conversations.js` as:

```js
image: "/images/conversations/google-meet.jpg",
imageApproved: true,
```

## Privacy checklist (do before setting `imageApproved: true`)

1. The other person consented to the screenshot being public.
2. Redact email addresses, phone numbers, meeting links/codes,
   private chat messages, and any other personal information —
   publish the **redacted** version, not the raw capture.
3. Use initials or first name only in `data/conversations.js`
   if full-name publicity was not agreed.
4. Prefer `.jpg` (photos) under ~500KB so cards stay fast.
   Next.js `<Image>` handles optimization; no config change needed
   for files under `/public`.

A conversation with no `image` (or with `imageApproved` unset/false)
renders a tasteful "coming soon" placeholder — never a fake screenshot.
