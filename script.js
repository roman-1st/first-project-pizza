let pricesInd = [
  { id: 1, name: 'Тонкое тесто', price: 150 },
  { id: 2, name: 'Толстое тесто', price: 200 },
  { id: 3, name: 'Сырный борт', price: 270 },
  { id: 4, name: 'Колбаса', price: 95 },
  { id: 5, name: 'Сыр', price: 85 },
  { id: 6, name: 'Кетчуп', price: 40 },
  { id: 7, name: 'Майонез', price: 35 },
  { id: 8, name: 'Помидоры', price: 55 },
  { id: 9, name: 'Огурцы', price: 70 },
  { id: 10, name: 'Чипсы', price: 50 },
  { id: 11, name: 'Ананасы', price: 150 },
]

let pricesPizza = [
  { id: 1, img: "img/burger.png", name: 'Бургер', price: 550 },
  { id: 2, img: "img/hotdog.png", name: 'Хот-дог', price: 650 },
  { id: 3, img: "img/lazania.png", name: 'Лазанья', price: 600 },
  { id: 4, img: "img/pizza-yellow.png", name: 'Пицца желтенькая', price: 640 },
  { id: 5, img: "img/pizza.png", name: 'Пицца беленькая', price: 690 },
  { id: 6, img: "img/popcorn.png", name: 'Попкорн', price: 530 },
  { id: 7, img: "img/spring-roll.png", name: 'Интересный ролл', price: 490 },
  { id: 8, img: "img/salat.png", name: 'Салатик', price: 590 },
]

let orders = []
let Pizza = []
let basket = []
let sumind = {}
let Sum = 0
let sumBasket = 0

document.addEventListener("DOMContentLoaded", function () {
  viewSumPizza(pricesPizza);
  viewSum(pricesInd);
})

function viewSumPizza(b) {
  let store1 = document.getElementById('store');
  b.forEach(c => {
    let store1div = document.createElement('div');
    store1div.id = c.id;
    store1div.innerHTML = `${c.name} <img id="pic" src="${c.img}" width=${c.width} height=${c.height}>
    <p> ${c.price} рублей </p> <button id="addP-${c.id}"> Добавить в корзину </button>`
    store1.append(store1div);
    document.getElementById(`addP-${c.id}`).addEventListener('click', () => {
      let pizzaObj = pricesPizza.find((elem) => {
        return elem.id === Number(store1div.id);
      })
      let pizzaPos = {
        id: Pizza.length,
        elem: pizzaObj,
      }

      delete pizzaPos.elem.height,
        delete pizzaPos.elem.width,
        delete pizzaPos.elem.img,

        Pizza.push(pizzaPos)
      shoppingbasketPizza(pizzaPos)
      console.log(Pizza);
    })
  })
}

function viewSum(a) {
  let storageTable = document.getElementById('storage');
  a.forEach(e => {
    let itemTR = document.createElement('tr');
    itemTR.id = e.id;
    itemTR.innerHTML = `<td>${e.name} + ${e.price} рублей </td> <button  class="btnAdd" id="add-${e.id}" > Добавить </button>`;
    storageTable.append(itemTR);
    document.getElementById(`add-${e.id}`).addEventListener('click', () => {
      let orderObj = pricesInd.find((elem) => {
        return elem.id === Number(itemTR.id);
      })

      let orderPos = {
        id: orders.length,
        elem: orderObj,
      }

      orders.push(orderPos)

      addToSum(orderPos)
      console.log(orders);
    });
  });
}

function shoppingbasketPizza(pizzaPos) {
  let basketPosition = document.createElement("tr");
  basketPosition.id = pizzaPos.id;
  basketPosition.innerHTML = `<td>${pizzaPos.elem.name}</td><td>${pizzaPos.elem.price} рублей </td> <button id="dlt-${pizzaPos.id}" class="btnDlt"> Удалить </button>`;
  document.getElementById('basket').append(basketPosition);

  sumBasket += pizzaPos.elem.price

  document.getElementById('sumBasket').innerHTML = `Стоимость заказа: ${sumBasket} рублей`
  document.getElementById(`dlt-${pizzaPos.id}`).addEventListener('click', () => {
    basketPosition.remove()
    sumBasket -= pizzaPos.elem.price;
    document.getElementById('sumBasket').innerHTML = `Стоимость заказа: ${sumBasket} рублей`;
    Pizza.splice(this, 1)
    console.log(Pizza);
    if (sumBasket == 0) {
      document.getElementById('sumBasket').innerHTML = `Стоимость заказа:`;
    }
  })
}

