const { jsPDF } = window.jspdf;

// دالة لإنشاء رقم شهادة فريد
function generateCertificateNumber() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let certificateNumber = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        certificateNumber += chars[randomIndex];
    }
    return certificateNumber;
}

function generateCertificate() {
    const platformName = "خدماتي"; // اسم المنصة ثابت
    const name = document.getElementById('name').value;
    const idNumber = document.getElementById('idNumber').value;
    const service = document.getElementById('service').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value;
    const identifier = document.getElementById('identifier').value;
    const certificateNumber = generateCertificateNumber(); // إنشاء رقم شهادة تلقائي
    const issueDate = new Date().toLocaleDateString();

    const doc = new jsPDF();

    // إضافة خلفية فاخرة (إطار ذهبي)
    doc.addImage("gold-frame.jpg", "JPEG", 0, 0, 210, 297);

    // نص الشهادة
    doc.setFontSize(28);
    doc.setTextColor(40, 40, 40);
    doc.setFont("Amiri", "bold");
    doc.text("شهادة اعتماد", 105, 40, null, null, 'center');

    doc.setFontSize(18);
    doc.setTextColor(60, 60, 60);
    doc.setFont("Amiri", "normal");
    doc.text(`تشهد منصة ${platformName} بأن:`, 20, 60);
    doc.text(`السيد/السيدة ${name}`, 20, 70);
    doc.text(`قد استوفى جميع المتطلبات والمعايير المحددة من قبل المنصة،`, 20, 80);
    doc.text(`وهو معتمد لدى ${service} وفقًا للمعايير المعتمدة لدينا.`, 20, 90);
    doc.text(`رقم الهوية: ${idNumber}`, 20, 100);
    doc.text(`صادر بتاريخ: ${issueDate}`, 20, 110);
    doc.text(`رقم الشهادة: ${certificateNumber}`, 20, 120);

    doc.text(`معلوماته:`, 20, 130);
    doc.text(`تاريخ الميلاد: ${dob}`, 20, 140);
    doc.text(`الجنس: ${gender}`, 20, 150);
    doc.text(`الجنسية: ${nationality}`, 20, 160);
    doc.text(`رقم التعريف: ${identifier}`, 20, 170);

    // إضافة ختم حكومي
    doc.addImage("official-seal.png", "PNG", 80, 180, 50, 50);

    // إضافة توقيع
    doc.addImage("signature.png", "PNG", 80, 240, 50, 20);

    // إضافة باركود
    const barcodeValue = `${certificateNumber}-${idNumber}`;
    JsBarcode("#barcode", barcodeValue, { format: "CODE128", displayValue: false });
    const barcodeImg = document.querySelector("#barcode").toDataURL();
    doc.addImage(barcodeImg, "PNG", 80, 260, 50, 20);

    // حفظ الشهادة
    doc.save(`شهادة_${name}.pdf`);

    // إظهار قسم التحقق
    document.getElementById('verificationSection').style.display = 'block';
}

function verifyCertificate() {
    const verificationCode = document.getElementById('verificationCode').value;
    const idNumber = document.getElementById('idNumber').value;
    const certificateNumber = verificationCode.split('-')[0]; // استخراج رقم الشهادة من رمز التحقق

    const expectedCode = `${certificateNumber}-${idNumber}`;

    if (verificationCode === expectedCode) {
        document.getElementById('verificationResult').innerText = "الشهادة صحيحة.";
    } else {
        document.getElementById('verificationResult').innerText = "الشهادة غير صحيحة.";
    }
}
