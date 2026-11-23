class Sprite {
    constructor({ position, velocity, size, grounded }) {
        this.position = position;
        this.velocity = velocity;
        this.size = size;
        this.grounded = grounded;
        this.state = "idle";
        this.frameTimer = 0;
        this.frameIndex = 0;
    }

    updateState() {
        let nextState;

        if (!this.grounded) {
            nextState = this.velocity.y < 0 ? "jump" : "fall";
        } else if (this.velocity.x > 0) {
            nextState = "runR";
        } else if (this.velocity.x < 0){
            nextState ="runL"
        }
       else {
            nextState = "idle";
        }

        if (nextState !== this.state) {
            this.state = nextState;
            this.frameIndex = 0;
            this.frameTimer = 0;
        }

        const frames = animations[this.state];
        if (frames.length > 1 && ++this.frameTimer >= 8) {
            this.frameIndex = (this.frameIndex + 1) % frames.length;
            this.frameTimer = 0;
        }
    }

    draw() {
        if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
            const frame = animations[this.state][this.frameIndex];
            const drawWidth = this.size.height;
            const drawHeight = this.size.width;

            c.save();
            c.translate(this.position.x, this.position.y + this.size.height);
            c.rotate(-Math.PI / 2);
            c.drawImage(
                spriteSheet,
                0, frame.y, spriteSheet.naturalWidth, frame.height,
                0, 0, drawWidth, drawHeight
            );
            c.restore();
        }
    }

    update() {
        if (keys.a || keys.ArrowLeft) {
            this.velocity.x = -2;
        } else if (keys.d || keys.ArrowRight) {
            this.velocity.x = 2;
        } else {
            this.velocity.x = 0;
        }

        if ((keys.w || keys.ArrowUp || keys[" "]) && this.grounded) {
            this.velocity.y = -5;
            this.grounded = false;
        }

        this.position.x += this.velocity.x;
        this.position.x = Math.max(0, Math.min(this.position.x, canvasWidth - this.size.width));
        this.position.y += this.velocity.y;

        if (this.position.y + this.size.height >= canvasHeight - 1) {
            this.position.y = canvasHeight - this.size.height - 1;
            this.velocity.y = 0;
            this.grounded = true;
        } else {
            this.grounded = false;
            this.velocity.y += gravity;
        }

        this.updateState();
        this.draw();
    }
}

const keys = {};

window.addEventListener("keydown", (event) => {
    if (["a", "d", "w", "ArrowLeft", "ArrowRight", "ArrowUp", " "].includes(event.key)) {
        event.preventDefault();
        keys[event.key] = true;
    }
});

window.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

spriteSheet.addEventListener("error", () => {
    console.error("Could not load the player spritesheet:", spriteSheet.src);
});

const player1 = new Sprite({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    size: { width: 20, height: 60 },
    grounded: false
});

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "grey";
    c.fillRect(0, 0, canvasWidth, canvasHeight);
    player1.update();
}

animate();
