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
        if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !hamburgerHeader.contains(e.target)) {
            closeSidebar();
        }
    });

    // Prevent clicks inside sidebar from closing it via the outside-click listener
    sidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // ── Touch swipe support for the Sidebar ────────────────────────────────────
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 60; // Minimum distance to be considered a swipe
        const isSwipeRight = touchEndX > touchStartX + threshold;
        const isSwipeLeft = touchEndX < touchStartX - threshold;

        // Sidebar uses right: -350px, meaning it reveals by sliding left, and hides by sliding right
        if (sidebar.classList.contains('open')) {
            if (isSwipeRight) {
                // Dragging sidebar back to the right -> closes it
                closeSidebar();
            }
        }
    }

    // ── Auth Simulation ─────────────────────────────────────────────────────────
    const currentRole = localStorage.getItem('role') || 'guest';

    const adminLinks    = document.querySelectorAll('.nav-admin');
    const juecesLinks   = document.querySelectorAll('.nav-jueces');
    const invitadosLinks = document.querySelectorAll('.nav-invitados');
    const logoutLinks   = document.querySelectorAll('.nav-logout');

    // ── Global Events Data Initialization ─────────────────────────────────────
    function initGlobalEvents() {
        if (!localStorage.getItem('diverxia_events')) {
            const initialEvents = [
                { id: "ev_1", title: "Prueba de Liderazgo", category: "Habilidades Blandas", start: "2026-05-10", end: "2026-05-12", importance: "Alta" },
                { id: "ev_2", title: "Reto de Innovación Empresarial", category: "Competición", start: "2026-04-20", end: "2026-04-21", importance: "Media" },
                { id: "ev_3", title: "Taller de Comunicación Efectiva", category: "Formación", start: "2026-03-15", end: "2026-03-15", importance: "Baja" },
                { id: "ev_4", title: "Hackathon Diverxia 2026", category: "Tecnología", start: "2026-06-01", end: "2026-06-03", importance: "Alta" },
                { id: "ev_5", title: "Gymkhana de Equipos", category: "Dinámicas de Grupo", start: "2026-02-28", end: "2026-03-01", importance: "Baja" },
                { id: "ev_6", title: "Simulación de Negociación", category: "Competición", start: "2026-07-14", end: "2026-07-14", importance: "Media" },
                { id: "ev_7", title: "Evaluación de Resolución de Conflictos", category: "Habilidades Blandas", start: "2026-01-20", end: "2026-01-22", importance: "Alta" },
                { id: "ev_8", title: "Prueba de Creatividad Visual", category: "Diseño", start: "2026-08-05", end: "2026-08-06", importance: "Media" },
                { id: "ev_9", title: "Presentaciones ante Jurado", category: "Competición", start: "2026-04-08", end: "2026-04-09", importance: "Alta" },
                { id: "ev_10", title: "Escape Room Empresarial", category: "Dinámicas de Grupo", start: "2026-03-03", end: "2026-03-03", importance: "Baja" }
            ];
            localStorage.setItem('diverxia_events', JSON.stringify(initialEvents));
        }
    }
    
    // Always initialize events data on load
    initGlobalEvents();

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
