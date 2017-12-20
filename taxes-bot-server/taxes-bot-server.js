const TelegramBot = require('node-telegram-bot-api');
const User = require('../user/user');

class TaxesTelegramBotServer extends TelegramBot {
  constructor(token, botOptions) {
    console.log('TaxesTelegramBot constructor');
    super(token, botOptions);

    this.users = {};
  };

  testBotPresents() {
    console.log('testBotPresents()');
    this.getMe().then((me) => {
      console.log('Hello! My name is %s!', me.first_name);
      console.log('My id is %s.', me.id);
      console.log('And my username is @%s.', me.username);
    });
  }

  init() {
    console.log('init()');
    this.onText(/\/start/, this.startUserFlow.bind(this));
  }

  isUserExist(chatId) {
    return Boolean(this.getExistedUser(chatId));
  }

  getExistedUser(chatId) {
    return this.users[chatId];
  }

  registerNewUser(chatId) {
    console.log('registerNewUser() chatId = ', chatId);
    const newUser = new User(chatId, this);
    this.users[chatId] = newUser;
    return newUser;
  }

  startUserFlow(message) {
    const chatId = message.chat.id;

    if (this.isUserExist(chatId)) {
      const existingUser = this.getExistedUser(chatId);

      existingUser.sendMessage('Извините, вы уже начали опрос. Продолжайте пожалуйста.');
    } else {
      const newUser = this.registerNewUser(chatId);

      newUser.confirm(
        `Добрий день!
        Я допоможу Вам розібратися, чи потрібно Вам надавати декларацію про майновий стан та доходи за 2017 рік.
        Давайте знайомитись?`
      ).then(
        () => newUser.askName(),
        () => newUser.sayGoodBye()
      ).then(
        userAnswer => newUser.saveUserName(userAnswer)
      ).then(
        () => newUser.niceToMeetYou()
      );
    }
  }
}

module.exports = TaxesTelegramBotServer;
