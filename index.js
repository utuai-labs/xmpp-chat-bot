const {Client, ltx, xml} = require('node-xmpp-client') 
// const ltx = Client.ltx 

const options = { 
  jid: 'deepak_webnexus@olark.com', 
  password: 'Bewnexus(123)',
  host: 'olark.com',
  port: 5222
  // host: 'olark.com:5222', 
  // resource: 'echo'  
}

const client = new Client(options)

// const sendPresence = () => { 
//   var stanza = new ltx.Element('presence') 
//   console.log('Sending presence: ' + stanza.toString()) 
//   client.send(stanza) 
// }  

// const client = new Client(options);

// const client = new Client()

// client.start('ws://olark.com:5222')

// client
//   // .start('localhost') // Auto
//   // .start('xmpp://localhost:5222') // TCP
//   .start('xmpps://olark.com:52223') // TLS
//   // .start('ws://localhost:5280/xmpp-websocket') // Websocket
//   // .start('wss://localhost:5281/xmpp-websocket') // Secure WebSocket
//   .catch(err => {
//     console.error('start failed', err)
//   })


client.on('error', err => {
  console.error('❌', err.toString())
})

client.on('status', (status, value) => {
  console.log('🛈', status, value ? value.toString() : '')
})

client.on('online', jid => {
  console.log('🗸', 'online as', jid.toString())
})

// client.on('stanza', stanza => {
//   console.log('⮈', stanza.toString())
// })

// client.handle('authenticate', authenticate => {
//   return authenticate('deepak_webnexus@olark.com', 'Bewnexus(123)')
// })

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

// client.on('stanza', (stanza) => { 
//   if (false === stanza.is('message')) return /* Not a <message/> stanza */ 
//   const messageContent = stanza.getChildText('body') 
//   if (!messageContent) return /* Not a chat message */ 
//   const from = stanza.attr('from') 
//   const logEntry = `Received message from ' ${from} ' with
//     content:\n${messageContent}`
//   console.log(logEntry)
//   const reply = new ltx.Element( 
//       'message', 
//         { type: 'chat', to: from } 
//     ) 
//   reply.c('body').t(messageContent) 
//   client.send(reply)
 
// }) 

// process.on('unhandledRejection', (reason, p) => {
//   console.log(
//     'Possibly Unhandled Rejection at: Promise ',
//     p,
//     ' reason: ',
//     reason
//   )
// })

