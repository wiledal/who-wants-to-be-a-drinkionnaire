const five = require('johnny-five');
const argv = require('yargs').argv;

var board;
if (argv.chip) {
  const chipio = require('chip-io');
  board = new five.Board({
    io: new chipio()
  });
}else{
  board = new five.Board();
}

var ready = false;
var pouring = false;
var things = {};

board.on('ready', () => {
  ready = true;

  if (argv.chip) {
    things.tap = new five.Led('CSID1');
  }else{
    things.tap = new five.Led(13);
  }

  things.tap.off();
});

module.exports = {
  pour(seconds) {
    if (!ready) {
      console.log(' == Board not ready, exiting.');
      return;
    }
    if (pouring) return;

    pouring = true;
    console.log(` == Pouring for ${seconds} seconds...`);

    things.tap.on();
    setTimeout(() => {
      console.log(` == Done pouring!`);
      things.tap.off()
      pouring = false
    }, parseFloat(seconds) * 1000)
  }
}
