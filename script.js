
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const downloadBtn = document.getElementById('downloadBtn');
const message = document.getElementById('message');
const progressBarFill = document.getElementById('progressBarFill');

uploadBtn.addEventListener('click', function () {
  const file = fileInput.files[0];
  if (!file) {
    message.innerText = "Please select a file first.";
    return;
  }

  const reader = new FileReader();

  reader.onprogress = function (e) {
    if (e.lengthComputable) {
      const percentLoaded = Math.round((e.loaded / e.total) * 100);
      progressBarFill.style.width = percentLoaded + '%';
      progressBarFill.textContent = percentLoaded + '%';
      if (percentLoaded >= 100) {
        downloadBtn.style.display = 'inline-block';
      }
    }
  };

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const header = new TextDecoder("utf-8").decode(data.slice(0, 4));

    if (header === 'MThd') {
      message.innerText = "Valid MIDI file detected.";
    } else if (file.name.endsWith('.flp')) {
      message.innerHTML = `
        <span style="color:red;">FL Studio project detected (.flp). This is not a valid MIDI file.<br>
        Please export your project to MIDI from FL Studio:<br>
        File > Export > MIDI file (.mid)</span>
      `;
    } else {
      message.innerHTML = `
        <span style="color:red;">Invalid file. Expected a MIDI header "MThd", but got "${header}".</span>
      `;
    }
  };

  reader.readAsArrayBuffer(file);
});

downloadBtn.addEventListener('click', function () {
  alert("This is just a placeholder. Add your actual download link or logic here.");
});
