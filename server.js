'use strict';

const fs = require('fs');
const express = require('express');
const server = express();

// VARIABLEN / KONSTANTEN
let paths = {
    content: 'data/inhalt.json'
}

// MIDDLEWARE
server.use(express.static('public', {
    extensions: ['html']
}));
// Post-Daten als JSON interpretieren und in req.body schreiben
server.use(express.json());


// FUNKTIONEN
const loadFile = pfad => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            pfad,
            (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    data = data.toString();
                    resolve(data);
                }
            }
        )
    })
}
const saveFile = (pfad, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            pfad,
            data,
            err => {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            }
        )
    })
}


// ROUTEN
// Anfrage des Client annahmen und Inhaltsdaten zum Client senden
server.get('/load_inhalt', (req, res) => {
    loadFile(paths.content).then(
        data => res.send(data.toString())
    ).catch(
        () => res.send('{}')
    )

})

// Inhaltsdaten vom Client annehmen und in eine Datei speichern
server.post('/save_inhalt', (req, res) => {
    saveFile(paths.content, JSON.stringify(req.body)).then(
        () => res.send('ok')
    ).catch(
        () => res.send('unok')
    )
})

const init = () => {
    server.listen(80, err => console.log(err || 'Server läuft'));
}

init();