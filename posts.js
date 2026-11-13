/*
  LinkedIn posts shown in the "Lately on LinkedIn" section.

  To swap a post:
    1. On LinkedIn, open the post's "..." menu and choose "Embed this post".
    2. Copy the URL inside src="..." — it looks like
       https://www.linkedin.com/embed/feed/update/urn:li:share:1234567890123456789
    3. Paste the urn part (urn:li:share:... or urn:li:activity:...) below.
       Put the newest post first. "topic" is a short label for screen readers.
       (Shortcut: on your activity page the post's own link ends in
       urn:li:activity:..., and that works here too.)

  Leave the list empty and the section shows a link to your profile instead.
*/
window.LINKEDIN_POSTS = [
  { urn: "urn:li:activity:7526810718365630465", topic: "Thoughts on the Microsoft 365 outage" },
  { urn: "urn:li:activity:7520270378175332352", topic: "My second NEPA Networkers event" },
  { urn: "urn:li:activity:7516239837255901184", topic: "One month at Penn State Hazleton" },
];
