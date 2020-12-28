const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location =  'index.html';
    throw new Error('el escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');
console.log(escritorio);

// elements for html
const small = document.querySelector('small');
const btn = document.querySelector('button');
const h1 = document.querySelector('h1');
h1.textContent = `Escritorio ${escritorio}`;


btn.addEventListener('click', (event) => {
    socket.emit('atenderTicket', { escritorio: escritorio }, (response) => {
        console.log(response)
        if(response === 'no hay tickets') {
            alert(response);
            small.textContent = response;
            return;
        }
        small.textContent = `ticket ${response.number}`
    })
})
