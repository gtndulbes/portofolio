// ======== FADE-IN SAAT SCROLL ========

// Ambil semua elemen yang punya class fade-in
const fadeElements = document.querySelectorAll('.fade-in'); // Ini akan mengambil semua elemen dengan class fade-in

// Buat Intersection Observer untuk mendeteksi elemen masuk viewport
const observer = new IntersectionObserver((entries, observer) => { // entries adalah daftar elemen yang diamati
    entries.forEach(entry => { // Loop melalui setiap entry yang diamati
        if (entry.isIntersecting) { // Kalau elemen masuk ke layar
            entry.target.classList.add('show'); // Tambahkan kelas show
            observer.unobserve(entry.target); // Stop mengamati elemen ini
        }
    });
}, { threshold: 0.2 }); // 0.2 artinya elemen muncul 20% di layar baru dianggap terlihat

// Mulai mengamati setiap elemen fade-in
fadeElements.forEach(el => observer.observe(el)); // Ini akan mengamati setiap elemen dengan class fade-in


// ======== SCROLL FADE ========
// Animasi Fade-in saat Scroll
const fadeElementss = document.querySelectorAll('.scroll-fade'); // Ambil semua elemen dengan class scroll-fade

// Cek visibilitas elemen saat scroll
function checkVisibility() { // Fungsi untuk mengecek apakah elemen terlihat di layar
    const triggerBottom = window.innerHeight * 0.85; // Batas bawah layar
    fadeElementss.forEach(el => { // Loop melalui setiap elemen dengan class scroll-fade
        const boxTop = el.getBoundingClientRect().top; // Ambil posisi atas elemen relatif terhadap viewport
        if (boxTop < triggerBottom) { // Jika posisi atas elemen lebih tinggi dari batas bawah layar
            el.classList.add('visible'); // Tambah animasi
        } 
        else { // Jika elemen tidak terlihat
            el.classList.remove('visible'); // Hilangkan kalau keluar layar
        }
    });
}

// Jalankan saat scroll
window.addEventListener('scroll', checkVisibility); // Jalankan saat halaman dimuat
window.addEventListener('load', checkVisibility); // Jalankan saat halaman dimuat


// ======== FORM HANDLER ========
// FORM HANDLER
const contactForm = document.getElementById('contact-form'); // Ambil form kontak
const formStatus = document.getElementById('form-status'); // Ambil elemen status form
const submitBtn = contactForm.querySelector('button'); // Ambil tombol

// Inisialisasi EmailJS (ganti 'YOUR_PUBLIC_KEY' dengan key dari EmailJS)
emailjs.init("ioWNTL0_I-KvHfacA"); // Ganti dengan public key EmailJS Anda
contactForm.addEventListener('submit', function(e) { // Tangkap event submit form
    e.preventDefault(); // Stop reload halaman

// Ambil data dari form
    const name = document.getElementById('name').value.trim(); // Ambil nama
    const message = document.getElementById('message').value.trim(); // Ambil pesan

// Validasi input
    if (name.length < 3) { // Jika nama kurang dari 3 karakter
        formStatus.textContent = "Nama harus lebih dari 2 karakter ❌"; // Tampilkan pesan error
        formStatus.style.color = "red"; // Ubah warna teks menjadi merah
        return; // Stop eksekusi
    } 

// Jika pesan tidak diisi
    if (message.length < 10) { // Jika pesan kurang dari 10 karakter
        formStatus.textContent = "Pesan harus lebih dari 9 karakter ❌"; // Tampilkan pesan error
        formStatus.style.color = "red"; // Ubah warna teks menjadi merah
        return; // Stop eksekusi
    }

// Jika semua validasi lolos
    formStatus.textContent = "Mengirim..."; // Tampilkan pesan mengirim
    formStatus.style.color = "white"; // Ubah warna teks menjadi hitam
    submitBtn.classList.add('loading'); // Tambahkan kelas loading ke tombol
    submitBtn.style.background = "#2563eb"; // Ubah warna tombol menjadi biru gelap

// Kirim via EmailJS
    emailjs.sendForm('service_w7gjv67', 'template_ct09wkj', this) // Ganti 'service_w7gjv67' dan 'template_ct09wkj' dengan ID service dan template Anda
    .then(() => { // Tampilkan pesan sukses
        formStatus.textContent = "Pesan berhasil dikirim! ✅"; // Tampilkan pesan sukses
        formStatus.style.color = "white"; // Ubah warna teks menjadi putih
        submitBtn.style.background = "green"; // Ubah warna tombol menjadi hijau
        contactForm.reset(); // Reset form setelah sukses
    })
    .catch((err) => { // Tangani error
        formStatus.textContent = "Gagal mengirim pesan ❌"; // Tampilkan pesan gagal
        formStatus.style.color = "white"; // Ubah warna teks menjadi putih
        submitBtn.style.background = "red"; // Ubah warna tombol menjadi merah
        console.error('Error:', err); // Log error ke konsol
    })
    .finally(() => { // Setelah selesai, hapus kelas loading
        submitBtn.classList.remove('loading'); // Hapus kelas loading dari tombol
        setTimeout(() => {
            submitBtn.style.background = "#2563eb"; // Kembalikan warna tombol ke biru gelap
        }, 2000); // Tunggu 2 detik sebelum mengembalikan warna
    });
});


