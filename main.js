document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://atmocode.online/api/news1?sort[0]=PublishAt:desc&populate=Cover';
    const originApiUrl = "https://atmocode.online";
  
    async function fetchNews() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const json = await response.json();
        return json.data || [];
      } catch (err) {
        console.error('Не удалось загрузить новости:', err);
        return [];
      }
    }
  
    // function richTextToPlain(contArr) {
    //   if (!Array.isArray(contArr)) return '';
    //   let result = '';
    //   contArr.forEach(node => {
    //     if (Array.isArray(node.children)) {
    //       node.children.forEach(child => {
    //         if (child.text) {
    //           result += child.text;
    //         }
    //       });
    //       result += '\n';
    //     }
    //   });
    //   return result.trim();
    // }
  function richTextToPlain(contArr) {
  if (!Array.isArray(contArr)) return '';
  let result = '';

  const extractText = (node) => {
    // Если это текстовый узел — добавляем его
    if (node.type === 'text' && typeof node.text === 'string') {
      result += node.text;
    }
    // Рекурсивно обрабатываем дочерние элементы, если есть
    if (Array.isArray(node.children)) {
      node.children.forEach(extractText);
    }
  };

  contArr.forEach(extractText);
  return result.trim();
}
    // Новая функция: конвертация rich text в HTML (параграфы)
    // function richTextToHTML(contArr) {
    //   if (!Array.isArray(contArr)) return '';
    //   let html = '';
    //   contArr.forEach(node => {
    //     if (Array.isArray(node.children)) {
    //       node.children.forEach(child => {
    //         if (child.text) {
    //           html += `<p>${child.text}</p>`;
    //         }
    //       });
    //     }
    //   });
    //   return html;
    // }
  function richTextToHTML(nodes) {
  if (!Array.isArray(nodes)) return '';

  let html = '';

  const renderNode = (node) => {
    if (!node) return '';

    // Обработка текста
    if (node.type === 'text') {
      let text = node.text || '';
      if (node.bold) text = `<strong>${text}</strong>`;
      if (node.italic) text = `<em>${text}</em>`;
      if (node.underline) text = `<u>${text}</u>`;
      if (node.strikethrough) text = `<del>${text}</del>`;
      return text;
    }

    // Обработка параграфа
    if (node.type === 'paragraph') {
      let content = '';
      if (Array.isArray(node.children)) {
        node.children.forEach(child => {
          content += renderNode(child);
        });
      }
      return `<p>${content}</p>`;
    }

    // Обработка заголовков
    if (node.type === 'heading' && typeof node.level === 'number') {
      let content = '';
      if (Array.isArray(node.children)) {
        node.children.forEach(child => {
          content += renderNode(child);
        });
      }
      const tag = `h${Math.min(Math.max(node.level, 1), 6)}`;
      return `<${tag}>${content}</${tag}>`;
    }

    // Обработка списков
    if (node.type === 'list') {
      const tag = node.format === 'ordered' ? 'ol' : 'ul';
      let items = '';
      if (Array.isArray(node.children)) {
        node.children.forEach(child => {
          if (child.type === 'list-item') {
            let itemContent = '';
            if (Array.isArray(child.children)) {
              child.children.forEach(grandChild => {
                itemContent += renderNode(grandChild);
              });
            }
            items += `<li>${itemContent}</li>`;
          }
        });
      }
      return `<${tag}>${items}</${tag}>`;
    }

    // Обработка ссылок
    if (node.type === 'link' && node.url) {
      let linkText = '';
      if (Array.isArray(node.children)) {
        node.children.forEach(child => {
          linkText += renderNode(child);
        });
      }
      // Убираем пустой текст
      if (!linkText.trim()) linkText = node.url;
      const target = node.url.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${node.url}"${target}>${linkText}</a>`;
    }

    // Если тип неизвестен, но есть children — рекурсивно обрабатываем
    if (Array.isArray(node.children)) {
      let content = '';
      node.children.forEach(child => {
        content += renderNode(child);
      });
      return content;
    }

    return '';
  };

  nodes.forEach(node => {
    html += renderNode(node);
  });

  return html;
}
    function createNewsCard(newsItem) {
      const id = newsItem.id;
      const title = newsItem.Title || '';
      const contArr = newsItem.Contetnt || [];
      const slug = newsItem.Slug || id;
      const published = newsItem.PublishAt || '';
  
      let coverUrl = null;
      if (newsItem.Cover && newsItem.Cover.name && newsItem.Cover.url) {
        const rawUrl = newsItem.Cover.url;
        coverUrl = rawUrl.startsWith('http') ? rawUrl : (originApiUrl + rawUrl);
      }
  
      const article = document.createElement('article');
      article.className = 'news-item';
  
      const h3 = document.createElement('h3');
      h3.textContent = title;
      article.appendChild(h3);
  
      if (coverUrl) {
        const img = document.createElement('img');
        img.src = coverUrl;
        img.alt = title;
        img.className = 'news-cover';
        article.appendChild(img);
      }
  
      // Анонс текста
      const plainText = richTextToPlain(contArr);
      const p = document.createElement('p');
      p.textContent = plainText.length > 120 ? plainText.slice(0, 120).trim() + '…' : plainText;
      p.className = 'news-preview-text';
      article.appendChild(p);
  
      if (published) {
        const dateEl = document.createElement('div');
        dateEl.className = 'news-date';
        dateEl.textContent = (new Date(published)).toLocaleDateString('ru-RU');
        article.appendChild(dateEl);
      }
  
      // Кнопка "Читать далее" — теперь кнопка, не ссылка
      const readMore = document.createElement('button');
      readMore.type = 'button';
      readMore.className = 'button button-primary read-more-btn';
      readMore.textContent = 'Читать далее';
      readMore.dataset.id = id;
      article.appendChild(readMore);
  
      // Скрытый полный текст
      const fullContent = document.createElement('div');
      fullContent.className = 'full-content';
      fullContent.style.display = 'none';
      fullContent.innerHTML = richTextToHTML(contArr);
      article.appendChild(fullContent);
  
      return article;
    }
  
    // Разделение на верхний (2 новости с toFix) и нижний (остальные)
    function splitNews(newsArray) {
      const fixedNews = newsArray.filter(item => item.toFix);
      const normalNews = newsArray.filter(item => !item.toFix);
  
      let topNews = fixedNews.slice(0, 2);
      if (topNews.length < 2) {
        topNews = topNews.concat(normalNews.slice(0, 2 - topNews.length));
      }
  
      const topIds = new Set(topNews.map(item => item.id));
      const bottomNews = newsArray.filter(item => !topIds.has(item.id));
  
      return { topNews, bottomNews };
    }
  
    async function showNews() {
      const newsArray = await fetchNews();
      const container = document.getElementById('news-container');
      if (!container) return;
  
      if (newsArray.length === 0) {
        container.innerHTML = '<p>Новостей пока нет.</p>';
        return;
      }
  
      container.innerHTML = `
        <div id="news-top" class="news-top-block"></div>
        <div id="news-bottom" class="news-bottom-block"></div>
      `;
  
      const { topNews, bottomNews } = splitNews(newsArray);
  
      const topContainer = document.getElementById('news-top');
      const bottomContainer = document.getElementById('news-bottom');
  
      topNews.forEach(item => {
        topContainer.appendChild(createNewsCard(item));
      });
  
      bottomNews.forEach(item => {
        bottomContainer.appendChild(createNewsCard(item));
      });
    }
  
    // Делегирование клика по кнопке "Читать далее"
    document.getElementById('news-container').addEventListener('click', (e) => {
      if (e.target.classList.contains('read-more-btn')) {
        const article = e.target.closest('article');
        if (!article) return;
        const fullContent = article.querySelector('.full-content');
        const previewText = article.querySelector('.news-preview-text');
  
        if (fullContent.style.display === 'none') {
          fullContent.style.display = 'block';
          previewText.style.display = 'none';
          e.target.textContent = 'Скрыть';
        } else {
          fullContent.style.display = 'none';
          previewText.style.display = 'block';
          e.target.textContent = 'Читать далее';
        }
      }
    });
  
    showNews();
  });
  