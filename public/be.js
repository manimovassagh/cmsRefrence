'use strict';

import dom from './dom.js'

// VARIABLEN / KONSTANTEN
const btnSend = dom.$('#btnSend');
const taInhalt = dom.$('#taInhalt');


// FUNKTIONEN
const senden = () => {
    const walter = new Request(
        '/save_inhalt',
        {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                inhalt: taInhalt.value
            })
        }
    )

    fetch(walter).then(
        res => res.text()
    ).then(
        data => console.log(data)
    ).catch(
        console.log
    )
}

const init = () => {

    // EVENTLISTENER
    // Falls init mehrfach aufgerufen werden kann, würde der Eventlistener zweimal zugewiesen werden und 
    // bei einem Klick würde die Funktion zweimal gestartet werden.
    // Da ein erneutes Aufrufen von Init in diesem Fall nicht geplant ist, kann man das so machen
    btnSend.addEventListener('click', senden);

}



// INIT
init();