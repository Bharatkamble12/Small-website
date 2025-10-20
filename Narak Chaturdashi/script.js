document.addEventListener('DOMContentLoaded', () => {
   // Preload and set up diya sound
   const diyaSound = new Audio('music/sound.mp3');
   diyaSound.volume = 1;
   diyaSound.preload = 'auto';

   const diyas = document.querySelectorAll('.diya');
   const button = document.getElementById('lightBtn');

   // Fireworks setup
   const canvas = document.getElementById('fireworksCanvas');
   const ctx = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;

   let rockets = [];
   let particles = [];

   class Rocket {
      constructor(x, y, targetY) {
         this.x = x;
         this.y = canvas.height;
         this.targetY = targetY;
         this.speed = Math.random() * 8+8;
         this.color = '#ffffff';
         this.trail = [];
      }

      update() {
         this.y -= this.speed;
         this.trail.push({ x: this.x, y: this.y });
         if (this.trail.length > 10) {
            this.trail.shift();
         }
         if (this.y <= this.targetY) {
            this.explode();
            return true; // Remove rocket
         }
         return false;
      }

      draw() {
         ctx.strokeStyle = this.color;
         ctx.lineWidth = 2;
         ctx.beginPath();
         ctx.moveTo(this.x, this.y);
         for (let point of this.trail) {
            ctx.lineTo(point.x, point.y);
         }
         ctx.stroke();
      }

      explode() {
         const colors = ['#ff0040', '#ff4080', '#ff8000', '#ffff00', '#80ff00', '#00ff80', '#0080ff', '#8000ff'];
         for (let i = 0; i < 50; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(this.x, this.y, color));
         }
      }
   }

   class Particle {
      constructor(x, y, color) {
         this.x = x;
         this.y = y;
         this.color = color;
         this.radius = Math.random() * 4 + 2;
         this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10
         };
         this.alpha = 1;
         this.fade = Math.random() * 0.02 + 0.01;
         this.gravity = 0.1;
      }

      update() {
         this.x += this.velocity.x;
         this.y += this.velocity.y;
         this.velocity.y += this.gravity;
         this.alpha -= this.fade;
      }

      draw() {
         ctx.save();
         ctx.globalAlpha = this.alpha;
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
         ctx.fillStyle = this.color;
         ctx.fill();
         ctx.restore();
      }
   }

   function createRocket() {
      const x = Math.random() * canvas.width;
      const targetY = Math.random() * canvas.height * 0.5 + 50;
      rockets.push(new Rocket(x, canvas.height, targetY));
   }

   function animateFireworks() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rockets.forEach((rocket, index) => {
         rocket.draw();
         if (rocket.update()) {          rockets.splice(index, 1);
         }
      });

      particles.forEach((particle, index) => {
         particle.update();
         particle.draw();
         if (particle.alpha <= 0) {
            particles.splice(index, 1);
         }
      });

      requestAnimationFrame(animateFireworks);
   }

   animateFireworks();

   // Make each diya keyboard-accessible and toggle on click or Enter/Space
   diyas.forEach(diya => {
      diya.setAttribute('tabindex', '0');
      diya.setAttribute('role', 'button');
      diya.setAttribute('aria-pressed', 'false');

      diya.addEventListener('click', () => {
         diya.classList.toggle('lit');
         diya.setAttribute('aria-pressed', String(diya.classList.contains('lit')));
         // Play sound when diya lights up
         if (diya.classList.contains('lit')) {
            diyaSound.currentTime = 0;
            diyaSound.play().catch(e => console.log('Sound play failed:', e));
         }
      });

      diya.addEventListener('keydown', (e) => {
         // Toggle on Enter or Space
         if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            diya.click();
         }
      });
   });

   if (button) {
      button.addEventListener('click', () => {
         diyas.forEach(diya => {
            diya.classList.add('lit');
            diya.setAttribute('aria-pressed', 'true');
         });
         // Play sound when button is clicked
         diyaSound.currentTime = 0;
         diyaSound.play().catch(e => console.log('Sound play failed:', e));
         // Trigger fireworks
         for (let i = 0; i < 12; i++) {
            setTimeout(() => {
               createRocket();
            }, i * 200);
         }
         // Show message after 1.5 seconds
         const message = document.getElementById('message');
         if (message) {
            setTimeout(() => {
               message.classList.add('show');
            }, 1500);
         }
      });
   } else {
      console.warn('Light button (#lightBtn) not found in the document.');
   }
});
