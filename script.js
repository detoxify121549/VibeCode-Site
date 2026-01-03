/* =========================
   Canvas Intro + Particles
========================= */
const canvas = document.getElementById('introCanvas');
let ctx, w, h, particles = [];

if(canvas){
    ctx = canvas.getContext('2d');
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        particles = []; // recreate particles on resize
        initParticles();
    });

    class Particle {
        constructor(){
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.r = Math.random()*3 + 1;
            this.dx = (Math.random()-0.5)*1.5;
            this.dy = (Math.random()-0.5)*1.5;
            this.color = `hsl(${Math.random()*360}, 80%, 60%)`;
        }
        draw(){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update(){
            this.x += this.dx;
            this.y += this.dy;
            if(this.x < 0 || this.x > w) this.dx*=-1;
            if(this.y < 0 || this.y > h) this.dy*=-1;
            this.draw();
        }
    }

    function initParticles(){
        for(let i=0;i<120;i++) particles.push(new Particle());
    }

    function animateParticles(){
        ctx.clearRect(0,0,w,h);
        particles.forEach(p=>p.update());
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Cursor interaction
    canvas.addEventListener('mousemove',(e)=>{
        particles.forEach(p=>{
            let dx = p.x - e.clientX;
            let dy = p.y - e.clientY;
            let dist = Math.sqrt(dx*dx+dy*dy);
            if(dist<100){
                p.dx += dx*0.0005;
                p.dy += dy*0.0005;
            }
        });
    });
}

/* =========================
   Scroll Reveal Sections
========================= */
const faders = document.querySelectorAll('.fade-in-section');
if(faders.length > 0){
    const appearOptions = { threshold: 0.2 };
    const appearOnScroll = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));
}

/* =========================
   Button & Menu Ripple Effect
========================= */
function rippleEffect(e){
    const circle = document.createElement('span');
    circle.classList.add('ripple');
    this.appendChild(circle);
    const d = Math.max(this.clientWidth, this.clientHeight);
    circle.style.width = circle.style.height = d + 'px';
    const rect = this.getBoundingClientRect();
    circle.style.left = e.clientX - rect.left - d/2 + 'px';
    circle.style.top = e.clientY - rect.top - d/2 + 'px';
    circle.style.background = 'rgba(0,255,255,0.3)';
    circle.addEventListener('animationend', ()=> circle.remove());
}

document.querySelectorAll('.btn, nav a').forEach(el=>{
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', rippleEffect);
});

/* =========================
   Optional Floating Menu Effect
========================= */
const navMenu = document.querySelector('nav');
if(navMenu){
    let offset = 0;
    window.addEventListener('scroll', ()=>{
        offset = window.scrollY;
        navMenu.style.transform = `translateY(${Math.min(offset*0.5,20)}px)`;
        navMenu.style.transition = 'transform 0.2s ease-out';
    });
}
