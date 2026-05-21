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

    // Role-based visibility logic initialization (Auth Simulation)
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
    const judgeModal = document.getElementById('judge-code-modal');
    const judgeInput = document.getElementById('judge-code-input');
    const judgeError = document.getElementById('judge-code-error');
    const judgeCancel = document.getElementById('judge-code-cancel');
    const judgeSubmit = document.getElementById('judge-code-submit');

    if (juecesLoginBtn && judgeModal) {
        juecesLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            judgeInput.value = '';
            judgeError.style.display = 'none';
            judgeModal.showModal();
        });

        judgeCancel.addEventListener('click', () => {
            judgeModal.close();
        });

        const validateAndSubmit = () => {
            const code = judgeInput.value.trim().toUpperCase();
            const validCodes = ['DIVERXIAJUEZ01', 'DIVERXIAJUEZ02', 'DIVERXIAJUEZ03', 'DIVERXIAJUEZ04', 'DIVERXIAJUEZ05'];
            
            if (validCodes.includes(code)) {
                localStorage.setItem('role', 'juez');
                localStorage.setItem('judge_code', code);
                judgeModal.close();
                window.location.href = 'eventos.html';
            } else {
                judgeError.style.display = 'block';
            }
        };

        judgeSubmit.addEventListener('click', validateAndSubmit);
        judgeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                validateAndSubmit();
            }
        });
    }

    const invitadosLoginBtn = document.getElementById('btn-invitados-login');
    if (invitadosLoginBtn) {
        invitadosLoginBtn.addEventListener('click', () => {
            localStorage.setItem('role', 'invitado');
            localStorage.removeItem('judge_code');
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
