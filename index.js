const Client = require('node-xmpp-client') 
const ltx = Client.ltx 

const options = { 
  jid: 'deepak_webnexus@olark.com', 
  password: 'Bewnexus(123)',
  host: 'olark.com:5222', 
  resource: 'echo'  
}

const sendPresence = () => { 
  var stanza = new ltx.Element('presence') 
  console.log('Sending presence: ' + stanza.toString()) 
  client.send(stanza) 
}  

const client = new Client(options) 

client.once('online', (connectionDetails) => { 
  console.log('We are connected!') 
  console.log(connectionDetails)
  sendPresence() 
}) 

// client.on('stanza', (stanza) => { 
//  console.log('Incoming stanza: ' + stanza.toString()) 
// }) 
// stanza.is('message') // === true 
// stanza.is('iq') // === false 
// stanza.attr('from') // ==  test@localhost/2054a4ab 
// stanza.attr('id') // ==  41f40db8 
// console.log(stanza.attrs) /* 
//    { id: '41f40db8', 
//      type: 'chat', 
//      to: 'bot@localhost', 
//      from: 'test@localhost/2054a4ab', 
//      'xmlns:stream': 'http://etherx.jabber.org/streams' } */ 
// const message = stanza.getChildText('body') 
// const message = stanza.getChild('body').getText() /* longer alternative */ 

client.on('stanza', (stanza) => { 
  if (false === stanza.is('message')) return /* Not a <message/> stanza */ 
  const messageContent = stanza.getChildText('body') 
  if (!messageContent) return /* Not a chat message */ 
  const from = stanza.attr('from') 
  const logEntry = `Received message from ' ${from} ' with
    content:\n${messageContent}`
  console.log(logEntry)
  const reply = new ltx.Element( 
      'message', 
        { type: 'chat', to: from } 
    ) 
  reply.c('body').t(messageContent) 
  client.send(reply)
 
}) 

