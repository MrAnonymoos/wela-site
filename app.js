// ====== 1. PASTE YOUR SUPABASE DETAILS HERE (see the setup guide) ======
const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL";
const SUPABASE_ANON_KEY = "PASTE_YOUR_ANON_PUBLIC_KEY";
// ========================================================================
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
