// ====== 1. PASTE YOUR SUPABASE DETAILS HERE (see the setup guide) ======
const SUPABASE_URL = "https://nednklpoyendpwneolwn.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lZG5rbHBveWVuZHB3bmVvbHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NjA2NjksImV4cCI6MjEwNzIzNjY2OX0.CBrsWszbdU65uxnLFVUdoxUU6ht1fy13llnMhnSa_ao";
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
