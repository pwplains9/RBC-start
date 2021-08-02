# RBC-start

# Работа с GIT

<b>Основные комманды.</b>

<br>
cd /path/to/your/repo
<br>
git remote add origin https://Ahilko@bitbucket.org/ninelines/rbc-template.git
<br>
git push -u origin master
<br>
<b>Описание работы</b> <a href="https://github.com/ninelines-team/ninelines-docs/blob/master/24_git.md" target="_blank">здесь</a>

# Routers

Для начала работы с пакет роутинга.
<br>
Потребудется:
<br>
<b>1)</b> Установить с помощью команды роутинг <b>npm install --save ninelines-router</b>
<br>
<b>2)</b> Установить с помощью команды пакет анимаций GSAP <b>npm install --save gsap</b>
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
$page = $(`[data-page="${page}-${num}"]`);
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
<b>5)</b> Установить в проект пакет для просмотра скроллинга страницы <b>npm install scroll-depth --save</b>
<br>
<b>6)</b> В файле <b>analytics.js</b> подготовлена аналитика нативного проекта.
В Ней есть:
<br>
Примечание(Нужно менять трекеры yaCounter)
<br>
1) Просмотр глубины скроллинга страницы scroll-depth
<br>
2) Отправка события 15 секунд
<br>
3) Переход по роутингу
<br>
4) Функция для очистки контента <b>clearText</b>
<br>
5) Базовые события отправки в аналитику
<br>
6) На строчке <b>74</b> можно увидеть пример обработки события по клику
<br>
Есть случаи когда, для обработки событий нужно передавать параметры с других компонентов.
<br>
Для этого можно использовать такую конструкцию:
<br>
а) в файле с компонентом пишем -
<br>
$(document).trigger('название события', [параметры]); Параметры нужны в том случае если нужно получить определенный текст\состояние, если их несколько передаются в массиве через запетаю.
<br>
б) Далее переходим в файл с аналитикой и пишем -
<br>
$(document).on('название события', (event, параметр, параметр2) => {
<br>
ga('send', 'event', 'test', `question show ${clearText(параметр)}`, параметр2); - пример события
<br>
});
<br>
<br>

7) Функция для обработки события баннера при видимости пользователем.
<br>
Обычно есть 2 типа баннеров.
<br>
right\bottom.
<br>
В баннер добавляем атрибут data-type="" - который нужен right\bottom
<br>
И класс .js-banner
<br>
<hr>

# Адаптивное масштабирование контента
<br>
На проеках РБК используется масштабирование контента взависимости от размера экрана. Так же есть точки на которых он фиксируется, и больше не тянется.
<br>
Т.Е С помощью функций в <b>scss</b> можно сделать скейлинг контента. Это решает проблему <b>responsive</b> и мы заранее понимаем, что если макет сверстан на <b>1366px</b>, на <b>1100</b> он так же будет отображаться, только значения будут меньше.
<br>
1) В папке adaptive есть файл responsive.scss, в котором находится набор функций:
<br>
а) Функция <b>@function vw, px, vh, vm, vt.</b>
<br>
 vw - отвечает за масштабирование контента на десктоп версии.
<br>
 Остальные описаны в комментариях.
<br>
б) В файле variables.scss находятся базовые настройки(<b>переменные</b>). В него можно вносить изменения если потребуется.
<br>
в) В Комментарии <b>//Settings</b> обозначены точки адаптива. В некоторых случаях они могут изменятся, но это нужно смотреть макет от дизайнера.
<br>
2) Что бы сделать верное масштабирование контента.
<br>
а) Нужно узнать ширину страницы в макете десктопа - и посмотреть совпадает ли она с параметром $laptop в переменных, если нет то заменяем.
<br>
б) Нужно обозначить до какого момента должен масштабироваться контент, обычно это значение <b>$laptop - 1px</b>.
<br>
3) Как настроено все выше, переходим к верстке
<br>
а) Берем макет десктопа и все значения что обозначены в <b>px</b>, вставляем так --- <b>width: vw(100)</b> - где функция <b>vw</b> автоматически посчитает относительно <b>$laptop</b>. Если нужно оборачиваем в миксин который относится к <b>@include laptop {width: vw(100)}</b>
<br>
б) Когда нужно зафиксировать значения находим в <b>breakpoints.scss</b> нужный миксин - <b>@include desktop-xl {width: px(100)}</b> и вместо <b>vw > px</b>.
<br>
4) Для <b>планшета</b> и <b>мобильной</b> версии все так же.
<br>
а) <b>Планшет >1023</b> пишем <b>@include tablet {width: vt(100)}</b>
<br>
б) <b>Телефон >767</b> пишем <b>@include mobile {width: vm(100)}</b>
<hr>

# Установка Share
<br>
1) Нужно установить пакет <b>npm install --save ninelines-sharing</b>
<br>
2) В файле <b>share.js</b>, добавлена логика для работы с шерингами.
<br>
3) Что бы сделать статичный шеринг для всех страниц. Открываем index.pug и находим 3 строчки. - title \ description \ image и в них прописываем нужную информацию.
<br>
4) Что бы сделать динамический шеринг для каждой страницы уникальный. Или же подстроить шеринг под результат теста.
<br>
В index.pug должны быть эти 3 строчки.
<br>
prepend vars
<br>
- title = '?= htmlspecialchars($title) ?' - обвернуть в <>
<br>
- description = '?= htmlspecialchars($description) ?' - обвернуть в <>
<br>
- image = '?= htmlspecialchars($image) ?' - обвернуть в <>
<br>
Далее, заходим в shareSettings.php и прописываем нужную информацию под каждую страницу.
<br>
<b>Примечание.</b> Не забыть в gulpfile.js поставить в настройку spa:true;
<br>
<a href="https://github.com/ninelines-team/ninelines-sharing" target="_blank">Ссылка на пакет</a>

# Установка видео
<br>
На проектах РБК используется <b>video.js</b> плеер.
<br>
Полную настройку можно посмотреть <a href="https://github.com/ninelines-team/ninelines-docs/blob/master/19_video-js.md" target="_blank">здесь</a>
<br>
<hr>
# Анимации при скролле (без кастомного скролла)

На шаблонных проектах используются очень часто простые анимации <b>fade</b>.
<br>
Можно использовать такой пакет <b>npm install aos --save</b>
<br>
Не забыть подключить в <b>_vendor.scss</b> <b>@import "../../node_modules/aos/dist/aos";</b> файл с стилями
<br>
Так же можно сделать кастомную анимацию при тригере aos.
<br>
Базовая анимация <b>data-aos="fade-up"</b>.
<br>
Так как у нас роутинг состоит с смены видимости блоков (<b>без подрузки контента</b>).
<br>
Нужно убирать класс aos.
<br>
В файле с инициализацией есть функция <b>refresh</b>, которую нужно передавать в файл <b>animation.js</b> - где происходят инициализации функций для страниц, в функцию <b>leave</b>.
