import emailjs from "@emailjs/browser";

// EmailJS lets the site send real email with no backend server — same idea as
// pasting an API key straight into a plain HTML <script> tag, just kept in its
// own file here since this project is React/Vite. No .env file, no rebuild —
// paste your 3 values below and save; the very next form submit will use them.
//
// Where to get them (free account at https://www.emailjs.com):
//   SERVICE_ID  -> Email Services  -> Add New Service (Gmail) -> Service ID
//   TEMPLATE_ID -> Email Templates -> Create New Template     -> Template ID
//                  (set this template's "To Email" field to kenil3126@gmail.com)
//   PUBLIC_KEY  -> your profile icon (top-right) -> Account -> General -> Public Key
const SERVICE_ID = "PASTE_YOUR_SERVICE_ID_HERE";
const TEMPLATE_ID = "PASTE_YOUR_TEMPLATE_ID_HERE";
const PUBLIC_KEY = "PASTE_YOUR_PUBLIC_KEY_HERE";

export const isEmailConfigured =
  !SERVICE_ID.startsWith("PASTE_") && !TEMPLATE_ID.startsWith("PASTE_") && !PUBLIC_KEY.startsWith("PASTE_");

// Sends the submitted contact-form fields as an email.
// Resolves quietly (never throws) so a missing/misconfigured EmailJS setup
// never blocks the on-page "Submitted" confirmation or the Supabase save.
export async function sendContactEmail({ name, email, message }) {
  if (!isEmailConfigured) {
    console.warn(
      "EmailJS is not configured — open src/lib/emailClient.js and paste in your 3 EmailJS keys to receive submissions by email."
    );
    return { ok: false, skipped: true };
  }
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        message,
        to_email: "kenil3126@gmail.com",
      },
      { publicKey: PUBLIC_KEY }
    );
    return { ok: true };
  } catch (err) {
    console.error("EmailJS send failed:", err);
    return { ok: false, error: err };
  }
}

