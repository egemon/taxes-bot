const TaxesTelegramBotServer = require('./taxes-bot-server/taxes-bot-server');

const TOKEN = '418395868:AAFAW1FtJ_pllqMe2L_jN5me5K1ln_3pr1A';
const BOT_OPTIONS = {
  polling: true,
};

const taxesBot = new TaxesTelegramBotServer(TOKEN, BOT_OPTIONS);

taxesBot.testBotPresents();
taxesBot.init();
