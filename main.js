let coverPage = document.getElementById("cover-page");
let overlay = document.getElementById("overlay");
let mainContent = document.getElementById("main-content");
let enterBtn = document.getElementById("enter-btn");

coverPage.style.display = "none";
overlay.style.display = "none";
mainContent.style.display = "block";

enterBtn.addEventListener("click", (e) => {
    coverPage.style.display = "none";
    overlay.style.display = "none";
    mainContent.style.display = "block";
});


console.log(data);

function populate_idea_modal() {
    const ideasData = data.arts.ideas;

    let ideaModalOverlay = document.getElementById("idea-modal-overlay");
    let ideaModal = document.getElementById("idea-modal");
    ideaModalOverlay.style.display = "block";
    ideaModal.style.display = "block";
    let idx = 1*ideaModal.dataset.index;

    document.getElementById("idea-modal-title").innerHTML = ideasData[idx].title;
    document.getElementById("idea-modal-synopsis").innerHTML = ideasData[idx].details.synopsis;
    document.getElementById("idea-modal-treatment").innerHTML = ideasData[idx].details.treatment;
    document.getElementById("idea-modal-character").innerHTML = ideasData[idx].details.character;
}

function activate_idea_modal_btns() {

    let ideaModalOverlay = document.getElementById("idea-modal-overlay");
    let ideaModal = document.getElementById("idea-modal");

    document.getElementById("idea-modal-btn-close").addEventListener('click', (e) => {
        ideaModalOverlay.style.display = "none";
        ideaModal.style.display = "none";
        ideaModal.dataset.index = -1;
    });
    document.getElementById("idea-modal-btn-left").addEventListener('click', (e) => {
        let idx = 1*ideaModal.dataset.index;
        idx = idx - 1;
        if(idx < 0) idx = ideasData.length - 1;
        ideaModal.dataset.index = idx;
        populate_idea_modal();
    });
    document.getElementById("idea-modal-btn-right").addEventListener('click', (e) => {
        let idx = 1*ideaModal.dataset.index;
        idx = (idx + 1) % (ideasData.length);
        ideaModal.dataset.index = idx;
        populate_idea_modal();
    });
}

function populate_ideas() {
    ideasData = data.arts.ideas;

    let artIdeas = document.getElementById("art-ideas-row");
    ideasData.forEach((ideaData, index) => {
        let idea = document.createElement('div');
        idea.className = 'col-lg-4 col-sm-6 col-xs-12';
        idea.innerHTML = `
            <div class="card card-ideas mt-2 mb-2" style="background-image: url(${ideaData.bg});">
                <div class="card-ideas-overlay">
                    <div class="card-ideas-ontop">
                        <h1 class="mt-2 ml-2 mr-2 card-ideas-title">
                            ${ideaData.title}
                        </h1>
                        <p class="lead">
                            ${ideaData.tagline}
                        </p>
                    </div>
                    <button data-index="${index}" class="card-ideas-btn">Read Script</button>
                </div>
            </div>
        `;
        artIdeas.appendChild(idea);
    });

    let idea = document.createElement('div');
    idea.className = 'col-lg-4 col-sm-6 col-xs-12';
    idea.innerHTML = `
        <div class="card card-more-ideas mt-2 mb-2">
            <div style="color:white; position: absolute; text-align: center; top:30%; left:20%">
                <h1 class="display-1">
                    ...
                </h1>
                <p style="font-size: large;">More ideas along the way!</p>
            </div>
        </div>
    `;
    artIdeas.appendChild(idea);

    readScripts = document.getElementsByClassName("card-ideas-btn");
    for(readScript of readScripts) {
        let idx = readScript.dataset.index * 1;
        readScript.addEventListener('click', (evt) => {
            let ideaModal = document.getElementById("idea-modal");
            ideaModal.dataset.index = idx;
            populate_idea_modal();
            activate_idea_modal_btns();
        });
    }
}

populate_ideas();