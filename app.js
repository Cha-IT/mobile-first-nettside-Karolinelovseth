let bestilling = []

fetch('meny.json') 
    .then(response => response.json())
    .then(data => {
        const menuList = document.getElementById('menu-list');

        renderCategory("Drikke", data.meny.drikke, menuList);
        renderCategory("Smørbrød og Lunsjretter", data.meny.smørbrød_og_lunsjretter, menuList);
        renderCategory("Supper og Salater", data.meny.supper_og_salater, menuList);
        renderCategory("Søte Fristelser", data.meny.søte_fristelser, menuList);
    });

function renderCategory(title, items, container) {
    const sectionHeader = document.createElement('h3');
    sectionHeader.textContent = title;
    container.appendChild(sectionHeader);

    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
        <strong>${item.navn}</strong> - ${item.pris} kr <br>
        <small>${item.beskrivelse}</small>
        `;

        const addButton = document.createElement('button');
        addButton.textContent = "Legg til i bestilling";
        addButton.addEventListener('click', () => leggTilIBestilling(item));

        li.appendChild(addButton);
        container.appendChild(li);  
    });   
    }

function leggTilIBestilling(item){
    bestilling.push(item);
    oppdaterBestilling();
}

function oppdaterBestilling(){
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    bestilling.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.navn} - ${item.pris} kr`;

        const fjernKnapp = document.createElement('button');
        fjernKnapp.textContent = "Fjern";
        fjernKnapp.style.marginLeft = "10px";
        fjernKnapp.addEventListener('click', () => {
            bestilling.splice(index, 1);
            oppdaterBestilling();
        });

        li.appendChild(fjernKnapp);
        orderList.appendChild(li);  
    });
}

document.getElementById('submit-order').addEventListener('click', () => {
    if (bestilling.length === 0) {
      alert("Du har ikke lagt til noe i bestillingen.");
      return;
    }
  
    // Her kan du sende bestillingen til en server med fetch, men foreløpig:
    console.log("Bestilling sendt:", bestilling);
  
    alert("Takk for din bestilling! Vi har mottatt den.");
    bestilling = [];
    oppdaterBestillingVisning();
  });