function addToSum(orderPos) {
  let priceRT = document.createElement("tr");
  priceRT.innerHTML = `<td>${orderPos.elem.name} + ${orderPos.elem.price} рублей</td> <button id="dlt-${orderPos.id}" class="btnDlt"> Удалить </button>`;
  document.getElementById('SelectedPos').append(priceRT);

  Sum += orderPos.elem.price

  document.getElementById('sumindpizza').innerHTML = `Стоимость пиццы ${Sum} рублей`;
  document.getElementById(`dlt-${orderPos.id}`).addEventListener('click', () => {
    priceRT.remove()
    Sum -= orderPos.elem.price
    document.getElementById('sumindpizza').innerHTML = `Стоимость пиццы ${Sum} рублей`;
    orders.splice(this, 1)
    console.log(orders);
    if (Sum == 0) {
      document.getElementById('sumindpizza').innerHTML = `Стоимость индивидуальной пиццы`;
    }
  })
}

function tobasket() {
  let sumind1 = {
    id: Pizza.length,
    elem: sumind,
  }
  sumind.name = 'Индивидуальная пицца';
  sumind.price = orders.map(item => item.elem.price).reduce((prev, curr) => prev + curr, 0)

  let indbasket = document.createElement('tr');
  indbasket.innerHTML = `<td>${sumind1.elem.name}</td><td>${sumind1.elem.price} рублей </td> <button class="btnDlt" id="dlt-${sumind1.id}"> Удалить </button>`;
  document.getElementById('basket').append(indbasket)
  sumBasket += sumind1.elem.price
  document.getElementById('btnaddtobasket').style.background = 'rgb(115, 207, 123)';
  document.getElementById('btnaddtobasket').innerHTML = 'В корзине'
  document.getElementById('sumBasket').innerHTML = `Стоимость заказа: ${sumBasket} рублей`;
  Pizza.push(sumind1)
  console.log(Pizza)

  document.getElementById(`dlt-${sumind1.id}`).addEventListener('click', () => {
    indbasket.remove();
    sumBasket -= sumind1.elem.price
    Pizza.splice(this, 1)
    document.getElementById('sumBasket').innerHTML = `Стоимость заказа: ${sumBasket} рублей`;
    console.log(Pizza);
  })
}

function btnOpenModal() {
  document.getElementById("myModal").style.display = 'block';
}

function btnCloseModal() {
  document.getElementById("myModal").style.display = 'none'
}

function btnopenbasketmodal() {
  document.getElementById("basket-modal").style.display = 'block';
}

function btnclosebasketmodal() {
  document.getElementById("basket-modal").style.display = 'none';
}

function checkoutalert() {
  if (sumBasket == 0) {
    alert('Вы ничего не выбрали=(')
  } else if (sumBasket < 700) {
    alert('Минимальная сумма заказа 700 рублей, добавьте еще чуть-чуть =)')
  } else {
    alert(`Заказ на сумму ${sumBasket} рублей сформирован! Ожидайте подтверждения заказа!`)
  }
}


// функция для удаления елемента в html.

// function removeElement(from, element) {
//   from.removeChild(element)
// }

// createElement(
//           "h6",
//           "shadow-sm p-3 mb-5 bg-warning rounded card-item",
//           "<h5>" + Ingredient.name + " <span class=\"badge badge-secondary\" >"
//           + Ingredient.price + "р"
//           + "</span>"
//           + "<button type=\"button\"  class=\"close delete-ingredient\"  aria-label=\"Close\">\n" +
//           "  <span id=\"delete-ingredient" + ingredientId + "\" " + "aria-hidden=\"true\">&times;</span>\n" +
//           "</button></h5>",
//           className("card-body card-ingredient-body")[0]
//       )

// Цель проекта: создание, изменение, получение и отображение данных масива в html при взаимодейстии с элементом.