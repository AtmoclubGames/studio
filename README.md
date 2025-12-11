# Atmocode Studio - Menu Navigation Refactoring

## Последние обновления (December 11, 2025)

### ✨ Новые функции

#### 1. **Переструктурирована система меню**
- Все кнопки меню теперь используют единообразный формат (`<li>` элементы)
- Применяются консистентные стили из `css/style.css`
- Лучше совместимость со всеми браузерами

#### 2. **Добавлены внешние ссылки**
Кнопки меню теперь открывают сервисы в новом окне:
- **Форум** → `https://talk.atmocode.ru` (новая кнопка)
- **Атмокод** → `https://atmocode.ru/`
- **Палитры** → `https://palette.atmocode.ru/`
- **Обучение** → `https://promo.atmocode.ru/`
- **Ассеты** → `https://assets.atmocode.ru/` (скрыта, для будущего использования)

#### 3. **Унифицированная архитектура навигации**
Все кнопки обрабатываются одним методом в `js/appui/appui.coffee`:

```coffeescript
@setAction "menu-forum",()=>
  window.open "https://talk.atmocode.ru","_blank"

@setAction "menu-atmocode",()=>
  window.open "https://atmocode.ru/","_blank"

# ... и т.д.
```

## Структура файлов

```
c:\webProject\atmocode\studio\
├── home.pug                    # Главный шаблон (содержит новое меню)
├── js/appui/appui.coffee      # Логика меню (обновлено)
├── js/appui/appui.js          # Скомпилированный JS
└── css/
    ├── style.css              # Глобальные стили (используется для меню)
    └── home-news.css          # Стили новостей
```

## Как использовать

### Добавить новую кнопку меню

1. **В `home.pug`** добавить элемент:
```jade
li#menu-mybutton(title="Моя кнопка") <i class="fas fa-icon"></i><br /><span>Мой текст</span>
```

2. **В `js/appui/appui.coffee`** добавить обработчик:
```coffeescript
@setAction "menu-mybutton",()=>
  window.open "https://example.com/","_blank"
```

3. **Скомпилировать** CoffeeScript:
```bash
cd c:\webProject\atmocode\studio
coffee --compile js/appui/appui.coffee
```

### Скрыть кнопку Ассеты

Когда страница с ассетами будет готова, просто удалить `style="display: none;"` из HTML:
```jade
li#menu-assets(title="Ассеты") <i class="fas fa-cube"></i><br /><span>Ассеты</span>
```

## Техническое описание

### CoffeeScript vs JavaScript
- **`.coffee`** файлы — исходный код (более компактный синтаксис)
- **`.js`** файлы — скомпилированный JavaScript (для браузера)

При изменении `.coffee` файла нужно всегда скомпилировать его в `.js`.

### Метод `setAction`
```coffeescript
@setAction "element-id", ()=>
  # код, который выполнится при клике на элемент с id="element-id"
```

## Git Commits

```
5820025 - feat: Refactor menu navigation system and add external links
c0e7a92 - chore: Add .gitignore file
```

## Проверка

✅ Все кнопки менню работают корректно  
✅ Стили применяются единообразно  
✅ Кнопка "Форум" открывает ссылку в новом окне  
✅ Внешние ссылки открываются в новом окне  
✅ Кнопка "Ассеты" скрыта и готова к активации  

---

**Автор:** Atmocode Studio Dev  
**Дата:** December 11, 2025
