var gLayer = goolib.Layer;
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

class SettingsLayer extends gLayer {
  constructor() {
    super({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,.8)'
    })

    this.secondsInput = new gLayer('input', {
      fontSize: 20,
      padding: '10px'
    })
    this.secondsInput.el.value = 2

    this.addChild(this.secondsInput);

    this.closeButton = new gLayer({
      position: 'absolute',
      bottom: 0,
      width: '100%',
      padding: '25px',
      lineHeight: 0,
      textAlign: 'center',
      background: '#909090'
    })
      .text('Close')
      .addTo(this)
      .on('click', () => {
        this.el.style.display = 'none'
      })
  }
}

class Skipper extends gLayer {
  constructor() {
    super({
      position: 'absolute',
      top: 0,
      right: 0,
      width: 50,
      height: 50,
      background: '#0ff',
      opacity: 0
    })

    this.state = 0;

    this.on('click', () => {
      this.state++;

      if (this.state > 0) this.set({
        opacity: .1
      })

      if (this.state > 1) this.set({
        bottom: 0,
        top: 'auto'
      })

      if (this.state > 3) {
        wwd.api('pour', {
          seconds: 2
        })
        this.reset();
      }
    })
  }

  reset() {
    this.state = 0;
    this.set({
      top: 0,
      bottom: 'auto',
      opacity: 0
    })
  }
}

class Attractor extends gLayer {
  constructor() {
    super({
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    })

    this.logo = new gLayer('img', {
      position: 'absolute',
      top: '50%',
      left: '50%',
      y: '-58%',
      x: '-50%'
    })
      .addTo(this)

    this.logo.fromTo(.8, {
      scale: .9
    }, {
      scale: 1,
      ease: Sine.easeInOut,
      yoyo: true,
      repeat: -1
    })

    this.logo.el.src = 'img/wwdlogo.png';

    this.label = new gLayer({
      position: 'absolute',
      bottom: 20,
      width: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 30,
      color: '#fff',
      textShadow: '0 2px 10px rgba(0,0,0,.5)'
    })
      .text('PLACE GLASS, THEN TOUCH TO PLAY')
      .addTo(this)

    this.label.fromTo(1, {
      opacity: .5,
      y: 0
    }, {
      opacity: 1,
      yoyo: true,
      ease: Sine.easeInOut,
      repeat: -1,
      y: -5
    })
  }

  hide() {
    this.to(.2, {
      opacity: 0,
      scale: 1.2,
      display: 'none',
      ease: Quint.easeIn
    })
  }

  show() {
    this.fromTo(.5, {
      scale: 1
    }, {
      opacity: 1,
      display: 'block'
    })
  }
}

class LoseUI extends gLayer {
  constructor() {
    super({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,

      display: 'none',
      opacity: 0
    });

    this.label = new gLayer({
      position: 'absolute',
      top: '50%',
      width: '100%',
      y: '-50%',
      color: "#fff",
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow: '0 2px 10px rgba(0,0,0,.5)',
      fontSize: 50,
    })
      .html('😣 WRONG ANSWER 😣<br>😭 YOU LOSE 😭')
      .addTo(this)
  }

  hide() {
    this.to(.2, {
      opacity: 0,
      display: 'none'
    })
  }

  show() {
    this.fromTo(2, {
      y: 50
    }, {
      y: 0,
      opacity: 1,
      display: 'block',
      ease: Elastic.easeOut
    })
  }
}

class Winimation extends gLayer {
  constructor() {
    super({
      opacity: 0,
      display: 'none'
    });

    this.video = new gLayer({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      z: 0,
      force3D: true,
      background: 'url("img/fireworks.gif")'
    })
      .addTo(this)

    this.video.el.style.backgroundSize = 'cover';
    this.video.el.style.backgroundPosition = 'center';

    this.label = new gLayer({
      position: 'absolute',
      top: '50%',
      left: 0,
      width: '100%',
      y: '-50%',
      fontWeight: 'bold',
      fontSize: 80,
      color: '#fff',
      textAlign: 'center',
      textShadow: '0 2px 10px rgba(0,0,0,.5)'
    })
      .text('🎉YOU WIN🎉')
      .addTo(this)

    this.label2 = new gLayer({
      position: 'absolute',
      bottom: 20,
      width: '100%',
      left: 0,
      fontWeight: 'bold',
      fontSize: 30,
      color: '#fff',
      textAlign: 'center',
      textShadow: '0 2px 10px rgba(0,0,0,.5)'
    })
      .text('⬇️🍹 I hope your glass is ready... 🍹⬇️')
      .addTo(this)

    this.label2.fromTo(.1, {
      rotation: 2
    }, {
      rotation: -2,
      yoyo: true,
      repeat: -1,
      ease: Elastic.easeInOut
    })
  }

