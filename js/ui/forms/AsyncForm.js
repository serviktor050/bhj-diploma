/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error;      
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    const forms = document.querySelectorAll(".form");
    for (let form of forms) {
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        this.submit();
      })
    }
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    let dataObject = {};
    formData = new FormData(this.element);
    entries = formData.entries();

    for (let item of entries) {
      let key = item[0]; 
      let value = item[1];
      dataObject[key] = value;
    }
    return dataObject
  }

  onSubmit( options ) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    let options = {};
    options.url = this.element.getAttribute("action");
    options.method = this.element.getAttribute("method");
    options.data = this.element.getData();
    this.onSubmit(options);
  }
}
