// Comand for enable connection for socket
const socket = io();

const label = document.querySelector('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('connect with the server');
})

socket.on('disconnect', () => {
    console.log('disconnect to server')
})

socket.on('stateTicket', (response) => {
    console.log(response);
    label.textContent = response.actual;
})


const btn = document.querySelector('button');
btn.addEventListener('click', event => {
    socket.emit('nextTicket', null, (siguienteTicket) => {
        label.textContent = siguienteTicket;
    });
})
