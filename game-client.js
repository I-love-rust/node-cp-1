const net = require('net');

const client = new net.Socket();
const MIN_RANGE = process.argv[2] || 1;
const MAX_RANGE = process.argv[3] || 100;

const answer = Math.floor(Math.random() * (MAX_RANGE - MIN_RANGE) + MIN_RANGE);

console.log(`Answer is ${answer}`);

client.connect(3000, 'localhost', () => {
  console.log(`Connect to server. Range: ${MIN_RANGE}-${MAX_RANGE}`);
  client.write(JSON.stringify({ range: `${MIN_RANGE}-${MAX_RANGE}` }));
});

client.on('data', (data) => {
  const message = JSON.parse(data);

  if (message.answer) {
    console.log(`Server say: ${message.answer}`);

    if (message.answer != answer) {
      client.write(JSON.stringify({ hint: message.answer < answer ? 'more' : 'less' }));
    } else {
      console.log('User guess');
      client.destroy();
    }
  }
});

client.on('close', () => {
  console.log('Connection close');
});
