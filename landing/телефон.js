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

// ============================================================
// МОДАЛЬНОЕ ОКНО "ОФОРМЛЕНИЕ ЗАКАЗА" (МОБИЛЬНЫЙ)
// ============================================================

let mobileOrderPhoneNumber = '';

function openOrderModal() {
    const overlay = document.getElementById('modalOrderOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.querySelectorAll('.modal-order-error').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });
        document.querySelectorAll('.modal-order-input').forEach(el => el.value = '');
        const citySelect = document.getElementById('orderCity');
        if (citySelect) citySelect.value = '';
        const btn = document.getElementById('orderSubmitBtn');
        btn.disabled = true;
        btn.classList.remove('active');
    }
}

function closeOrderModal() {
    const overlay = document.getElementById('modalOrderOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== ВАЛИДАЦИЯ =====
function validateName(value) {
    const regex = /^[A-Za-zА-Яа-яЁё\s]{2,}$/;
    return regex.test(value.trim());
}

function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value.trim());
}

function validatePhone(value) {
    const digits = value.replace(/\D/g, '');
    return digits.length === 11;
}

function validateCity(value) {
    return value.trim().length >= 2;
}

function validateAddress(value) {
    return value.trim().length >= 2;
}

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(errorElement) {
    errorElement.style.display = 'none';
    errorElement.textContent = '';
}

// ===== ОБРАБОТЧИКИ =====
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('orderName');
    const emailInput = document.getElementById('orderEmail');
    const phoneInput = document.getElementById('orderPhone');
    const citySelect = document.getElementById('orderCity');
    const addressInput = document.getElementById('orderAddress');
    const submitBtn = document.getElementById('orderSubmitBtn');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const cityError = document.getElementById('cityError');
    const addressError = document.getElementById('addressError');

    // Проверка заполненности полей
    function checkFieldsFilled() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const city = citySelect.value.trim();
        const address = addressInput.value.trim();

        const phoneDigits = phone.replace(/\D/g, '');
        const isPhoneFilled = phoneDigits.length > 0;

        if (name.length > 0 && email.length > 0 && isPhoneFilled && city.length > 0 && address.length > 0) {
            submitBtn.disabled = false;
            submitBtn.classList.add('active');
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('active');
        }
    }

    nameInput.addEventListener('input', checkFieldsFilled);
    emailInput.addEventListener('input', checkFieldsFilled);
    phoneInput.addEventListener('input', checkFieldsFilled);
    citySelect.addEventListener('change', checkFieldsFilled);
    addressInput.addEventListener('input', checkFieldsFilled);

    // Отправка формы
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.disabled) return;

        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const city = citySelect.value;
        const address = addressInput.value;

        let isValid = true;

        if (!validateName(name)) {
            showError(nameError, 'Имя должно содержать минимум 2 буквы');
            isValid = false;
        } else {
            hideError(nameError);
        }

        if (!validateEmail(email)) {
            showError(emailError, 'Введите корректный email');
            isValid = false;
        } else {
            hideError(emailError);
        }

        if (!validatePhone(phone)) {
            showError(phoneError, 'Введите 11 цифр телефона');
            isValid = false;
        } else {
            hideError(phoneError);
        }

        if (!validateCity(city)) {
            showError(cityError, 'Выберите регион');
            isValid = false;
        } else {
            hideError(cityError);
        }

        if (!validateAddress(address)) {
            showError(addressError, 'Введите адрес (минимум 2 символа)');
            isValid = false;
        } else {
            hideError(addressError);
        }

        if (isValid) {
            mobileOrderPhoneNumber = phone;
            document.getElementById('modalOrderOverlay').style.display = 'none';
            openSuccessModal(phone);
        }
    });
});

// ===== ОКНО "ЗАКАЗ ОФОРМЛЕН!" =====
function openSuccessModal(phone) {
    const overlay = document.getElementById('modalSuccessOverlay');
    if (overlay) {
        const lastFour = phone.replace(/\D/g, '').slice(-4);
        const masked = '***-***-**-' + lastFour.slice(0, 2) + '-' + lastFour.slice(2);
        document.getElementById('successPhone').textContent = masked;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    const overlay = document.getElementById('modalSuccessOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        closeOrderModal();
    }
}
