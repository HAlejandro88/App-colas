const fs =  require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}


class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if(data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;

        } else {
            this.restartCount();
        }
    }

    restartCount() {
        this.ultimo = 0;
        this.tickets = [];
        this.lastFour = [];
        this.saveFile();
    }

    nextTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.saveFile();

        return `Ticket ${ this.ultimo }`;
    }
    saveFile() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            lastFour: this.lastFour
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    getLastTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getLastFour() {
        return this.lastFour;
    }


    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'no hay tickets';
        }

        let numberTicket = this.tickets[0].number;
        this.tickets.shift();

        let attendTicket = new Ticket(numberTicket, desktop);
        this.lastFour.unshift(attendTicket);

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1); // delete last element
        }

        console.log('utlimos 4', this.lastFour);

        this.saveFile();

        return attendTicket;
    }
}


module.exports = TicketControl;
