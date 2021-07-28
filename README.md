# RBK-start

# Routers

Для начала работы с библиотеками роутинга.
<br>
Потребудется:
<br>
<b>1)</b> Установить с помощью команды роутинг <b>npm install --save ninelines-router</b>
<br>
<b>2)</b> Установить с помощью команды библиотеку анимаций GSAP <b>npm install --save gsap</b>
<br>
<b>3)</b> В проекте шаблона найти файл <b>vendor.js</b> и подключить глобально GSAP

import gsap from 'gsap';
<br>
window.gsap = gsap;


<br>
<b>4)</b> В папке routers можно найти <b>animations.js</b> в котором есть 2 функции анимации.
<br>
enter/leave они отвечают за переходы между страницами.
<br>
В каждой из этих функций нужно инициализировать\убирать функции которые относятся к нужным страницам.

<hr>

<b>page</b> - это страница которую получает функция из роутера (файл router.js)
<br>
if (page === 'article') {
<br>
} else if (page === 'details') {
<br>
} else if (page === 'test') {
<br>
}
<br>
if (<b>num</b>) {
<br>
$page = $(`[data-page="${<b>page</b>}-${<b>num</b>}"]`);
<br>
}
<br>
В этом примере показывается создание страниц с вложенной категорией.

<hr>
<b>Пример страницы:</b>
<br>
.article(data-page="<b>article</b>") // если страница 1 - site.ru/article
<br>
.article(data-page="<b>article-1</b>") // если есть вложенные страницы категории  - site.ru/article/1

<hr>

Для перехода по роутингу в ссылки, добавляем дата-атрибут - <b>data-router-link</b>



<b>5)</b> В файле <b>router.js</b> находится сам роутер.
<br>
Для добавления роутера для нужной страницы, используем такую конструкцию:
<br>
router.addRoute({
<br>
path: '/article',
<br>
name: 'article',
<br>
});
<br>
<b>path</b> - url путь.
<br>
<b>name</b> - название страницы "класс самой страницы".
<br>
Для создния страниц с вложенностями:
<br>
router.addRoute({
<br>
path: '/article/:id',
<br>
name: 'article',
<br>
});

<hr>

Документация Роутинг <a href="https://github.com/ninelines-team/ninelines-router" target="_blank"> клик сюда</a>.
<br>
Документация по анимациям GSAP <a href="https://greensock.com/gsap/" target="_blank">клик сюда</a>.

<hr>


# Аналитика проекта

Для начала работы с аналитикой.
<br>
Потребуется:
<br>
<b>1)</b> Получить файл от менеджера проекта по установке аналитики.
<br>
<b>2)</b> Открыть файл counters.pug
<br>
<b>3)</b> Заполнить поля которые помечены коментариями.
<br>
<b>4)</b> Подключить файл counters.pug в index.pug в конец страницы
<br>
<b>5)</b> Установить в проект библиотеку для просмотра скроллинга страницы <b>npm install scroll-depth --save</b>
<br>
<b>6)</b> В файле <b>analytics.js</b>



