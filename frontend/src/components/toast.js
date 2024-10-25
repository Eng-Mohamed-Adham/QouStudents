// استيراد Toastify
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

// إضافة الصوت
const notificationSound = new Audio("/path-to-your-sound-file.mp3");

// دالة لتشغيل الصوت
const playSound = () => {
  notificationSound.play();
};

// دالة لإظهار الإشعار مع الصوت
const showToastWithSound = () => {
  Toastify({
    text: "This is a notification with sound!",
    duration: 3000,  // مدة الإشعار بالمللي ثانية
    gravity: "top",  // مكان ظهور الإشعار (top or bottom)
    position: "right",  // مكان ظهور الإشعار (left, center or right)
    backgroundColor: "#4CAF50",  // لون الخلفية
  }).showToast();

  // تشغيل الصوت عند عرض الإشعار
  playSound();
};

// عند الضغط على زر معين يتم عرض الإشعار مع الصوت
document.getElementById("show-toast-btn").addEventListener("click", showToastWithSound);
