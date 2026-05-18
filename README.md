# Accurate Consultancy — Premium Immigration Website

A production-ready React + Vite + Tailwind CSS website for **Accurate Consultancy**, a premium immigration and global mobility consultancy. Designed with a luxury navy + gold aesthetic, fully responsive, and deployment-ready for Vercel.

> **Live brand**: accurate-consultancy.com  
> **Email**: info@accurate-consultancy.com  
> **WhatsApp**: +92 316 0285386 · +92 303 0411114

---

## Tech Stack

- **React 18** with state-based routing (no router dependency)
- **Vite 5** for blazing-fast builds and HMR
- **Tailwind CSS 3** with custom brand theme (navy, royal blue, gold)
- **Framer Motion** for smooth page transitions
- **Lucide React** for consistent icon set
- Custom CSS animations (rotating globe, floating planes, visa stamps, counters)

---

## Project Structure

```
accurate-consultancy/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── App.jsx           # Main application (all pages and components)
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind directives + custom CSS
├── index.html            # SEO meta tags, Open Graph, structured data
├── package.json
├── vite.config.js        # Vite config with code splitting
├── tailwind.config.js    # Brand colors, fonts, custom animations
├── postcss.config.js
├── vercel.json           # Vercel deployment config + headers
├── .eslintrc.cjs
├── .gitignore
└── README.md
```

---

## Pages Included

| Page | Path |
|------|------|
| Home | `/` (hero, why us, programs, countries, study abroad, business, airline & tours, testimonials, stats, eligibility checker, FAQ, booking) |
| About Us | state: `about` |
| Immigration Services | state: `immigration` |
| Study Abroad | state: `study` |
| Business Setup | state: `business` |
| Tourist Visas | state: `tourist` |
| Countries | state: `countries` |
| Success Stories | state: `stories` |
| Blog | state: `blog` |
| Contact Us | state: `contact` |

---

## Local Development

### Prerequisites
- **Node.js 18+** and npm

### Setup

```bash
# Clone or extract this folder, then:
cd accurate-consultancy

# Install dependencies
npm install

# Start dev server (opens on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment to Vercel

### Option 1: GitHub + Vercel Dashboard (recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/accurate-consultancy.git
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click **Add New Project** → import your repo
   - Vercel auto-detects Vite. Click **Deploy**
   - You'll get a URL like `accurate-consultancy.vercel.app` in ~60 seconds

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel               # follow prompts → preview deployment
vercel --prod        # production deployment
```

### Connecting your custom domain

1. In Vercel: **Project → Settings → Domains**
2. Add `accurate-consultancy.com` and `www.accurate-consultancy.com`
3. Vercel shows you the DNS records to add at your registrar:
   - **A record** for root: `76.76.21.21`
   - **CNAME** for www: `cname.vercel-dns.com`
4. Add those records in your domain registrar's DNS panel
5. Wait 10 minutes to a few hours for DNS propagation
6. SSL is auto-issued by Vercel

---

## Customisation

### Brand contact details
Edit the `BRAND` object at the top of `src/App.jsx`:

```js
const BRAND = {
  name: 'Accurate Consultancy',
  domain: 'accurate-consultancy.com',
  email: 'info@accurate-consultancy.com',
  phone1: '+92 316 0285386',
  phone2: '+92 303 0411114',
  whatsapp1: '923160285386',
  whatsapp2: '923030411114',
};
```

### Logo
The logo is located at `public/logo.png`. To update:
- Replace `public/logo.png` with your new logo file
- For best results, use a transparent PNG with the logo + text lockup
- Current logo displays at height: 48px in navigation, 64px in footer
- The logo is also used for Open Graph social sharing previews

### Brand colors
Edit `tailwind.config.js` → `theme.extend.colors` and the CSS variables in `src/index.css`.

### Booking form (IMPORTANT)
The booking form currently shows a "thank you" message on submit but does **not** send emails. To wire it up, you have several options:

**Option A — Formspree (easiest, ~5 minutes)**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form, get your endpoint (e.g. `https://formspree.io/f/abc123`)
3. In `src/App.jsx`, find the `handleSubmit` function in `BookingForm` and replace with:
   ```js
   const handleSubmit = async (e) => {
     e.preventDefault();
     const res = await fetch('https://formspree.io/f/YOUR-ID', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
       body: JSON.stringify(form),
     });
     if (res.ok) {
       setSubmitted(true);
       setTimeout(() => setSubmitted(false), 5000);
       setForm({ name: '', email: '', phone: '', country: '', service: '', message: '' });
     }
   };
   ```

**Option B — Web3Forms** (free, no signup limits) — see [web3forms.com](https://web3forms.com)

**Option C — EmailJS** — for client-side email sending without a backend

### SEO
- Update `index.html` meta tags (title, description, OG image URL)
- Replace placeholder `og-image.jpg` with a real branded image (1200×630px) in `public/`
- Update `public/sitemap.xml` URLs if your routes change
- Update structured data JSON-LD in `index.html` with your real social profile URLs

### Adding real images
The site currently uses CSS-only decoration. To add real photos:
1. Drop images into `public/images/`
2. Reference as `/images/your-photo.jpg` in JSX
3. Recommended: Unsplash for high-quality free stock; or hire a brand photographer

---

## Performance

The site is optimised for fast loads:
- Code split into `react-vendor`, `motion`, and `icons` chunks
- Fonts preconnected
- CSS-only animations where possible (low CPU)
- All animations respect `prefers-reduced-motion` indirectly through Framer Motion defaults

Run `npm run build` then `npm run preview` to test the production bundle locally.

---

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- iOS Safari 14+
- Android Chrome 90+

---

## License

Proprietary — © Accurate Consultancy. All rights reserved.