  show() {
    this.to(1, {
      opacity: 1,
      display: 'block'
    })
    this.label.fromTo(5, {
      scale: .5
    }, {
      scale: 1,
      ease: Elastic.easeOut
    })
  }

  hide() {
    this.to(.2, {
      opacity: 0,
      display: 'none'
    })
  }
}

class AnswerBox extends gLayer {
  constructor(text, letter = null, question) {
    super({
      position: 'absolute',
      border: '3px solid #f2ff00',
      background: 'linear-gradient(to bottom, #000, #00065b)',
      height: question ? 100 : 50,
      width: question ? "100%" : "50%",
      borderRadius: question ? 50 : 25
    });

    this.label = new gLayer({
      position: 'absolute',
      fontWeight: 'bold',
      textAlign: question ? 'center' : 'left',
      padding: '0 10px 0 0',
      color: '#fff',
      top: '50%',
      left: question ? 0 : 50,
      width: question ? '100%' : 'auto',
      y: '-50%',
    })
      .text(text)
      .addTo(this)

    if (letter) {
      this.letterLabel = new gLayer({
        position: 'absolute',
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#df5c09',
        top: '50%',
        y: '-50%',
        left: 20
      })
        .text(letter)
        .addTo(this)
    }
  }
}

class QuestionUI extends gLayer {
  constructor(question, answers) {
    super({
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 600,
      height: 220,
      y: '-50%',
      x: '-50%',
      margin: '15px 0 0',
    });

    var letters = ['A', 'B', 'C', 'D'];
    var question = new AnswerBox(question, false, true)
      .addTo(this);

    this.answers = [];

    answers = shuffleArray(answers);

    answers.map((a, i) => {
      var box = new AnswerBox(a.label, letters[i])
        .addTo(this)
        .set({
          y: Math.floor(i / 2) * 60 + 110,
          left: i % 2 == 1 ? '50%' : 0
        })

      box.correct = a.correct;

      box.on('click', () => {
        if (box.correct) {
          this.trigger('answer.right')
        }else{
          this.trigger('answer.wrong')
        }
      })

      this.answers.push(box);
    })
  }

  animateIn() {
    this.fromTo(1, {
      y: '-40%',
      opacity: 0
    }, {
      y: '-50%',
      opacity: 1,
      ease: Quint.easeOut
    })

    var els = this.answers.map((a) => a.el);
    TweenMax.staggerFrom(els, 1, {
      opacity: 0,
      delay: .7
    }, .2);

    return this;
  }
}

class LevelUI extends gLayer {
  constructor(levels) {
    super({
      position: 'absolute',
      top: 0,
      left: 0,
      right: -1,
      height: 30,
      y: -30,
      borderBottom: '1px solid #f2ff00'
    });

    this.currentLevel = 0;
    this.indicators = [];
    this.levels = levels;

    for (var i = 0 ; i < levels; i++) {
      var p = new gLayer({
        display: 'inline-block',
        width: 100 / levels + "%",
        height: '100%',
        borderRight: '1px solid #f2ff00',
        background: 'rgba(255,255,255,.2)'
      })
        .addTo(this)

      this.indicators.push(p);
    }

    this.setCurrent(0);
  }

  setCurrent(num) {
    this.currentLevel = num;
    this.indicators.forEach((p, i) => {
      if (num == i) {
        p.set({
          background: '#fff'
        })
      }
      if (num > i) {
        p.set({
          background: "#f2ff00"
        })
      }
      if (num < i) {
        p.set({
          background: "rgba(255,255,255,.2)"
        })
      }
    });
  }

