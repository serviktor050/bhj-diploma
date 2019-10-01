/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.register(options, (err, response) => {
      if (response && (response.success === true)) {
        this.element.reset();
        App.setState("user-logged");
        let registerModal = App.getModal("register");
        registerModal.close();
      }
    })
  }
}
