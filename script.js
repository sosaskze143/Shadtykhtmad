function generateCertificate() {
    const platformName = "خدماتي"; // اسم المنصة ثابت
    const name = document.getElementById('name').value;
    const idNumber = document.getElementById('idNumber').value;
    const service = document.getElementById('service').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value;
    const identifier = document.getElementById('identifier').value;
    const issueDate = new Date().toLocaleDateString();

    // تحقق من الحقول الفارغة
    if (!name || !idNumber || !service || !dob || !gender || !nationality || !identifier) {
        document.getElementById('errorMessage').innerText = "الرجاء تعبئة جميع الحقول المطلوبة.";
        document.getElementById('errorMessage').style.display = 'block';
        return; // إيقاف العملية إذا كان هناك حقل فارغ
    } else {
        document.getElementById('errorMessage').style.display = 'none'; // إخفاء رسالة الخطأ
    }

    // تعبئة بيانات الشهادة في العنصر المخفي
    document.getElementById('certificateName').innerText = `السيد/السيدة ${name}`;
    document.getElementById('certificateService').innerText = `قد استوفى جميع المتطلبات والمعايير المحددة من قبل المنصة، وهو معتمد لدى ${service} وفقًا للمعايير المعتمدة لدينا.`;
    document.getElementById('certificateDetails').innerText = `رقم الهوية: ${idNumber} | صادر بتاريخ: ${issueDate} | تاريخ الميلاد: ${dob} | الجنس: ${gender} | الجنسية: ${nationality} | رقم التعريف: ${identifier}`;

    // تحويل العنصر إلى صورة
    const certificateElement = document.getElementById('certificateTemplate');
    html2canvas(certificateElement).then(canvas => {
        const image = canvas.toDataURL("image/png"); // تحويل Canvas إلى صورة
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.style.width = '100%';
        imgElement.style.maxWidth = '800px';
        document.getElementById('certificateOutput').innerHTML = ''; // مسح المحتوى القديم
        document.getElementById('certificateOutput').appendChild(imgElement); // عرض الصورة

        // زر لتحميل الصورة
        const downloadButton = document.createElement('button');
        downloadButton.innerText = 'تحميل الشهادة';
        downloadButton.style.marginTop = '20px';
        downloadButton.onclick = () => {
            const link = document.createElement('a');
            link.href = image;
            link.download = `شهادة_${name}.png`;
            link.click();
        };
        document.getElementById('certificateOutput').appendChild(downloadButton);
    });
}
