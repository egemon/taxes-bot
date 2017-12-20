module.exports = class User {

  constructor(messageChatId, bot) {
    console.log('User constructor()');
    this.messageChatId = messageChatId;
    this.bot = bot;
  };

  sendMessage(...args) {
    console.log('User sendMessage()');
    this.bot.sendMessage(this.messageChatId, ...args);
  }
  on(...args) {
    // TODO: add listeners only for specific user
    this.bot.on(...args);
  }
  onText(regexp, listener) {
    // TODO: add listeners only for specific user
    this.bot.onText(regexp, (...args) => {
      console.log('onText listener');
      listener(...args);
      this.offText(regexp)
    });
  }
  offText(regexp) {
    this.bot.removeTextListener(regexp);
  }

  confirm(text) {
    console.log('User confirm()');
    return new Promise((resolve, reject) => {

      const options = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{text: 'Так', callback_data: 'yes'}],
            [{text: 'Ні', callback_data: 'no'}],
          ],
        }),
      };

      this.sendMessage(text, options);

      this.on('callback_query', (userAnswer) => {
        if (userAnswer.data === 'yes') {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  prompt(text) {
    return new Promise((resolve, reject) => {
      const anyTextRegexp = /.*/;
      this.sendMessage(text);
      this.onText(anyTextRegexp, (message) => {
        console.log('prompt on text() message = ', message);
        resolve(message);
      });
    });
  }

  sayGoodBye() {
    console.log('User sayGoodBye()');
    this.sendMessage('До побачення! Буду радий зустрітитися знову!');
  }

  askName() {
    console.log('User askName()');
    return this.prompt('Як до Вас звертатися?');
  }

  saveUserName(message) {
    this.userName = message.text;
  }

  niceToMeetYou() {
    this.sendMessage(`Радий з Вами познайомитись, ${this.userName}!`)
  }
};
