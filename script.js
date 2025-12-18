
// Scroll to top button logic
const backToTopButton = document.getElementById("back-to-top");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}

// Smooth scroll behavior is handled by CSS scroll-behavior: smooth (if added) or native anchor behavior
// For better compatibility:
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Валидация формы заявки
(function () {
    'use strict'
    
    var forms = document.querySelectorAll('.needs-validation')
    
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    event.preventDefault()
                    alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение 24 часов.')
                    form.reset()
                    document.getElementById('fileList').innerHTML = ''
                    form.classList.remove('was-validated')
                }
                
                form.classList.add('was-validated')
            }, false)
        })
})()

// Валидация формы отзыва
document.getElementById('feedbackForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо! Ваш отзыв отправлен на модерацию.');
    
    // Закрыть модальное окно
    const modal = bootstrap.Modal.getInstance(document.getElementById('feedbackModal'));
    if (modal) modal.hide();
    
    // Сбросить форму
    this.reset();
});

// Обработка загрузки файлов
document.getElementById('fileUploadArea').addEventListener('click', function() {
    document.getElementById('fileInput').click()
})

document.getElementById('fileInput').addEventListener('change', function(e) {
    const fileList = document.getElementById('fileList')
    fileList.innerHTML = ''
    
    if (e.target.files.length > 0) {
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i]
            const fileItem = document.createElement('div')
            fileItem.className = 'alert alert-info d-flex justify-content-between align-items-center'
            fileItem.innerHTML = `
                <span><i class="bi bi-file-earmark me-2"></i>${file.name}</span>
                <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
            `
            fileList.appendChild(fileItem)
        }
    }
})

// Drag and drop для файлов
const fileUploadArea = document.getElementById('fileUploadArea')

fileUploadArea.addEventListener('dragover', function(e) {
    e.preventDefault()
    fileUploadArea.style.borderColor = 'var(--bs-primary)'
    fileUploadArea.style.backgroundColor = 'rgba(var(--bs-primary-rgb), 0.1)'
})

fileUploadArea.addEventListener('dragleave', function() {
    fileUploadArea.style.borderColor = '#dee2e6'
    fileUploadArea.style.backgroundColor = '#f8f9fa'
})

fileUploadArea.addEventListener('drop', function(e) {
    e.preventDefault()
    fileUploadArea.style.borderColor = '#dee2e6'
    fileUploadArea.style.backgroundColor = '#f8f9fa'
    
    const files = e.dataTransfer.files
    document.getElementById('fileInput').files = files
    
    // Имитируем событие change
    const event = new Event('change', { bubbles: true })
    document.getElementById('fileInput').dispatchEvent(event)
})

// Анимация появления элементов при скролле
function checkVisibility() {
    const elements = document.querySelectorAll('.fade-in')
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible')
        }
    })
}

// Проверяем видимость при загрузке и скролле
window.addEventListener('scroll', checkVisibility)
window.addEventListener('load', checkVisibility)

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    checkVisibility()
    scrollFunction()
})