const { io } = require('../server');
const TicketControl = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

   client.on('nextTicket', (data, callback) => {
       let siguiente = ticketControl.nextTicket();
       console.log(siguiente);
       callback(siguiente);
   })


    client.emit('stateTicket',{
        actual: ticketControl.getLastTicket(),
        ultimos4: ticketControl.getLastFour()
    });

   client.on('atenderTicket',(data, callback) => {
       console.log(data);
       if(!data.escritorio) {
           return callback({
               err: true,
               message: 'el desktop in complete necessary'
           });
       }
       
       let atenderTicket = ticketControl.attendTicket(data.escritorio);

       callback(atenderTicket);

       client.broadcast.emit('lastFour',{
           ultimos4: ticketControl.getLastFour()
       })
   })

});
