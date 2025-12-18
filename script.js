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

// Валидация форм
function setupForms() {
    // Форма заявки
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!applicationForm.checkValidity()) {
                e.stopPropagation();
            } else {
                alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение 24 часов.');
                applicationForm.reset();
                document.getElementById('fileList').innerHTML = '';
            }
            
            applicationForm.classList.add('was-validated');
        }, false);
    }
    
    // Форма отзыва
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('feedbackModal'));
            if (modal) modal.hide();
            
            alert('Спасибо! Ваш отзыв отправлен на модерацию.');
            feedbackForm.reset();
        }, false);
    }
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

// Инициализация всего при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверка видимости элементов
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    // Настройка всех функций
    setupBackToTop();
    setupForms();
    setupFileUpload();
    setupSmoothScroll();
    
    // Автозапуск карусели отзывов
    const feedbackCarousel = document.getElementById('feedbackCarousel');
    if (feedbackCarousel) {
        new bootstrap.Carousel(feedbackCarousel, {
            interval: 5000,
            wrap: true
        });
    }
});