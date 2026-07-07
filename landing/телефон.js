// ============================================================
// МОБИЛЬНАЯ ВЕРСИЯ
// ============================================================

// ===== БУРГЕР-МЕНЮ =====
function toggleMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    if (!overlay) return;

    if (overlay.classList.contains('active')) {
        closeMobileMenu();
    } else {
        overlay.style.display = 'flex';
        overlay.classList.remove('closing');
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    if (!overlay) return;

    overlay.classList.add('closing');
    overlay.classList.remove('active');

    setTimeout(function() {
        overlay.style.display = 'none';
        overlay.classList.remove('closing');
        document.body.style.overflow = 'auto';
    }, 300);
}

// ===== ЛУПА =====
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('mobileSearchInput');
    const searchIcon = document.getElementById('mobileSearchIcon');
    
    if (searchInput && searchIcon) {
        function checkSearchInput() {
            const hasText = searchInput.value.trim().length > 0;
            if (hasText) {
                searchIcon.classList.add('active');
            } else {
                searchIcon.classList.remove('active');
            }
        }
        searchInput.addEventListener('input', checkSearchInput);
        checkSearchInput();
    }
});

// ===== COPY / DONE =====
let mobileTimeoutId = null;

function toggleMobileIcon() {
    const iconImage = document.getElementById('mobileIconImage');
    if (!iconImage) return;
    
    if (iconImage.src.includes('done.svg')) {
        return;
    }
    
    iconImage.src = 'done.svg';
    const copyIcon = document.getElementById('mobileCopyIcon');
    if (copyIcon) {
        copyIcon.style.width = '12px';
        copyIcon.style.height = '11px';
        copyIcon.style.left = '44px';
        copyIcon.style.top = '736px';
    }
    
    if (mobileTimeoutId) {
        clearTimeout(mobileTimeoutId);
    }
    
    mobileTimeoutId = setTimeout(() => {
        iconImage.src = 'copy.svg';
        if (copyIcon) {
            copyIcon.style.width = '13px';
            copyIcon.style.height = '13px';
            copyIcon.style.left = '43px';
            copyIcon.style.top = '738px';
        }
        mobileTimeoutId = null;
    }, 6000);
}

// ===== МОДАЛЬНЫЕ ОКНА =====
function openModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openWorkModal() {
    const overlay = document.getElementById('modalWorkOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeWorkModal() {
    const overlay = document.getElementById('modalWorkOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Закрытие по клику на фон
document.addEventListener('DOMContentLoaded', function() {
    const overlays = document.querySelectorAll('.modal-overlay, .modal-work-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal-overlay, .modal-work-overlay');
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            closeMobileMenu();
        }
    });
});
