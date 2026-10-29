/* refresh pe hamesha top se shuru ho */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
if (window.location.hash) {
  history.replaceState(null, "", window.location.pathname);
}
window.scrollTo(0, 0);
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
  gsap.from("#resume_wrap .bounding_elem", {
    yPercent: 120,
    duration: 1.2,
    ease: "expo.inOut",
    delay: 1
  });

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
/* ---------- scroll reveal (sab devices) ---------- */
const revealEls = document.querySelectorAll(
  "#kaam, .elem, #skills_label, .skill_row, #image_about img, #text_about, .footer h1, #heroFooter"
);
revealEls.forEach(function(el){ el.classList.add("reveal"); });

const revealObs = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(function(el){ revealObs.observe(el); });

/* ---------- sirf touch devices ---------- */
if (isTouch) {

  // 1. jo row screen ke beech mein ho wo active
  const activeObs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  }, { rootMargin: "-40% 0px -40% 0px" });
  document.querySelectorAll(".elem, .skill_row").forEach(function(el){
    activeObs.observe(el);
  });

  // 2. project tap pe image khule/band ho
  document.querySelectorAll(".elem").forEach(function(elem){
    elem.addEventListener("click", function(){
      elem.classList.toggle("open");
      setTimeout(function(){ scroll.update(); }, 600);
    });
  });

  // 3. tap glow
  window.addEventListener("touchstart", function(e){
    const t = e.touches[0];
    const glow = document.createElement("div");
    glow.className = "tap-glow";
    glow.style.left = t.clientX + "px";
    glow.style.top = t.clientY + "px";
    document.body.appendChild(glow);
    setTimeout(function(){ glow.remove(); }, 700);
  }, { passive: true });
}
/* ---------- nav click -> section tak scroll ---------- */
document.querySelectorAll("[data-target]").forEach(function(link){
  link.addEventListener("click", function(e){
    e.preventDefault();
    const target = document.querySelector(link.dataset.target);
    if (!target) return;

    // Locomotive ka smooth scroll, na chale to normal scroll
    try {
      scroll.scrollTo(target, 0, 1200);
    } catch (err) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
/* refresh pe hamesha top se shuru ho */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
if (window.location.hash) {
  history.replaceState(null, "", window.location.pathname);
}
window.scrollTo(0, 0);
/* ---------- avatar ---------- */
const avatar = document.querySelector("#avatar");

if (avatar) {
  // neeche se aata hua entry
  gsap.from(avatar, {
    yPercent: 15,
    opacity: 0,
    duration: 1.6,
    ease: "expo.out",
    delay: 1.4
  });

  // halka floating (upar-neeche)
  gsap.to(avatar, {
    y: -12,
    duration: 2.6,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 3
  });

  // cursor ke saath halka hilna (sirf mouse wale devices)
  if (!isTouch) {
    const moveX = gsap.quickTo(avatar, "x", { duration: 1, ease: "power3.out" });
    window.addEventListener("mousemove", function(e){
      moveX((e.clientX / window.innerWidth - 0.5) * 30);
    });
  }
}