// ===== Tombol Scroll to Top =====
// Ambil tombol scroll to top
const scrollTopBtn = document.getElementById("scrollTopBtn"); // Ambil tombol scroll to top

// Cek posisi scroll untuk menampilkan atau menyembunyikan tombol
window.addEventListener("scroll", () => { // Event saat scroll
    if (window.scrollY > 200) { // Jika scroll lebih dari 200px
        scrollTopBtn.style.display = "block"; // Tampilkan tombol
    } 
    else { // Jika scroll kurang dari 200px
        scrollTopBtn.style.display = "none"; // Sembunyikan tombol
    }
});

// Event saat tombol diklik
scrollTopBtn.addEventListener("click", () => { // Event saat tombol diklik
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll ke atas dengan animasi halus
});


// ===== Fade-in Footer Saat Terlihat =====
// Ambil elemen footer
const footerEl = document.querySelector("footer"); // Ambil elemen footer

// Cek visibilitas footer saat scroll
function checkFooterVisibility() { // Cek apakah footer terlihat di layar
    const rect = footerEl.getBoundingClientRect(); // Ambil posisi footer
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0; // Cek apakah bagian atas footer terlihat di layar
    if (isVisible) { // Jika footer terlihat
        footerEl.classList.add("show"); // Tambahkan kelas show untuk animasi
    }
}

// Jalankan saat scroll dan saat halaman dimuat
window.addEventListener("scroll", checkFooterVisibility); // Jalankan saat halaman dimuat
window.addEventListener("load", checkFooterVisibility); // Jalankan saat halaman dimuat


// ===== DYNAMIC TEXT TYPING EFFECT =====
// Ambil elemen untuk teks dinamis
document.addEventListener("DOMContentLoaded", function () { // Pastikan DOM sudah dimuat sebelum menjalankan script
    const textElement = document.getElementById("dynamic-text"); // Ambil elemen untuk teks dinamis
    const texts = ["PLC Programmer", "Circuit Designer", "Process Controller"]; // Daftar teks yang akan diketik
    let textIndex = 0; // Indeks teks saat ini
    let charIndex = 0; // Indeks karakter saat ini
    let isDeleting = false; // Apakah sedang menghapus teks
    let speed = 500; // Kecepatan ketik (ms)

// Fungsi untuk efek mengetik
    function typeEffect() { // Fungsi untuk efek mengetik
        const currentText = texts[textIndex]; // Ambil teks saat ini dari daftar
        if (!isDeleting) { // Jika tidak sedang menghapus teks
        // Mengetik
            textElement.textContent = currentText.substring(0, charIndex + 1); // Tampilkan karakter sampai indeks saat ini
            charIndex++;
            if (charIndex === currentText.length) { // Jika sudah sampai akhir teks
            // Tunggu sebelum mulai menghapus
                isDeleting = true; // Ubah status ke menghapus
                speed = 250; // Tunggu sedikit sebelum hapus
            }
        } 
        else { // Jika sedang menghapus teks
        // Menghapus
            textElement.textContent = currentText.substring(0, charIndex - 1); // Tampilkan karakter sampai indeks saat ini
            charIndex--; // Kurangi indeks karakter
            if (charIndex === 0) { // Jika sudah menghapus semua karakter
                isDeleting = false; // Ubah status ke mengetik
                textIndex = (textIndex + 1) % texts.length; // Ganti teks
                speed = 100; // Kecepatan mengetik kembali ke normal
            }
        }
        setTimeout(typeEffect, speed); // Panggil fungsi ini lagi setelah delay sesuai kecepatan
    }
    textElement.classList.add("blink"); // Tambahkan kelas blink untuk efek kursor berkedip
    typeEffect(); // Mulai efek mengetik
});


// ======== PORTFOLIO FILTER ========
// Ambil semua tombol filter dan proyek
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".portfolio-item");
// Tambahkan event listener untuk setiap tombol filter
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Hapus status aktif di semua tombol
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        // Ambil nilai filter dari tombol yang diklik
        const filterValue = btn.getAttribute("data-filter");
        // Tampilkan atau sembunyikan proyek berdasarkan kategori
        projects.forEach(project => {
            if (filterValue === "all" || project.getAttribute("data-category") === filterValue) {
                project.style.display = "block";
            }
            else {
                project.style.display = "none";
            }
        });
    });
});
