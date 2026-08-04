import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Rose Petal Class
    class Petal {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -20;
        this.size = Math.random() * 12 + 10;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.sin(Math.random() * Math.PI) * 1.2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.color = Math.random() > 0.4 ? '#e6194b' : '#b80f3d';
      }
      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) + this.speedX * 0.5;
        this.rotation += this.rotationSpeed;
        if (this.y > height + 20) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        // Draw Petal Shape
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size, -this.size / 2, this.size * 1.2, this.size / 2, 0, this.size);
        ctx.bezierCurveTo(-this.size * 1.2, this.size / 2, -this.size, -this.size / 2, 0, 0);
        ctx.fill();

        ctx.restore();
      }
    }

    // Floating Heart Class
    class Heart {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 30;
        this.size = Math.random() * 14 + 10;
        this.speedY = Math.random() * 1.0 + 0.6;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.pulse = Math.random() * Math.PI;
      }
      update() {
        this.y -= this.speedY;
        this.pulse += 0.05;
        if (this.y < -30) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        const currentSize = this.size + Math.sin(this.pulse) * 2;
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ff2e63';

        // Draw Heart path
        ctx.beginPath();
        const topCurveHeight = currentSize * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(
          0, 0,
          -currentSize / 2, 0,
          -currentSize / 2, topCurveHeight
        );
        ctx.bezierCurveTo(
          -currentSize / 2, (currentSize + topCurveHeight) / 2,
          0, currentSize,
          0, currentSize
        );
        ctx.bezierCurveTo(
          0, currentSize,
          currentSize / 2, (currentSize + topCurveHeight) / 2,
          currentSize / 2, topCurveHeight
        );
        ctx.bezierCurveTo(
          currentSize / 2, 0,
          0, 0,
          0, topCurveHeight
        );
        ctx.fill();

        ctx.restore();
      }
    }

    // Sparkle Particle Class
    class Sparkle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 1;
        this.maxOpacity = Math.random() * 0.8 + 0.2;
        this.opacity = 0;
        this.fadeSpeed = Math.random() * 0.02 + 0.008;
        this.growing = true;
        this.color = Math.random() > 0.5 ? '#ffd700' : '#ffffff';
      }
      update() {
        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= this.maxOpacity) {
            this.growing = false;
          }
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0) {
            this.reset();
          }
        }
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create pools
    const petalCount = window.innerWidth < 768 ? 20 : 35;
    const heartCount = window.innerWidth < 768 ? 12 : 20;
    const sparkleCount = window.innerWidth < 768 ? 30 : 50;

    const petals = Array.from({ length: petalCount }, () => new Petal());
    const hearts = Array.from({ length: heartCount }, () => new Heart());
    const sparkles = Array.from({ length: sparkleCount }, () => new Sparkle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft Ambient Radial Gradient Lights
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 50, width * 0.2, height * 0.3, width * 0.5);
      grad1.addColorStop(0, 'rgba(138, 13, 47, 0.18)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 50, width * 0.8, height * 0.7, width * 0.5);
      grad2.addColorStop(0, 'rgba(255, 46, 99, 0.12)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render elements
      sparkles.forEach((s) => {
        s.update();
        s.draw();
      });

      hearts.forEach((h) => {
        h.update();
        h.draw();
      });

      petals.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};

export default AnimatedBackground;
