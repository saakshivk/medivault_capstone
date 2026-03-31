var STORE = {
    SESSION: "mv_session",
    USERS: "mv_users",
    RECORDS: "mv_records",
    HEALTH: "mv_health",
    TABLETS: "mv_tablets",
    APPTS: "mv_appts",
    PROFILES: "mv_profiles"
};

function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
}
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function getSession() { return load(STORE.SESSION, null); }
function requireUser() {
    var s = getSession();
    if (!s || !s.email) location.href = "login.html";
    return s;
}
function logout() { localStorage.removeItem(STORE.SESSION); location.href = "login.html"; }
function fmtDate(iso) { if (!iso) return "—"; return new Date(iso).toLocaleString(); }
function isValidGmail(email) {
    return /^[^\s@]+@(gmail\.com|yahoo\.com|icloud\.com)$/i.test((email || "").trim());
}
function isValidPhone10(phone) { return /^\d{10}$/.test((phone || "").trim()); }
function isAlphabeticName(name) {
    return /^[A-Za-z\s]+$/.test((name || "").trim());
}
function isValidSixDigitPassword(password) {
    return /^\d{1,6}$/.test(String(password || "").trim());
}
function normalizePasswordToSixDigits(value) {
    return String(value || "").replace(/\D/g, "").slice(0, 6);
}
function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
}
function isStrictAlphabeticName(value) {
    return /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(String(value || "").trim());
}
function isValidAge(value) {
    var age = Number(value);
    return Number.isFinite(age) && age >= 1 && age <= 120 && Math.floor(age) === age;
}
function daysBetween(a, b) {
    var x = new Date(a); x.setHours(0, 0, 0, 0);
    var y = new Date(b); y.setHours(0, 0, 0, 0);
    return Math.floor((x - y) / 86400000);
}
function patientId(email) {
    var profiles = load(STORE.PROFILES, {});
    if (!profiles[email]) {
        profiles[email] = { patientId: "MV-" + Math.floor(100000 + Math.random() * 900000), fullname: "" };
        save(STORE.PROFILES, profiles);
    }
    return profiles[email].patientId;
}
function ensureUsageCount(t, todayIso) {
    if (!t.lastReducedOn) t.lastReducedOn = todayIso;
    var diff = daysBetween(todayIso, t.lastReducedOn);
    if (diff > 0 && t.stock > 0) {
        t.stock = Math.max(0, t.stock - (diff * Number(t.perDay || 0)));
        t.lastReducedOn = todayIso;
    }
}

// UI-only: collapsible sidebar toggle (no backend changes).
(function () {
    var SIDEBAR_OPEN_KEY = "mv_sidebar_open";

    function wire() {
        var toggle = document.getElementById("sidebarToggle");
        if (!toggle) return;

        // Create overlay element once (click-to-close).
        var overlay = document.getElementById("sidebarOverlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "sidebarOverlay";
            document.body.appendChild(overlay);
        }

        var prevBodyOverflow = document.body.style.overflow;
        var prevHtmlOverflow = document.documentElement.style.overflow;

        function syncUI() {
            var collapsed = document.body.classList.contains("sidebar-collapsed");
            toggle.setAttribute("aria-expanded", String(!collapsed));
            if (!collapsed) {
                // Prevent background scroll while the drawer is open.
                document.body.style.overflow = "hidden";
                document.documentElement.style.overflow = "hidden";
            } else {
                document.body.style.overflow = prevBodyOverflow || "";
                document.documentElement.style.overflow = prevHtmlOverflow || "";
            }
        }

        // Persist drawer state across page navigation.
        var open = localStorage.getItem(SIDEBAR_OPEN_KEY) === "1";
        if (open) document.body.classList.remove("sidebar-collapsed");
        else document.body.classList.add("sidebar-collapsed");
        syncUI();

        function setOpenState(isOpen) {
            localStorage.setItem(SIDEBAR_OPEN_KEY, isOpen ? "1" : "0");
        }

        toggle.addEventListener("click", function () {
            var collapsed = document.body.classList.toggle("sidebar-collapsed");
            toggle.setAttribute("aria-expanded", String(!collapsed));
            setOpenState(!collapsed);
            syncUI();
        });

        // Click outside on overlay closes the sidebar.
        overlay.addEventListener("click", function () {
            document.body.classList.add("sidebar-collapsed");
            setOpenState(false);
            syncUI();
        });

        // ESC closes drawer.
        window.addEventListener("keydown", function (e) {
            if (e && e.key === "Escape") {
                document.body.classList.add("sidebar-collapsed");
                setOpenState(false);
                syncUI();
            }
        });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire);
    else wire();
})();
