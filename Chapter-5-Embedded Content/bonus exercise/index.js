const sounds = ["aha", "dan", "back_of_the_net"]; // Add all sample names here
const board = document.getElementById("soundboard");

sounds.forEach(name => {
  const button = document.createElement("button");
  button.className = "sound-button";
  button.innerText = name.replace(/_/g, ' ');

  button.onclick = () => {
    new Audio(`samples/${name}.mp3`).play();
  };

  board.appendChild(button);
});
