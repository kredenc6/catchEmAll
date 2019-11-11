catchEmAll();

async function catchEmAll() {
  const pokemonData = await loadJSON("./resources/card-data.json");
  renderCards(pokemonData["pokemon"], document.getElementById("cards"));
}

function loadJSON(url) {
  return fetch(url)
  .then(result => result.json())
  .catch(err => console.log(err.message))
  .then(data => data);
}

function renderCards(cardData, node) {
  for(let oneCardData of cardData) {
    const {image, name, moves, stats} = oneCardData;
    const card = document.createElement("div");
    const imgNode = createImgNode(image, name);
    const nameNode = createNameNode(name);
    const infoNode = createInfoNode(moves, stats);

    card.classList.add("card");
    card.appendChild(imgNode);
    card.appendChild(nameNode);
    card.appendChild(infoNode);
    
    node.appendChild(card);
  }
}

function createImgNode(src, alt) {
  const imgNode = document.createElement("img");
  imgNode.src = src;
  if(alt) {
    imgNode.alt = alt;
  }
  return imgNode;
}

function createNameNode(name) {
  const nameNode = document.createElement("h3");
  nameNode.classList.add("name");
  nameNode.innerText = name;
  return nameNode;
}

function createInfoNode(moves, stats) {
  const movesNode = createMovesNode(moves);
  const statsNode = createStatsNode(stats);
  
  const separatorNode = document.createElement("div");
  separatorNode.classList.add("separator");
  
  const infoNode = document.createElement("div");
  infoNode.classList.add("info");
  infoNode.appendChild(movesNode);
  infoNode.appendChild(separatorNode);
  infoNode.appendChild(statsNode);
  return infoNode;
}

function createMovesNode(moves) {
  const movesNode = document.createElement("div");
  movesNode.classList.add("moves");
  
  for(let move of moves) {
    const moveNode = document.createElement("p");
    moveNode.innerText = move;
    movesNode.appendChild(moveNode);
  }
  return movesNode;
}

function createStatsNode(stats) {
  const statsNode = document.createElement("div");
  statsNode.classList.add("stats");
  
  for(let stat in stats) {
    const statNode = document.createElement("p");
    statNode.innerText = `${stat}: ${stats[stat]}`;
    statsNode.appendChild(statNode);
  }
  return statsNode;
}