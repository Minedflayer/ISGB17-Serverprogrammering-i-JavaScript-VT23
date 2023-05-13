'use strict';

const { urlencoded } = require("express");

let socket = io();

window.addEventListener('load', () => {
    let buttons = document.querySelectorAll('.birdbutton');

    buttons.forEach((button) => {
        button.addEventListener('click', sendbgk);
    });
});

function sendbgk(event) {
    event.preventDefault();

    let bildnr = event.target.getAttribute('data-birdid');

    socket.emit('bytbild', bildnr);

}

socket.on('nybakgrund', function(data){
    console.log('Byt bakgrundsbild till: ' + data.bildid);
    let body = document.querySelector('body');
    body.setAttribute('style', 
    'background-image: url("public/images/' + data.bildid + '.jpg"); ');
});





// lyssnare på birdbutton
