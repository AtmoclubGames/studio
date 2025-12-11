// Управление каруселью цитат
document.addEventListener('DOMContentLoaded', () => {
  // === QUOTES CAROUSEL ===
  const quoteCarousel = document.getElementById('quotes-carousel');
  if (quoteCarousel) {
    const quoteItems = quoteCarousel.querySelectorAll('.quote-item');
    const quoteIndicator = document.getElementById('quote-indicator');
    const quotePrev = document.getElementById('quote-prev');
    const quoteNext = document.getElementById('quote-next');
    
    let currentQuoteIndex = 0;
    const totalQuotes = quoteItems.length;
    
    function updateQuote(index) {
      quoteItems.forEach(item => item.style.display = 'none');
      quoteItems[index].style.display = 'block';
      quoteIndicator.textContent = `${index + 1} / ${totalQuotes}`;
    }
    
    if (quotePrev) {
      quotePrev.addEventListener('click', () => {
        currentQuoteIndex = (currentQuoteIndex - 1 + totalQuotes) % totalQuotes;
        updateQuote(currentQuoteIndex);
      });
    }
    
    if (quoteNext) {
      quoteNext.addEventListener('click', () => {
        currentQuoteIndex = (currentQuoteIndex + 1) % totalQuotes;
        updateQuote(currentQuoteIndex);
      });
    }
    
    // Автоматическая смена каждые 6 секунд
    setInterval(() => {
      currentQuoteIndex = (currentQuoteIndex + 1) % totalQuotes;
      updateQuote(currentQuoteIndex);
    }, 6000);
  }
  
  // === SKILL CHECK / QUIZ ===
  const quizButtons = document.querySelectorAll('.quiz-btn');
  console.log('Found quiz buttons:', quizButtons.length);
  
  quizButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const quizLevel = btn.getAttribute('data-quiz');
      console.log('Quiz level clicked:', quizLevel);
      
      const quizData = {
        'beginner': {
          title: 'Новичок',
          message: 'Спасибо за прохождение квиза! 🎮\n\nТвой уровень: Новичок\n\nРекомендуем начать с раздела "Туториалы" для начинающих.',
          url: '/tutorials'
        },
        'intermediate': {
          title: 'Опытный',
          message: 'Отлично! Ты уже знаешь базовое программирование! 🚀\n\nТвой уровень: Опытный\n\nПопробуй создать свой проект или посмотри примеры на странице "Исследовать".',
          url: '/explore'
        },
        'advanced': {
          title: 'Профессионал',
          message: 'Потрясающе! Ты профессионал в разработке! 💎\n\nТвой уровень: Профессионал\n\nСоздавай сложные проекты, участвуй в сообществе, помогай другим!',
          url: '/projects'
        }
      };
      
      const quiz = quizData[quizLevel];
      if (quiz) {
        alert(quiz.message);
        // В будущем здесь будет реальный квиз, а не просто alert
        // window.location.href = quiz.url;
      }
    });
  });
  
  // === CONTACT FORM ===
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const message = contactForm.querySelector('textarea').value;
      
      // Простая валидация
      if (!name || !email || !message) {
        alert('Пожалуйста, заполните все поля');
        return;
      }
      
      // В реальном приложении здесь будет отправка на сервер
      console.log({name, email, message});
      alert('Спасибо за ваше сообщение! Мы скоро свяжемся с вами.');
      contactForm.reset();
    });
  }
  
  // === SKILL CARD HOVER EFFECTS ===
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    });
  });
});
