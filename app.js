const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const argv = require('yargs').argv;

var machine;

if (argv.machine !== false) {
  machine = require('./lib/machine');
}

// Initiation
const router = KoaRouter();
const koaBody = KoaBody();
const koaStatic = KoaStatic(`${__dirname}/web`);
const app = Koa();

app.use(koaBody);
app.use(koaStatic);
app.use(router.routes());

router.post('/api/pour', function*() {
  var json = this.request.body;

  console.log('Pour!')
  console.log(json);

  if (machine) machine.pour(json.seconds);

  this.body = json;
})

app.listen(8000);
console.log("Who wants to be a Drinkionnaire is running on http://localhost:8000")
