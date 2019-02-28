const appendModal = (img, modalCount, modalAnimalName, sex, inShelter, age, cast, desc) => {
    
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.setAttribute("data-modal", modalCount);
    
    let modalBackground = document.createElement("label");
    modalBackground.classList.add("modal__background");
    
    let modalWindow = document.createElement("div");
    modalWindow.classList.add("modal__window");
    
    let modalBody = document.createElement("div");
    modalBody.classList.add("modal__body");
    
    let grid = document.createElement("div");
    grid.classList.add("grid", "grid--col2");
    
    let modalThumbnail = document.createElement("div");
    modalThumbnail.classList.add("modal__thumbnail");
    modalThumbnail.setAttribute('style', 'background:url(' + img + ') no-repeat center; background-size:cover;');
    
    let modalText = document.createElement("div");
    modalText.classList.add("modal__text");
    
    let modalHeader = document.createElement("div");
    modalHeader.classList.add("modal__header");
    
    let closeModal = document.createElement("button");
    closeModal.classList.add("close-modal", "modal__close");
    
    let modalName = document.createElement("h3");
    let modalInfo = document.createElement("p");
    let modalInfo2 = document.createElement("p");
    let modalInfo3 = document.createElement("p");
    let modalInfo4 = document.createElement("p");
    let modalInfo5 = document.createElement("p");
    let beInShelter = document.createTextNode("Varjupaigas alates: " + inShelter);
    let caster = document.createTextNode("Kastreeritud: " + cast);
    let modalAge = document.createTextNode("Vanus: " + age);
    let modalSex = document.createTextNode("Sugu: " + sex);
    let description = document.createTextNode("Kirjeldus: " + desc);
    
    // APPEND
    modal.appendChild(modalBackground);
    modal.appendChild(modalWindow);
    modalWindow.appendChild(modalBody);
    modalBody.appendChild(grid);
    grid.appendChild(modalThumbnail);
    grid.appendChild(modalText);
    modalText.appendChild(modalHeader);
    modalHeader.appendChild(closeModal);
    modalText.appendChild(modalName);
    modalName.append(modalAnimalName);
    modalText.appendChild(modalInfo);
    modalText.appendChild(modalInfo2);
    modalInfo2.appendChild(modalAge);
    modalText.appendChild(modalInfo3);
    modalText.appendChild(modalInfo4);
    modalText.appendChild(modalInfo5);
    modalInfo4.appendChild(caster);
    modalInfo3.appendChild(beInShelter);
    modalInfo.appendChild(modalSex);
    modalInfo5.appendChild(description);
    
    
    
    document.querySelector('.modalClass').appendChild(modal);
    
    if(desc == "") {
        modalInfo5.setAttribute('style', 'display:none;');
    } else {
        modalInfo5.setAttribute('style', 'display: inline;');
    }
    
    
}
const appendCard = (t, img, modalCount, toug) => {
        let card = document.createElement("div");
        card.classList.add("card", "card--large-thumbnail");
       
        let cardBody = document.createElement("div");
        cardBody.classList.add("card__body");
        
        let cardText = document.createElement("div");
        cardText.classList.add("card__text");
        let heading3 = document.createElement("h3");
        
        let cardHeader = document.createElement("div");
        
        cardHeader.classList.add("card__header");
        
        let cardInner = document.createElement("div");
        cardInner.classList.add("card__inner");
        
        let cardThumbnail = document.createElement("div");
        cardThumbnail.classList.add("card__thumbnail");
        cardThumbnail.setAttribute('style', 'background:url(' + img + ') no-repeat center; background-size:cover;');


        let buttonModal = document.createElement("button");
        buttonModal.classList.add("button", "button--purple", "button--fill", "toggle-modal");
        buttonModal.setAttribute('data-modal', modalCount)
        let buttonText = document.createTextNode('Vaata');
    
        if(toug == "Kass") {
            card.setAttribute("data-type", "cat");
        } else {
            card.setAttribute("data-type", "dog");
        }
    
    
    
    // MODAL
    
    
    

    // APPEND
        //cardContainer.append(card);
        card.appendChild(cardInner);
        cardInner.appendChild(cardHeader);
        cardHeader.appendChild(cardThumbnail);
       // cardThumbnail.appendChild(img);
        cardInner.appendChild(cardBody);
        cardBody.appendChild(cardText);
        heading3.appendChild(t);
        cardText.appendChild(heading3);
        buttonModal.appendChild(buttonText);
        cardBody.appendChild(buttonModal);
        document.querySelector('.card-container').appendChild(card);
    
    
}



const load = () => {
    axios.get('http://roodkristo.ikt.khk.ee/cockpit/api/collections/get/loomad')
    
    .then((response) => {
        let modalCount = 0;
        response.data.entries.forEach((element) => { 
            modalCount++;
            
            let toug = element.liik;
            let modalAnimalName = document.createTextNode(element.nimi);
            let t = document.createTextNode(element.nimi);
            let age = element.vanus;
            let inShelter = element.varjupaigas_alates;
            let cast = element.ster_kastr;
            let sex = element.sugu;
            let desc = element.kirjeldus;
            let img = element.pilt.path;
            appendCard(t, img, modalCount, toug);
            appendModal(img, modalCount, modalAnimalName, sex, inShelter, age, cast, desc);
            
        })
    })
    .catch((error) => {
        console.log(error);
    })
}
window.onload = load;