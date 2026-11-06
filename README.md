# WebX IT Services — Website

A multi-page marketing site built with React, React Router, Tailwind CSS, and Framer Motion.

## Pages
- `/` — Home
- `/about` — About Us
- `/services` — Services (with anchor sections: `#web`, `#mobile`, `#cloud`, `#design`, `#consulting`, `#support`)
- `/portfolio` — Featured Work + Industries
- `/contact` — Contact form

## Structure
```
src/
  shared.jsx          shared styles, animation helpers (Reveal, SpotlightCard, Marquee, etc.)
  App.jsx             layout shell: navbar, routes, page transitions, footer
  main.jsx            BrowserRouter entry point
  components/
    Navbar.jsx         sticky nav with dropdown + animated underline
    Footer.jsx
  pages/
    Home.jsx
    About.jsx
    Services.jsx
    Portfolio.jsx
    Contact.jsx
public/
  logo.png             brand logo
  hero-illustration.png
```

## Getting started
```bash
npm install
npm run dev       # local preview
npm run build     # production build → dist/
```

## Contact form -> email setup (EmailJS)
The Contact page saves every submission to Supabase **and** emails it to `kenil3126@gmail.com`
using [EmailJS](https://www.emailjs.com) (free, no backend server needed). A "Submitted!" popup
shows on screen the moment a message is sent.

No `.env` file and no rebuild needed for this one — the 3 keys go directly inside
`src/lib/emailClient.js` (same idea as pasting an API key into a plain HTML `<script>` tag):

1. Sign up free at emailjs.com.
2. **Email Services** -> Add new service -> connect the Gmail/Outlook inbox you want submissions
   sent from -> copy the **Service ID**.
3. **Email Templates** -> Create new template. Set **To email** to `kenil3126@gmail.com`. Use
   `{{from_name}}`, `{{from_email}}`, `{{message}}` in the template body -> copy the **Template ID**.
4. **Account -> General** -> copy your **Public Key**.
5. Open `src/lib/emailClient.js` and replace the three `"PASTE_YOUR_..._HERE"` placeholders near
   the top of the file with those 3 values, then save.
6. That's it — refresh the page (dev server picks it up automatically) and submit the form again.

If these aren't filled in yet, the form still works and still saves to Supabase — it just skips
the email step (check the browser console for a reminder). Submitting always just shows the
"Submitted!" popup, with no other prompt or email-app pop up of any kind.


## Notes
- Placeholder photography (picsum.photos, i.pravatar.cc) is used in About / Portfolio / Testimonials —
  swap these for real photos before going live.
- Page transitions use Framer Motion's `AnimatePresence`; each route fades/rises in on navigation.
