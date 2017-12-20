// версия с ошибкой - повторяющийся ответы
// пробую считать пользователей
var TelegramBot = require('node-telegram-bot-api');
// Test_Ir_201070_bot - name
// 418395868:AAFAW1FtJ_pllqMe2L_jN5me5K1ln_3pr1A - token
var token = '418395868:AAFAW1FtJ_pllqMe2L_jN5me5K1ln_3pr1A';
var botOptions = {
  polling: true
};
// опрос сервера через LongPolling
//  т.е. открывается соединение на непродолжительное время
// и все обновления тут же прилетают боту. Просто, но не очень надежно.
// бот сам постоянно ходит на сервер и сканирует чаты на предмет новых сообщений в них
// WebHook-боты с подписанным HTTPS-сертификатом дёргает главный сервер Telegram’а
var bot = new TelegramBot(token, botOptions);
bot.getMe().then(function(me)
{
  console.log('Hello! My name is %s!', me.first_name);
  console.log('My id is %s.', me.id);
  console.log('And my username is @%s.', me.username);
});
var users_bot = []; // массив под хранение данных о пользователях
bot.on('text', function(msg)
{
  var opt = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Так', callback_data: '1' }],
        [{ text: 'Ні. Іншим разом', callback_data: '2' }]
      ]
    })
  };
  var messageChatId = msg.chat.id;
  var messageText = msg.text;
  var messageDate = msg.date;
  var messageTime = msg.time;
  var messageUsr = msg.from.username;
  users_bot.push ({'id':messageChatId, 'date':messageDate, 'time':messageTime})
  if (messageText === '/start')
  {
    bot.sendMessage(messageChatId, 'Добрий день!\nЯ допоможу Вам розібратися, чи потрібно Вам надавати декларацію про майновий стан та доходи за 2017 рік.\nДавайте знайомитись?', opt);
    // три аргумента: первый — id чата, в который нужно отправить сообщение,
    // а второй — собственно, текст отправляемого сообщения
    // третий - параметры, кот. организуют кнопки
    bot.on('callback_query', function (msg1) {
      if (msg1.data == '2') {
        bot.sendMessage(messageChatId, 'До побачення! Буду радий зустрітитися знову!');
      }
      if (msg1.data == '1') {
        bot.sendMessage(messageChatId, 'Як до Вас звертатися?');
        console.log(msg1.data);
      }
    });
  }
  if (messageText === '/stop')
  {
    bot.sendMessage(messageChatId, 'До побачення! Буду радий зустрітитися знову!');
    console.log(users_bot);
  }
  if (messageText !== '/stop' && messageText !== '/start')
  {
    bot.sendMessage(messageChatId, 'Hello World!');
  }
});
