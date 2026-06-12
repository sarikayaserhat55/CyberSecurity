/* ==========================================================================
   SİBER GÜVENLİK SALDIRI SİMÜLASYONU MANTIĞI
   ========================================================================== */

// Aktif simülasyon zamanlayıcısını takip eden global değişken.
window.activeSimulationTimeout = null;

/**
 * Belirli bir siber saldırı türünü konsolda simüle eder (Sadeleştirilmiş Metinler).
 * @param {string} attackType - Simüle edilecek saldırının türü ('ddos', 'sql', 'phishing', 'brute')
 */
function startSimulation(attackType) {
    const consoleEl = document.getElementById("terminal-console");
    if (!consoleEl) return;

    // Çalışan eski simülasyonları iptal et
    if (window.activeSimulationTimeout) {
        clearTimeout(window.activeSimulationTimeout);
        window.activeSimulationTimeout = null;
    }

    consoleEl.innerHTML = "";
    let logs = [];

    if (attackType === 'ddos') {
        logs = [
            { text: "[SİSTEM] DDoS simülasyonu başlatıldı...", type: "text-yellow" },
            { text: "[İŞLEM] Sunucuya yüksek miktarda sahte trafik gönderiliyor...", type: "" },
            { text: "[DURUM] Sunucu kaynak limitine ulaştı. CPU: %98 | RAM: %94", type: "text-yellow" },
            { text: "[SONUÇ] Sunucu aşırı yükten çöktü, erişim kesildi!", type: "text-red" },
            { text: "[ÖNLEM] İstek sınırlama (Rate Limiting) ve CDN koruması kullanılmalıdır.", type: "text-green" }
        ];
    } else if (attackType === 'sql') {
        logs = [
            { text: "[SİSTEM] SQL Injection simülasyonu başlatıldı...", type: "text-yellow" },
            { text: "[İŞLEM] Giriş formuna SQL komutu enjekte ediliyor: ' OR '1'='1", type: "" },
            { text: "[DURUM] Veritabanı filtresi aşıldı, sorgu kabul edildi.", type: "text-yellow" },
            { text: "[SONUÇ] Veritabanına sızıldı, kullanıcı şifreleri ele geçirildi!", type: "text-red" },
            { text: "[ÖNLEM] Parametreli sorgular (Prepared Statements) kullanılmalıdır.", type: "text-green" }
        ];
    } else if (attackType === 'phishing') {
        logs = [
            { text: "[SİSTEM] Oltalama (Phishing) simülasyonu başlatıldı...", type: "text-yellow" },
            { text: "[İŞLEM] Sahte e-posta gönderildi, kurban sahte bağlantıya tıkladı.", type: "" },
            { text: "[DURUM] Kurban sahte giriş paneline şifresini girdi.", type: "text-yellow" },
            { text: "[SONUÇ] Giriş bilgileri saldırganın sunucusuna sızdırıldı!", type: "text-red" },
            { text: "[ÖNLEM] Gönderen adresleri kontrol edilmeli ve MFA aktif edilmelidir.", type: "text-green" }
        ];
    } else if (attackType === 'brute') {
        logs = [
            { text: "[SİSTEM] Kaba Kuvvet (Brute Force) simülasyonu başlatıldı...", type: "text-yellow" },
            { text: "[İŞLEM] Sık kullanılan şifreler sırayla deneniyor...", type: "" },
            { text: "[DURUM] Doğru şifre tespit edildi: 'serhat123'", type: "text-yellow" },
            { text: "[SONUÇ] Panele yetkisiz yönetici girişi sağlandı!", type: "text-red" },
            { text: "[ÖNLEM] Güçlü şifre politikaları ve hesap kilitleme uygulanmalıdır.", type: "text-green" }
        ];
    }

    let currentLine = 0;

    function printNextLine() {
        if (currentLine < logs.length) {
            const log = logs[currentLine];
            const p = document.createElement("p");
            p.className = `log-line ${log.type}`;
            p.innerText = log.text;
            consoleEl.appendChild(p);
            currentLine++;
            
            consoleEl.scrollTop = consoleEl.scrollHeight;
            window.activeSimulationTimeout = setTimeout(printNextLine, 600);
        } else {
            const p = document.createElement("p");
            p.className = "log-line blink";
            p.innerText = "[SİMÜLASYON TAMAMLANDI]";
            consoleEl.appendChild(p);
            consoleEl.scrollTop = consoleEl.scrollHeight;
            window.activeSimulationTimeout = null;
        }
    }

    printNextLine();
}

/* ==========================================================================
   ÖĞREN SAYFASI MODAL KONTROL MANTIĞI (learn.html)
   ========================================================================== */

/**
 * Eğitim detay modal penceresini açar (Sadeleştirilmiş Metinler).
 * @param {string} concept - Tıklanan eğitim başlığı ('basic', 'network', 'malware', 'phishing')
 */
