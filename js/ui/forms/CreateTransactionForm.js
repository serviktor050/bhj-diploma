/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super (element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsSelectList = document.querySelector(".accounts-select");
    let accountLists = [];
    Account.list(accountLists, (err, response) => {
      if (response && (response.success === true)) {
        accountLists.forEach(function(item, i, accountLists) {
          return accountsSelectList.innerHTML += `<option value="${item.id}">${item.name}</option>`          
        }, this)
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    /*Transaction.create(options, (err, response) => {
      if (response && (response.success === true)) {        
        this.element.reset();

        let transactionModal = App.getModal("");//?
        transactionModal.close();

        App.update();        
      }
    })*/
  }
}
