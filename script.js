// Анимация появления элементов при скролле
function checkVisibility() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Кнопка "Вернуться наверх"
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ВАЖНО: Обработка формы отзыва в модальном окне
function setupFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackModal = document.getElementById('feedbackModal');
    
    if (!feedbackForm) return;
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Получаем данные из формы
        const name = document.getElementById('feedbackName').value.trim();
        const text = document.getElementById('feedbackText').value.trim();
        const rating = document.querySelector('input[name="rating"]:checked')?.value || '5';
        const avatarLink = document.querySelector('#feedbackForm input[type="text"]')?.value.trim() || '';
        
        // Проверяем заполненность
        if (!name || !text) {
            alert('Пожалуйста, заполните имя и текст отзыва');
            return;
        }
        
        if (text.length < 10) {
            alert('Отзыв должен содержать минимум 10 символов');
            return;
        }
        
        // Здесь можно добавить отправку на сервер
        // Пока просто показываем сообщение
        alert('Спасибо! Ваш отзыв отправлен на модерацию.');
        
        // Закрываем модальное окно
        const modal = bootstrap.Modal.getInstance(feedbackModal);
        if (modal) modal.hide();
        
        // Очищаем форму
        feedbackForm.reset();
        
        // Сбрасываем рейтинг на 5 звёзд
        document.getElementById('rating5').checked = true;
    });
}

// Валидация формы заявки
function setupApplicationForm() {
    const applicationForm = document.getElementById('applicationForm');
    
    if (!applicationForm) return;
    
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!applicationForm.checkValidity()) {
            e.stopPropagation();
        } else {
            // Получаем данные
            const name = document.getElementById('appName').value;
            const phone = document.getElementById('appPhone').value;
            const email = document.getElementById('appEmail').value;
            const comment = document.getElementById('appComment').value;
            const files = document.getElementById('fileInput').files;
            
            // Пока просто показываем сообщение
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение 24 часов.');
            
            // Очищаем форму
            applicationForm.reset();
            document.getElementById('fileList').innerHTML = '';
        }
        
        applicationForm.classList.add('was-validated');
    }, false);
}

// Загрузка файлов
function setupFileUpload() {
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    
    if (!fileUploadArea || !fileInput) return;
    
    // Клик по области загрузки
    fileUploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Выбор файлов
    fileInput.addEventListener('change', function(e) {
        if (fileList) {
            fileList.innerHTML = '';
            
            if (e.target.files.length > 0) {
                for (let i = 0; i < e.target.files.length; i++) {
                    const file = e.target.files[i];
                    const fileItem = createFileItem(file);
                    fileList.appendChild(fileItem);
                }
            }
        }
    });
    
    // Drag & drop
    fileUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = 'var(--bs-primary)';
        fileUploadArea.style.backgroundColor = 'rgba(var(--bs-primary-rgb), 0.1)';
    });
    
    fileUploadArea.addEventListener('dragleave', function() {
        fileUploadArea.style.borderColor = '#dee2e6';
        fileUploadArea.style.backgroundColor = '#ffffff';
    });
    
    fileUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#dee2e6';
        fileUploadArea.style.backgroundColor = '#ffffff';
        
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
        }
    });
}

// Создание элемента файла для списка
function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'alert alert-info d-flex justify-content-between align-items-center py-2';
    fileItem.innerHTML = `
        <span><i class="bi bi-file-earmark me-2"></i>${file.name}</span>
        <button type="button" class="btn-close btn-close-sm"></button>
    `;
    
    // Удаление файла из списка
    fileItem.querySelector('.btn-close').addEventListener('click', function() {
        fileItem.remove();
        
    });
    
    return fileItem;
}

// Обработка загрузки аватара через Google Forms (симуляция)
function setupAvatarUpload() {
    const googleFormsLink = document.querySelector('#feedbackForm a[href="https://docs.google.com/forms"]');
    const avatarInput = document.querySelector('#feedbackForm input[type="text"]');
    
    if (googleFormsLink) {
        // Открываем Google Forms в новом окне
        googleFormsLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank', 'width=800,height=600');
            
            // Можно показать инструкцию
            alert('После загрузки фото скопируйте ссылку на изображение и вставьте в поле ниже.');
        });
    }
    
    if (avatarInput) {
        // Проверка ссылки на изображение
        avatarInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !value.startsWith('http')) {
                alert('Пожалуйста, введите полную ссылку (начинающуюся с http:// или https://)');
            }
        });
    }
}

// Плавная прокрутка по якорным ссылкам
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Закрыть мобильное меню, если открыто
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                    navbarToggler.click();
                }
            }
        });
    });
}

// Обработка модального окна при открытии/закрытии
function setupModalHandlers() {
    const feedbackModal = document.getElementById('feedbackModal');
    
    if (!feedbackModal) return;
    
    feedbackModal.addEventListener('show.bs.modal', function() {
        console.log('Модальное окно отзыва открывается');
    });
    
    feedbackModal.addEventListener('hidden.bs.modal', function() {
        console.log('Модальное окно отзыва закрыто');
        // Можно сбросить форму при закрытии
        const form = document.getElementById('feedbackForm');
        if (form) form.reset();
    });
}

// Инициализация всего при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен, инициализируем функции...');
    
    // Проверка видимости элементов
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    // Настройка всех функций
    setupBackToTop();
    setupFeedbackForm();      
    setupApplicationForm();
    setupFileUpload();
    setupAvatarUpload();      
    setupSmoothScroll();
    setupModalHandlers();     
    
    // Автозапуск карусели отзывов
    const feedbackCarousel = document.getElementById('feedbackCarousel');
    if (feedbackCarousel) {
        new bootstrap.Carousel(feedbackCarousel, {
            interval: 5000,
            wrap: true
        });
    }
    
    console.log('Все функции инициализированы');
});