  reset() {
    this.setCurrent(0);
  }

  next() {
    this.currentLevel++;
    this.setCurrent(this.currentLevel);
  }

  hide() {
    this.set({
      display: 'none'
    })
  }

  show() {
    this.fromTo(1, {
      y: -30
    }, {
      y: 0,
      display: 'block',
      ease: Quint.easeOut
    })
  }
}

class SoundManager {
  constructor() {
    this.soundNames = [
      'questionmusic',
      'wronganswer',
      'rightanswer',
      'gamestart',
      'win'
    ]

    this.sounds = {};

    this.soundNames.map((s) => {
      var sound = new Howl({
        src: `sounds/${s}.mp3`
      })
      this.sounds[s] = sound;
    });

    this.sounds.questionmusic.loop(true);
  }

  play(name) {
    this.sounds[name].play();
  }
  stop(name) {
    this.sounds[name].stop();
  }
}

class WWD {
  constructor() {
    this.fullscreen = false;

    this.stage = document.querySelector('.wrapper');
    this.stage.style.background = 'linear-gradient(to bottom right, #090c1a, #08113e)'

    this.winimation = new Winimation()
      .addTo(this.stage)

    this.loseUI = new LoseUI()
      .addTo(this.stage)

    this.questions = null;
    this.playing = false;

    this.load();

    this.levelUI = new LevelUI(5)
      .addTo(this.stage)

    this.attractor = new Attractor()
      .addTo(this.stage);

    this.skipper = new Skipper()
      .addTo(this.stage)

    this.attractor.on('click', () => {
      if (!this.playing) this.play();
    })

    this.settingsButton = new gLayer({
      position: 'absolute',
      top: 0,
      left: 0,
      width: 40,
      height: 40
    })
      .addTo(this.stage)
      .on('click', () => {
        this.settingsLayer.el.style.display = 'block'
      })

    this.settingsLayer = new SettingsLayer()
      .addTo(this.stage)

    console.log("WWD INITIATED!");
  }

  load() {
    this.sound = new SoundManager();
    fetch('questions.hjson').then((data) => {
      return data.text();
    }).then((data) => {
      this.questions = Hjson.parse(data).questions;
    });
  }

  play() {
    this.playing = true;
    this.sound.play('questionmusic')
    this.sound.play('gamestart')
    this.attractor.hide();
    this.levelUI.reset();

    setTimeout(() => {
      this.newQuestion();
      this.levelUI.show();
    }, 500);
  }

  win() {
    this.sound.stop('questionmusic')
    this.sound.play('win')
    this.levelUI.hide()
    this.winimation.show()
    this.api('pour', {
      seconds: this.settingsLayer.secondsInput.el.value
    })

    setTimeout(() => {
      this.winimation.hide();
      this.attractor.show()
      this.playing = false;
    }, 8000);
  }

  lose() {
    wwd.sound.play('wronganswer');
    wwd.sound.stop('questionmusic');
    this.levelUI.hide();
    this.loseUI.show();

    setTimeout(() => {
      this.playing = false;
      this.loseUI.hide();
      this.attractor.show();
    }, 5000);
  }

  newQuestion() {
    var question = this.questions[Math.floor(Math.random() * this.questions.length)];
    if (location.href.indexOf('?debug') > -1) {
      question = this.questions[this.questions.length-1];
    }

    var answers = question.a.map((a, i) => {
      return {label: a, correct: i==0};
    })
    var ui = new QuestionUI(question.q, answers)
      .addTo(this.stage)
      .animateIn()

    ui.on('answer.right', () => {
      if (this.levelUI.currentLevel < this.levelUI.levels-1) {
        wwd.sound.play('rightanswer');
        this.levelUI.next();
        ui.destroy();
        this.newQuestion();
      }else{
        ui.destroy();
        this.win();
        this.levelUI.next();
      }
    })
    ui.on('answer.wrong', () => {
      ui.destroy();
      this.lose();
    })

  }
  api(path, data) {
    fetch('/api/' + path, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}

var wwd = new WWD();
FastClick.attach(document.body);
