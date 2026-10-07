// 스크롤 시 요소가 부드럽게 나타나는 효과
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  revealObserver.observe(el);
});

// 숫자 카운트업 애니메이션
function countUp(el) {
  const target = Number(el.dataset.count);
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

// 문의 폼 전송 처리 (실제 전송 없이 알림만 표시)
const form = document.getElementById("contact-form");
const toast = document.getElementById("toast");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.reset();
  toast.hidden = false;
  setTimeout(() => (toast.hidden = true), 2500);
});
