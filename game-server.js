const net = require('net');

const server = net.createServer((socket) => {
  console.log('Game start!');

  let MIN_RANGE, MAX_RANGE;

  socket.on('data', (data) => {
    const message = JSON.parse(data);

    if (message.range) {
      console.log(`Game start, range: ${message.range}`);
      let params = message.range.split("-");
      MIN_RANGE = parseInt(params[0]);
      MAX_RANGE = parseInt(params[1]);
      console.log(MIN_RANGE, MAX_RANGE);
      socket.write(JSON.stringify({ answer: Math.floor((MIN_RANGE + MAX_RANGE) / 2) }));
    }

    if (message.hint) {
      console.log(`Answer is ${message.hint}`);
      if (message.hint === "less") {
        MAX_RANGE = Math.floor((MIN_RANGE + MAX_RANGE) / 2) - 1;
      }
      if (message.hint === "more") {
        MIN_RANGE = Math.floor((MIN_RANGE + MAX_RANGE) / 2) + 1;
      }
      socket.write(JSON.stringify({ answer: Math.floor((MIN_RANGE + MAX_RANGE) / 2) }));
    }
  });

  socket.on('close', () => {
    console.log('Game end!');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listen port ${PORT}`);
});
