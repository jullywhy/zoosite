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

// ===== ПЕРЕКЛЮЧЕНИЕ СЕРДЕЦ =====
function toggleMobileHeart(element) {
    const img = element.querySelector('img');
    const currentSrc = img.getAttribute('src');
    
    if (currentSrc.includes('heart1.svg')) {
        img.setAttribute('src', 'heart2.svg');
    } else {
        img.setAttribute('src', 'heart1.svg');
    }
}

// ===== СЧЁТЧИКИ ТОВАРОВ =====
document.addEventListener('DOMContentLoaded', function() {
    const prices = {
        1: 520,
        2: 280,
        3: 150,
        4: 450
    };
    
    const quantities = {
        1: 1,
        2: 1,
        3: 1,
        4: 1
    };
    
    function updateMobilePlusButton(id) {
        const plusBtn = document.querySelector('.mobile-counter-plus[data-id="' + id + '"]');
        if (plusBtn) {
            if (quantities[id] >= 10) {
                plusBtn.classList.add('disabled');
            } else {
                plusBtn.classList.remove('disabled');
            }
        }
    }
    
    function updateMobilePrice(id, basePrice) {
        const priceElement = document.getElementById('mobile-price-' + id);
        if (priceElement) {
            const total = basePrice * quantities[id];
            priceElement.textContent = total + ' ₽';
        }
        updateMobilePlusButton(id);
    }
    
    // Кнопки "В корзину"
    document.querySelectorAll('.mobile-product-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const id = this.dataset.id;
            const counter = document.getElementById('mobile-counter-' + id);
            
            if (counter) {
                counter.classList.add('active');
                this.classList.add('hidden');
                
                quantities[id] = 1;
                const countEl = document.getElementById('mobile-count-' + id);
                if (countEl) countEl.textContent = 1;
                updateMobilePrice(id, prices[id]);
            }
        });
    });
    
    // Плюс
    document.querySelectorAll('.mobile-counter-plus').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (quantities[id] < 10) {
                quantities[id]++;
                const countEl = document.getElementById('mobile-count-' + id);
                if (countEl) countEl.textContent = quantities[id];
                updateMobilePrice(id, prices[id]);
            }
        });
    });
    
    // Минус
    document.querySelectorAll('.mobile-counter-minus').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (quantities[id] > 1) {
                quantities[id]--;
                const countEl = document.getElementById('mobile-count-' + id);
                if (countEl) countEl.textContent = quantities[id];
                updateMobilePrice(id, prices[id]);
            } else {
                const counter = document.getElementById('mobile-counter-' + id);
                const btnAdd = document.querySelector('.mobile-product-btn[data-id="' + id + '"]');
                
                if (counter) counter.classList.remove('active');
                if (btnAdd) btnAdd.classList.remove('hidden');
                
                quantities[id] = 1;
                const countEl = document.getElementById('mobile-count-' + id);
                if (countEl) countEl.textContent = 1;
                updateMobilePrice(id, prices[id]);
            }
        });
    });
    
    // Инициализация
    for (let id = 1; id <= 4; id++) {
        updateMobilePlusButton(id);
    }
});
