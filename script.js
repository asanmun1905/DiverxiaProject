document.addEventListener('DOMContentLoaded', () => {
    const sidebar          = document.getElementById('sidebar');
    const hamburgerHeader  = document.getElementById('hamburger-header');
    const hamburgerSidebar = document.getElementById('hamburger-sidebar');

    function openSidebar() {
        sidebar.classList.add('open');
        hamburgerHeader.classList.add('active');
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        hamburgerHeader.classList.remove('active');
    }

    // Header hamburger → opens the sidebar
    if (hamburgerHeader) {
        hamburgerHeader.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    // Sidebar X button → always closes the sidebar
    if (hamburgerSidebar) {
        hamburgerSidebar.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar();
        });
    }

    // Click outside the sidebar → close it
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('open') && !sidebar.contains(e.target)) {
            closeSidebar();
        }
    });

    // Prevent clicks inside sidebar from closing it via the outside-click listener
    sidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // ── Auth Simulation ─────────────────────────────────────────────────────────
    const currentRole = localStorage.getItem('role') || 'guest';

    const adminLinks    = document.querySelectorAll('.nav-admin');
    const juecesLinks   = document.querySelectorAll('.nav-jueces');
    const invitadosLinks = document.querySelectorAll('.nav-invitados');
    const logoutLinks   = document.querySelectorAll('.nav-logout');

    if (currentRole === 'admin') {
        adminLinks.forEach(l    => l.style.display = 'block');
        juecesLinks.forEach(l   => l.style.display = 'block');
        invitadosLinks.forEach(l => l.style.display = 'block');
        logoutLinks.forEach(l   => l.style.display = 'block');
    } else if (currentRole === 'juez') {
        adminLinks.forEach(l    => l.style.display = 'none');
        juecesLinks.forEach(l   => l.style.display = 'block');
        invitadosLinks.forEach(l => l.style.display = 'none');
        logoutLinks.forEach(l   => l.style.display = 'block');
    } else if (currentRole === 'invitado') {
        adminLinks.forEach(l    => l.style.display = 'none');
        juecesLinks.forEach(l   => l.style.display = 'none');
        invitadosLinks.forEach(l => l.style.display = 'block');
        logoutLinks.forEach(l   => l.style.display = 'block');
    } else {
        // guest — not logged in
        adminLinks.forEach(l    => l.style.display = 'none');
        juecesLinks.forEach(l   => l.style.display = 'none');
        invitadosLinks.forEach(l => l.style.display = 'none');
        logoutLinks.forEach(l   => l.style.display = 'none');
    }

    // ── Login handlers ───────────────────────────────────────────────────────────
    const adminLoginBtn = document.getElementById('btn-admin-login');
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', () => {
            localStorage.setItem('role', 'admin');
        });
    }

    const juecesLoginBtn = document.getElementById('btn-jueces-login');
    if (juecesLoginBtn) {
        juecesLoginBtn.addEventListener('click', () => {
            localStorage.setItem('role', 'juez');
        });
    }

    const invitadosLoginBtn = document.getElementById('btn-invitados-login');
    if (invitadosLoginBtn) {
        invitadosLoginBtn.addEventListener('click', () => {
            localStorage.setItem('role', 'invitado');
        });
    }

    // ── Logout handler ───────────────────────────────────────────────────────────
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('role');
            window.location.href = 'index.html';
        });
    });
});
