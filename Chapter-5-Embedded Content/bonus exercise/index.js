// Sample List
const samples = [
    { name: "Ah-ha", file: "audio/ah-ha.mp3" },
    { name: "Back of the Net", file: "audio/back-of-the-net.mp3" },
    { name: "Bang Out of Order", file: "audio/bangoutoforder.mp3" },
    { name: "Dan", file: "audio/dan.mp3" },
    { name: "Email of the Evening", file: "audio/emailoftheevening.mp3" },
    { name: "Hello Partridge", file: "audio/hellopartridge.mp3" },
    { name: "I Ate a Scotch Egg", file: "audio/iateascotchegg.mp3" },
    { name: "I'm Confused", file: "audio/imconfused.mp3" },
    // you add as many you want 
  ];
  
  const grid = document.getElementById("sample-grid");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  
  let currentPage = 0;
  const samplesPerPage = 9;
  
  //load & Render Sample Buttons 
  function loadSamples(page) {
    grid.innerHTML = "";
    const start = page * samplesPerPage;
    const end = start + samplesPerPage;
    const pageSamples = samples.slice(start, end);
  
    pageSamples.forEach(sample => {
      const audio = new Audio(sample.file);
      const button = document.createElement("div");
      button.className = "sample";
      button.textContent = sample.name;
  
      audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration.toFixed(1);
        button.innerHTML = `${sample.name}<small>${duration}s</small>`;
      });
  
      button.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play();
      });
  
      grid.appendChild(button);
    });
  
    prevBtn.style.display = page === 0 ? "none" : "inline-block";
    nextBtn.style.display = end >= samples.length ? "none" : "inline-block";
  }
  
  //  Nav Button Events 
  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      loadSamples(currentPage);
    }
  });
  
  nextBtn.addEventListener("click", () => {
    if ((currentPage + 1) * samplesPerPage < samples.length) {
      currentPage++;
      loadSamples(currentPage);
    }
  });
  
  //  Text-to-Speech Feature 
  document.getElementById("speak-btn").addEventListener("click", () => {
    const text = document.getElementById("tts-input").value;
    if (text.trim() !== "") {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  });
  
  // Initial Page Load 
  loadSamples(currentPage);
  