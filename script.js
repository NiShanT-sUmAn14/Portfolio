const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

const isTouch = window.matchMedia("(hover: none)").matches;

/* ---------- cursor circle (sirf mouse wale devices pe) ---------- */
function circleMouseFollow(){
  if (isTouch) return;
  window.addEventListener("mousemove", function(dets){
    gsap.to("#minicircle", {
      x: dets.clientX,
      y: dets.clientY,
      duration: .4,
      ease: "power2.out"
    });
  });
}
circleMouseFollow();

/* ---------- opening animation ---------- */
function firstPageAnim(){
  gsap.from("#nav .bounding_elem", {
    yPercent: 100,
    duration: 1.2,
    ease: "expo.inOut",
    stagger: 0.15,
    delay: 0.2
  });

  gsap.from("#heading .bounding_elem", {
    yPercent: 100,
    duration: 1.5,
    ease: "expo.inOut",
    stagger: 0.2,
    delay: 0.6
  });

  gsap.from("#chotiHeading .bounding_elem", {
    yPercent: 100,
    duration: 1.2,
    ease: "expo.inOut",
    stagger: 0.15,
    delay: 1.2
  });
}
firstPageAnim();

/* ---------- project hover images (sirf mouse wale devices pe) ---------- */
if (!isTouch) {
  document.querySelectorAll(".elem").forEach(function(elem){
    const img = elem.querySelector("img");
    if (!img) return;

    let prevX = 0;
    let resetTimer;

    elem.addEventListener("mouseenter", function(e){
      prevX = e.clientX;
      gsap.to(img, { opacity: 1, duration: 0.3, overwrite: "auto" });
    });

    elem.addEventListener("mousemove", function(e){
      const rect = elem.getBoundingClientRect();

      // speed + direction
      const diff = e.clientX - prevX;
      prevX = e.clientX;
      const rotation = gsap.utils.clamp(-25, 25, diff * 0.8);

      gsap.to(img, {
        x: e.clientX - rect.left - img.offsetWidth / 2,
        y: e.clientY - rect.top - img.offsetHeight / 2,
        rotate: rotation,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto"
      });

      // mouse ruk jaye toh image seedhi ho jaye
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function(){
        gsap.to(img, { rotate: 0, duration: 0.6, ease: "power3.out" });
      }, 80);
    });

    elem.addEventListener("mouseleave", function(){
      gsap.to(img, { opacity: 0, rotate: 0, duration: 0.3, overwrite: "auto" });
    });
  });
}