# Wela website - setup guide (do these in order)

Total cost: $0 (besides the domain you already bought).
Pieces: GitHub Pages hosts the website. Supabase is the database and handles accounts.

## Part 1 - Database (Supabase)
1. Go to supabase.com, sign up, click **New project**. Name it `wela`, set a database password (save it), pick the region closest to you, Free plan.
2. When it finishes loading, open **SQL Editor** > **New query**, paste everything from `supabase_setup.sql`, click **Run**. It should say "Success".
3. Go to **Project Settings > API**. Copy the **Project URL** and the **anon public** key.
4. Open `app.js` and paste them over `PASTE_YOUR_PROJECT_URL` and `PASTE_YOUR_ANON_PUBLIC_KEY`. (The anon key is meant to be public. Never paste the "service_role" key anywhere.)
5. **Authentication > URL Configuration**: set **Site URL** to `https://wela.pro` and add `https://wela.pro/account.html` under Redirect URLs.

## Part 2 - Put the site online (GitHub Pages)
1. On github.com click **New repository**. Name it `wela-site`, make it **Public**.
2. Click **uploading an existing file**, drag in ALL files from this folder (including `CNAME`), click **Commit changes**.
3. Repo **Settings > Pages**: Source = **Deploy from a branch**, Branch = `main`, folder `/ (root)`, Save.

## Part 3 - Point wela.pro at it (Namecheap)
1. Namecheap > **Domain List** > **Manage** next to wela.pro > **Advanced DNS** tab.
2. Delete any existing parking records (the default "URL Redirect" / parking CNAME).
3. Add these **A Records** (Host `@`), one each:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
4. Add one **CNAME Record**: Host `www`, Value `YOUR-GITHUB-USERNAME.github.io`
5. Back in GitHub **Settings > Pages**, type `wela.pro` under Custom domain, Save. Wait for the green check (a few minutes up to a few hours), then tick **Enforce HTTPS**.

## Part 4 - Test it
- Visit https://wela.pro. Sign up with a real email, click the confirmation email, log in, and check the Account page shows FREE.
- Try signing up again with the same email. It should say the email already has an account.
- Supabase **Table Editor > profiles** shows every account.
- To make someone Pro for now: edit their row and change `plan` to `pro`. (Payments come later.)

## Notes
- Supabase free projects pause after about a week with no activity; un-pause with one click in the dashboard. Fine while testing.
- Supabase's built-in confirmation email has a low send limit. We'll connect a proper email sender before launch.
