# Quick Deployment Guide — Accurate Consultancy

Follow these steps to deploy your website to www.accurate-consultancy.com

## Step 1: Extract & Test Locally (5 minutes)

1. **Unzip** the `accurate-consultancy.zip` file
2. **Open terminal/command prompt** in the extracted folder
3. **Run these commands:**
   ```bash
   npm install
   npm run dev
   ```
4. **Open browser** to http://localhost:3000 — you should see your website
5. **Press Ctrl+C** to stop the dev server

✅ If you see the website with your logo, proceed to Step 2.

---

## Step 2: Push to GitHub (5 minutes)

1. **Go to** [github.com](https://github.com) and sign in (or create account)
2. **Click** the `+` icon (top right) → **New repository**
3. **Name it:** `accurate-consultancy`
4. **Keep it Public** (or Private if you have a paid plan)
5. **Click** "Create repository"
6. **Back in your terminal** (in the project folder), run:

```bash
git init
git add .
git commit -m "Initial commit - Accurate Consultancy website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/accurate-consultancy.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

✅ Refresh your GitHub repo page — you should see all the files.

---

## Step 3: Deploy on Vercel (3 minutes)

1. **Go to** [vercel.com](https://vercel.com)
2. **Click** "Sign Up" → choose **"Continue with GitHub"**
3. **Authorize** Vercel to access your GitHub
4. **Click** "Add New..." → "Project"
5. **Find** your `accurate-consultancy` repo → click **Import**
6. Vercel auto-detects settings. Just click **Deploy**
7. **Wait 60 seconds** — deployment complete!
8. **Click** "Visit" to see your live site (URL will be like `accurate-consultancy.vercel.app`)

✅ Your website is now live on the internet!

---

## Step 4: Connect Your Domain (10 minutes + DNS wait)

### A. In Vercel

1. **Click** your project → **Settings** → **Domains**
2. **Type** `accurate-consultancy.com` → click **Add**
3. **Type** `www.accurate-consultancy.com` → click **Add**
4. Vercel will show you **DNS records** you need to add. Keep this tab open.

### B. In Your Domain Registrar

(Examples: GoDaddy, Namecheap, Google Domains, PKNIC)

1. **Log into** your domain registrar where you bought `accurate-consultancy.com`
2. **Find** DNS settings / DNS management
3. **Add these records** (copy from Vercel):
   - **Type:** A  
     **Name:** @  
     **Value:** 76.76.21.21
   
   - **Type:** CNAME  
     **Name:** www  
     **Value:** cname.vercel-dns.com
   
4. **Save** changes

### C. Wait for DNS Propagation

- **Normal:** 10-60 minutes
- **Sometimes:** Up to 24 hours
- **Check progress:** Visit your domain every 30 minutes

✅ When DNS is ready, visiting `www.accurate-consultancy.com` will show your website!

---

## Step 5: Enable Contact Form (5 minutes)

The booking form currently shows a "thank you" but doesn't email you. Fix this:

1. **Go to** [formspree.io](https://formspree.io) → Sign up (free plan is fine)
2. **Click** "New Form" → name it "Accurate Consultancy Contact"
3. **Copy** your form endpoint (looks like `https://formspree.io/f/abc123xyz`)
4. **Open** `src/App.jsx` in a code editor
5. **Find** this function (around line 1070):
   ```js
   const handleSubmit = (e) => {
     e.preventDefault();
     setSubmitted(true);
     // ...rest of code
   ```
6. **Replace** the entire `handleSubmit` function with:
   ```js
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const res = await fetch('https://formspree.io/f/YOUR-FORM-ID', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(form),
       });
       if (res.ok) {
         setSubmitted(true);
         setTimeout(() => setSubmitted(false), 5000);
         setForm({ name: '', email: '', phone: '', country: '', service: '', message: '' });
       }
     } catch (err) {
       console.error('Form error:', err);
     }
   };
   ```
7. **Replace** `YOUR-FORM-ID` with your actual Formspree ID
8. **Save** the file
9. **In terminal:**
   ```bash
   git add .
   git commit -m "Wire up contact form to Formspree"
   git push
   ```

Vercel will auto-deploy in 60 seconds. Test by submitting the form — you'll get an email!

---

## Troubleshooting

### "npm: command not found"
- **Install Node.js** from [nodejs.org](https://nodejs.org) (download the LTS version)

### "git: command not found"
- **Install Git** from [git-scm.com](https://git-scm.com/downloads)

### DNS not updating after 24 hours
- **Check** you added records to the RIGHT domain (not a subdomain)
- **Check** nameservers point to your registrar (not parked/transferred elsewhere)
- **Contact** your registrar support

### Website shows old version after updating
- **In Vercel:** Project → Deployments → click latest → Redeploy
- **Clear browser cache:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **GitHub Help:** https://docs.github.com
- **Formspree Help:** https://help.formspree.io

Your website is production-ready. Everything else (testimonials, blog posts, success stories) can be updated gradually by editing `src/App.jsx` and pushing to GitHub.
