// ====== 1. YOUR SUPABASE DETAILS ======
const SUPABASE_URL = "https://nednklpoyendpwneolwn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1q9ILYq1e0t5QxNrQ-y76w_nTDh_nRC";
// ========================================================================

// Cloudflare Turnstile SITE key (public, safe here). The SECRET key lives only in Supabase.
const TURNSTILE_SITE_KEY = "0x4AAAAAAGGMAJ1fwVRo_eJD";

// Safety net: if a password-reset link lands on ANY other page, forward it to reset.html (keeping the token).
if (/type=recovery/.test(location.hash) && !location.pathname.includes("reset")) {
  location.replace("reset.html" + location.hash);
}

// True if the page was opened from a password-reset email link (checked before Supabase clears the URL).
const recoveryLink = /type=recovery/.test(location.hash) || /type=recovery/.test(location.search);
const configured = !SUPABASE_URL.startsWith("PASTE");
const sb = configured ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

async function initNav() {
  const slot = document.getElementById("authSlot");
  if (!slot) return;
  let user = null;
  if (sb) { const { data } = await sb.auth.getSession(); user = data.session && data.session.user; }
  slot.innerHTML = user
    ? '<a class="btn p sm" href="account.html">My Account</a>'
    : '<a class="btn o sm" href="account.html">Log in</a><a class="btn p sm" href="account.html#signup">Sign up</a>';
  const warn = document.getElementById("setupWarn");
  if (warn && !configured) warn.style.display = "block";
}
document.addEventListener("DOMContentLoaded", initNav);