function openLearnModal(concept) {
    const modal = document.getElementById("learn-modal");
    const titleEl = document.getElementById("modal-title");
    const descEl = document.getElementById("modal-desc");
    if (!modal || !titleEl || !descEl) return;

    let title = "";
    let desc = "";

    if (concept === 'basic') {
        title = "Temel Güvenlik";
        desc = "Şifreleriniz en az 12 karakter olmalı, harf, rakam ve sembol içermelidir. İki Faktörlü Doğrulama (MFA) hesaplarınızı korur.";
    } else if (concept === 'network') {
        title = "Ağ Güvenliği";
        desc = "İnternet trafiğinizi şifrelemek için VPN, yerel ağınızı korumak için Güvenlik Duvarı (Firewall) kullanın.";
    } else if (concept === 'malware') {
        title = "Zararlı Yazılımlar";
        desc = "Fidye yazılımları ve virüslerden korunmak için sistemlerinizi güncel tutun, kaynağı belirsiz dosyaları indirmeyin.";
    } else if (concept === 'phishing') {
        title = "Sosyal Mühendislik";
        desc = "Oltalama e-postalarındaki linklere tıklamayın, URL adreslerini kontrol etmeden şifrenizi girmeyin.";
    }

    titleEl.innerText = title;
    descEl.innerText = desc;
    modal.style.display = "flex";
}

function closeLearnModal() {
    const modal = document.getElementById("learn-modal");
    if (modal) {
        modal.style.display = "none";
    }
}

/* ==========================================================================
   ŞİFRE ANALİZİ MANTIĞI (password.html)
   ========================================================================== */

function togglePasswordVisibility() {
    const input = document.getElementById("password-input");
    const btn = document.getElementById("toggle-btn");
    if (!input || !btn) return;

    if (input.type === "password") {
        input.type = "text";
        btn.innerText = "🔒";
    } else {
        input.type = "password";
        btn.innerText = "👁️";
    }
}

function analyzePassword() {
    const input = document.getElementById("password-input").value;
    const bar = document.getElementById("strength-bar");
    const text = document.getElementById("strength-text");
    const crackTime = document.getElementById("crack-time");
    
    if (!bar || !text || !crackTime) return;

    const reqs = {
        length: document.getElementById("req-length"),
        upper: document.getElementById("req-upper"),
        lower: document.getElementById("req-lower"),
        number: document.getElementById("req-number"),
        special: document.getElementById("req-special")
    };

    if (input.length === 0) {
        bar.style.width = "0%";
        bar.style.backgroundColor = "transparent";
        text.innerText = "Lütfen bir şifre girin";
        text.style.color = "#a0aec0";
        crackTime.innerText = "Belirsiz";
        crackTime.style.color = "#cbd5e0";
        
        for (let key in reqs) {
            if (reqs[key]) {
                reqs[key].className = "req-item invalid";
            }
        }
        return;
    }

    const checks = {
        length: input.length >= 8,
        upper: /[A-Z]/.test(input),
        lower: /[a-z]/.test(input),
        number: /[0-9]/.test(input),
        special: /[!@#$%^&*()_+\-=\[\]{};':",./<>?~\\|]/.test(input)
    };

    let score = 0;
    
    for (let key in checks) {
        if (reqs[key]) {
            if (checks[key]) {
                reqs[key].className = "req-item valid";
                score++;
            } else {
                reqs[key].className = "req-item invalid";
            }
        }
    }

    if (input.length >= 12) score++;

    if (score <= 2) {
        bar.style.width = "25%";
        bar.style.backgroundColor = "#ff3366";
        text.innerText = "Zayıf Şifre (Siber Tehdit Altında!)";
        text.style.color = "#ff3366";
        crackTime.innerText = "Milisaniyeler içinde!";
        crackTime.style.color = "#ff3366";
    } else if (score <= 4) {
        bar.style.width = "60%";
        bar.style.backgroundColor = "#ffbd2e";
        text.innerText = "Orta Seviye Şifre";
        text.style.color = "#ffbd2e";
        crackTime.innerText = input.length < 10 ? "Yaklaşık 3 gün" : "Yaklaşık 6 ay";
        crackTime.style.color = "#ffbd2e";
    } else {
        bar.style.width = "100%";
        bar.style.backgroundColor = "#27c93f";
        text.innerText = "Güçlü Şifre (Güvenli!)";
        text.style.color = "#27c93f";
        crackTime.innerText = input.length < 12 ? "Yaklaşık 250 yıl" : "Milyonlarca Yıl (Kırılamaz!)";
        crackTime.style.color = "#27c93f";
    }
}

/* ==========================================================================
   TOPLULUK SAYFASI HABER BÜLTENİ MANTIĞI (community.html)
   ========================================================================== */

function handleSubscribe(event) {
    event.preventDefault();

    const emailInput = document.getElementById("subscriber-email");
    const statusEl = document.getElementById("subscription-status");
    if (!emailInput || !statusEl) return;

    const email = emailInput.value;
    
    statusEl.innerText = `Abonelik Başarılı! Tehdit raporları [ ${email} ] adresine iletilecektir.`;
    statusEl.className = "subscription-status success";

    emailInput.value = "";
}
