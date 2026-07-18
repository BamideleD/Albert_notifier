const axios = require("axios");
const config = require("./config");

async function sendTelegram(message) {
    const url = `https://api.telegram.org/bot${config.TELEGRAM_TOKEN}/sendMessage`;

    console.log(url);

    await axios.post(url, {
        chat_id: config.CHAT_ID,
        text: message,
    });
}

module.exports = sendTelegram;