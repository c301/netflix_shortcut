async function getBtnsContainer(){
    var showSubtitleMenuBtn = document.querySelector('.button-nfplayerSubtitles');
    var container = showSubtitleMenuBtn.parentElement.querySelector('.popup-content-wrapper');
    if( container.childElementCount > 0 ) return container;
    showSubtitleMenuBtn.click();
    // await wait(200);

    //repeat steps, since we migth need to click twice to show menu first and then actually open the menu
    container = showSubtitleMenuBtn.parentElement.querySelector('.popup-content-wrapper');
    if( container.childElementCount > 0 ) return container;
    showSubtitleMenuBtn.click();
    // await wait(200);
    container = showSubtitleMenuBtn.parentElement.querySelector('.popup-content-wrapper');
    return container
}

function closeBtnsContainer(){
    var showSubtitleMenuBtn = document.querySelector('.button-nfplayerSubtitles');
    var container = showSubtitleMenuBtn.parentElement.querySelector('.popup-content-wrapper');
    if( container.childElementCount <= 0 ) return;

    showSubtitleMenuBtn.click();
}

async function getOffBtn(){
    var btn = ( await getBtnsContainer() ).querySelector("[data-uia^=track-subtitle-Off]");
    return btn
}

async function getOnBtn(){
    var btn = ( await getBtnsContainer() ).querySelector("[data-uia^=track-subtitle-En]");
    return btn
}

async function enableSubtitle(){
    ( await getOnBtn() ).click();
    closeBtnsContainer()
}

async function disableSubtitle(){
    ( await getOffBtn() ).click();
    closeBtnsContainer()
}

async function isSubtitleDisabled(){
    return ( await getOffBtn() ).classList.contains("selected");
}

async function KeyPress(e) {
    var evtobj = window.event? event : e

    if (evtobj.keyCode == 86) {
        if( await isSubtitleDisabled() ){
            enableSubtitle();
        }else{
            disableSubtitle();
        }
    };
}

document.onkeydown = KeyPress;
