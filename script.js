const showTopBtn = 300;
const backToTopButton = document.getElementById("to-top");
const modal = document.querySelector(".modal");

backToTopButton.onclick = function() {
    window.scrollTo(scrollX, 0);
  };

window.addEventListener('scroll', function() {
    backToTopButton.hidden = (scrollY < showTopBtn);
});


const allCards = document.querySelectorAll('.card'); //добавление необходимых данных в карточки
for(const oneCard of allCards)
{
    const btn = oneCard.querySelector('.buy_button');
    btn.setAttribute('btnID', oneCard.getAttribute('id')); 

    let oneDate = oneCard.querySelector('.card_date');
    const result = getDayInfo(oneDate.textContent);
    oneDate.textContent = result;
}


const allBuyButtons = document.querySelectorAll('.buy_button'); //добавление отслеживания клика по кнопке "Купить" => открытие модального окна
for(const oneBtn of allBuyButtons)
{
    oneBtn.addEventListener('click', function (evt) {
        displayModal(oneBtn.getAttribute('btnID'));
      })
}

function displayModal(id) //отобразить или скрыть модальное окно
{
  if (modal.style.display == "") {
    modal.querySelector('img').remove();
    modal.style.display = "none";

    document.getElementById('quantity').value = "1";
    document.querySelector('textarea').value = "";
  }

  else {
    modal.style.display = "";
    const item = document.getElementById(id);

    const itemInfo = document.querySelector('.item_info');

    const img = item.querySelector('img').cloneNode(true);
    img.classList.add('mini-img');
    img.setAttribute('imgID', id);

    itemInfo.append(img);
  }

}

function buyItem() //сообщение о покупке конкретного товара
{
  const itemID = modal.querySelector('img').getAttribute('imgID');

  const itemName = document.getElementById(itemID).querySelector('h3').textContent;
  const num = document.getElementById('quantity').value;

  alert("Вы купили товар '" + itemName + "', (" + num + " шт.)");
  
  displayModal();
}


function getDayInfo(dt) //преобразование числовой даты
{
  const datePart = dt.split('.');
  const date = new Date(datePart[2], datePart[1]-1, datePart[0]);

  const allDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const allMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

  const weekDay = allDays[date.getDay()];
  const weekNumber = Math.ceil(date.getDate()/7);
  const month = allMonths[date.getMonth()];

  return (weekDay + ", " + weekNumber + " неделя " + month + " " + date.getFullYear() + " года");
}

const switchBtn = document.querySelector('.switcher button'); //"темная" или "светлая" темы
switchBtn.addEventListener('click', function(evt) {
  document.querySelector('body').classList.toggle('dark');
})