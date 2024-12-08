window.onload = () => {
    const canvas = document.getElementById("canvas0");
    const ctx = canvas.getContext("2d");
    const output = document.getElementById("output");
    let orientation = { gamma: 0, beta: 0 };
    let ball = [];

    class BallOrg {
        constructor(x, y, r) {
            this.x = x;
            this.y = y;
            this.r = r;
        }
    }

    class Ball extends BallOrg {
        constructor(x, y, r, color) {
            super(x, y, r);
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.fill();
            return this;
        }
        move(orientation) {
            this.x = Math.floor(this.x + orientation.gamma / 10);
            this.y = Math.floor(this.y + orientation.beta / 10);
            return this;
        }
        getPosition() {
            return { x: this.x, y: this.y };
        }
        setPosition(_position) {
            this.x = _position.x;
            this.y = _position.y;
            return this;
        }
    }

    ball[0] = new Ball(50, 50, 5, 'red');
    ball[1] = new Ball(100, 100, 10, 'green');
    ball[2] = new Ball(150, 150, 20, 'blue');

    function drawBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < ball.length; i++) {
            ball[i].move(orientation);
            let position = ball[i].getPosition();
            if (position.x < 0) position.x = 0;
            if (position.x > canvas.width) position.x = canvas.width;
            if (position.y < 0) position.y = 0;
            if (position.y > canvas.height) position.y = canvas.height;
            ball[i].setPosition(position).draw();
        }
    }

    setInterval(drawBall, 50);

     // iOS13 以後のスマートフォンやタブレットの傾きによる検出イベント
 button.onclick = () => {
    DeviceOrientationEvent.requestPermission()
    .then(response => {
    if (response === 'granted') {
    window.addEventListener('deviceorientation', function(event) {
    orientation.gamma = event.gamma;
    orientation.beta = event.beta;
    output.innerHTML = "beta : " + event.gamma + "¥n";
    output.innerHTML += "gamma: " + event.beta + "¥n";
    }, true);
    }
    })
    .catch( error => {
   8
    conslole.log(error);
    });
    }
    // Android スマートフォンやタブレットの傾きによる検出イベント
    window.addEventListener('deviceorientation', function(event) {
    orientation.gamma = event.gamma;
    orientation.beta = event.beta;
    output.innerHTML = "beta : " + event.gamma + "¥n";
    output.innerHTML += "gamma: " + event.beta + "¥n";
    }, false);
    // コンピュータの左右矢印キー押下による検出イベント
    window.addEventListener('keydown', function(event) {
    if(event.key == "ArrowRight") {
    orientation.gamma = orientation.gamma + 20;
    }
    if(event.key == "ArrowLeft") {
    orientation.gamma = orientation.gamma - 20;
    }
    if(event.key == "ArrowUp") {
    orientation.beta = orientation.beta - 20;
    }
    if(event.key == "ArrowDown") {
    orientation.beta = orientation.beta + 20;
    }
    output.innerHTML = "beta : " + orientation.gamma + "¥n";
    output.innerHTML += "gamma: " + orientation.beta + "¥n";
    });
   }
   
