const socket = io();


const lblTicket1 = document.getElementById('lblTicket1');
const lblTicket2 = document.getElementById('lblTicket2');
const lblTicket3 = document.getElementById('lblTicket3');
const lblTicket4 = document.getElementById('lblTicket4');

const lblEscritorio1 = document.getElementById('lblEscritorio1');
const lblEscritorio2 = document.getElementById('lblEscritorio2')
const lblEscritorio3 = document.getElementById('lblEscritorio3')
const lblEscritorio4 = document.getElementById('lblEscritorio4')

const lblTickets = [lblTicket1,lblTicket2,lblTicket3,lblTicket4];
const lblEscritorios = [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4];

socket.on('stateTicket' ,data => {
    console.log(data);
    renderHtml(data.ultimos4)
})

socket.on('lastFour' ,data => {
    const audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    renderHtml(data.ultimos4)
})


function renderHtml(lastFour) {
    for (let i = 0; i <= lastFour.length -1; i++ ) {
        lblTickets[i].textContent = `Ticket ${lastFour[i].number}`;
        lblEscritorios[i].textContent = `Escritorio ${lastFour[i].desktop}`;
    }
}
