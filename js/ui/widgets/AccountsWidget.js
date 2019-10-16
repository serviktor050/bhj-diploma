/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error
    }
    this.element = element;
    this.registerEvents();
    this.update();    
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccount = this.element.querySelector(".create-account");
    const formedAccounts = this.element.querySelectorAll(".account");

    createAccount.addEventListener("click", function(event) {
      event.preventDefault();
      let formModal = App.getModal("createAccount");
      formModal.open();
    });

    for (let formedAccount of formedAccounts) {
      formedAccount.addEventListener("click", function() {
        AccountsWidget.onSelectAccount();
      });
    }

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let currentUser = User.current();
    if (currentUser) {
      let accountLists = [];
      Account.list(accountLists, (err, response) => {
        if (response && (response.success === true)) {
          this.clear();
          accountLists.forEach(function(item, i, accountLists) {
            item[i].renderItem(item);
          }, this)
        }
      })
    }
  }
  

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const formedAccounts = document.querySelectorAll(".account");

    for (let formedAccount of formedAccounts) {
      formedAccount.remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const formedAccounts = document.querySelectorAll(".account");
    for (let i = 0; i < formedAccounts.length; i++) {
      formedAccounts[i].classList.remove("active");
    }

    const selectedAccount = this.element.querySelector(`.account[data-id="${this.element.dataset.id}"]`);
    selectedAccount.addEventListener("click", function(event) {
      selectedAccount.classList.add(".active");
      App.showPage( "transactions", { account_id: this.element.dataset.id });
    })
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    return`<li class="active account" data-id="${item.id}">
    <a href="#">
        <span>${item.name}</span> /
        <span>${item.summ}</span>
    </a>
</li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    this.element.insertAdjacentHTML("beforeEnd", this.getAccountHTML(item));
  }
}
