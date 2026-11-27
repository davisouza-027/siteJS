const salon = window.SALON;
const themeToggle = document.querySelector("[data-theme-toggle]");

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("salon-theme");
} catch {}

if (savedTheme === "dark") {
  document.body.dataset.theme = "dark";
}

if (themeToggle) {
  const renderThemeButton = () => {
    const dark = document.body.dataset.theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.setAttribute("aria-label", dark ? "Ativar tema claro" : "Ativar tema escuro");
    themeToggle.innerHTML = dark
      ? '<svg class="theme-icon sun-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>'
      : '<svg class="theme-icon moon-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.7 8.7 0 1 0 20.2 15.1Z"/></svg>';
  };

  renderThemeButton();

  themeToggle.addEventListener("click", () => {
    const dark = document.body.dataset.theme !== "dark";
    document.body.dataset.theme = dark ? "dark" : "light";

    if (!dark) delete document.body.dataset.theme;

    try {
      localStorage.setItem("salon-theme", dark ? "dark" : "light");
    } catch {}

    renderThemeButton();
  });
}

const moneyDigits = salon.whatsapp.replace(/\D/g, "");

document.querySelectorAll("[data-whatsapp]").forEach(link => {
  link.href = `https://wa.me/${moneyDigits}?text=${encodeURIComponent("Olá, gostaria de saber mais sobre os serviços do Studio Janete Souza.")}`;
});

document.querySelectorAll("[data-phone]").forEach(el => {
  el.textContent = salon.phoneDisplay;
});

document.querySelectorAll("[data-phone-link]").forEach(link => {
  link.href = `https://wa.me/${moneyDigits}`;
});

document.querySelectorAll("[data-instagram]").forEach(el => {
  el.textContent = `@${salon.instagramHandle}`;
});

document.querySelectorAll("[data-instagram-link]").forEach(link => {
  link.href = salon.instagramUrl;
});

document.querySelectorAll("[data-address-link]").forEach(link => {
  link.href = salon.addressUrl;
});

document.querySelectorAll("[data-waze-link]").forEach(link => {
  link.href = salon.wazeUrl;
});

document.querySelectorAll("[data-review-link]").forEach(link => {
  link.href = salon.reviewUrl;
});

const mapFrame = document.querySelector("[data-map-frame]");
if (mapFrame) mapFrame.src = salon.mapsEmbedUrl;

const gallery = document.querySelector("#gallery");
const galleryMoreButton = document.querySelector("#gallery-more");
const initialGalleryCount = 12;

salon.gallery.forEach((item, index) => {
  const card = document.createElement("article");
  card.className = `gallery-card gallery-card-${index + 1} reveal`;
  if (index >= initialGalleryCount) card.classList.add("is-hidden");
  card.innerHTML = `<img class="gallery-photo" src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async">`;
  gallery.append(card);
});

if (galleryMoreButton && salon.gallery.length > initialGalleryCount) {
  galleryMoreButton.hidden = false;
  galleryMoreButton.classList.add("reveal");
  observeReveals([galleryMoreButton]);

  galleryMoreButton.addEventListener("click", () => {
    const expanded = galleryMoreButton.getAttribute("aria-expanded") !== "true";
    const buttonTop = galleryMoreButton.getBoundingClientRect().top;
    galleryMoreButton.setAttribute("aria-expanded", String(expanded));
    const additionalCards = [...gallery.children].slice(initialGalleryCount);
    additionalCards.forEach(card => card.classList.toggle("is-hidden", !expanded));
    galleryMoreButton.innerHTML = expanded
      ? 'Ver menos <span aria-hidden="true">↑</span>'
      : 'Ver mais <span aria-hidden="true">↓</span>';
    if (expanded) observeReveals(additionalCards);
    else requestAnimationFrame(() => {
      const shift = galleryMoreButton.getBoundingClientRect().top - buttonTop;
      window.scrollTo({ top: window.scrollY + shift, behavior: "auto" });
    });
  });
}

const packageTrack = document.querySelector("#package-track");
const packageDots = document.querySelector("#package-dots");
const packageWindow = document.querySelector(".package-window");
const packageCount = document.querySelector("#package-count");
const packagePlay = document.querySelector("#package-play");
const packageCarousel = document.querySelector("#package-carousel");
let activePackage = 0;
let packageTimer;

if (packageTrack && salon.packages?.length) {
  const packageSlides = salon.packages.map((item, index) => {
    const slide = document.createElement("article");
    slide.className = "package-slide";
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} de ${salon.packages.length}`);
    slide.innerHTML = `<img src="${item.image}" alt="${item.alt}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
    packageTrack.append(slide);

    const dot = document.createElement("button");
    dot.className = "package-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver pacote ${index + 1}`);
    dot.addEventListener("click", () => { showPackage(index); restartPackageTimer(); });
    packageDots.append(dot);
    return slide;
  });

  function showPackage(index) {
    activePackage = (index + packageSlides.length) % packageSlides.length;
    packageTrack.style.transform = `translateX(-${activePackage * 100}%)`;
    packageSlides.forEach((slide, i) => slide.setAttribute("aria-hidden", String(i !== activePackage)));
    [...packageDots.children].forEach((dot, i) => {
      dot.classList.toggle("is-active", i === activePackage);
      dot.setAttribute("aria-current", i === activePackage ? "true" : "false");
    });
    packageCount.textContent = `${String(activePackage + 1).padStart(2, "0")} / ${String(packageSlides.length).padStart(2, "0")}`;
  }

  function restartPackageTimer() {
    window.clearInterval(packageTimer);
    if (packagePlay.dataset.paused !== "true" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      packageTimer = window.setInterval(() => showPackage(activePackage + 1), 7000);
    }
  }

  document.querySelector(".package-previous").addEventListener("click", () => { showPackage(activePackage - 1); restartPackageTimer(); });
  document.querySelector(".package-next").addEventListener("click", () => { showPackage(activePackage + 1); restartPackageTimer(); });
  packagePlay.addEventListener("click", () => {
    const paused = packagePlay.dataset.paused !== "true";
    packagePlay.dataset.paused = String(paused);
    packagePlay.textContent = paused ? "Reproduzir" : "Pausar";
    packagePlay.setAttribute("aria-label", paused ? "Reproduzir apresentação automática" : "Pausar apresentação automática");
    restartPackageTimer();
  });

  let pointerStart = null;
  packageWindow.addEventListener("pointerdown", event => { pointerStart = event.clientX; }, { passive: true });
  packageWindow.addEventListener("pointerup", event => {
    if (pointerStart === null) return;
    const difference = event.clientX - pointerStart;
    pointerStart = null;
    if (Math.abs(difference) < 45) return;
    showPackage(activePackage + (difference < 0 ? 1 : -1));
    restartPackageTimer();
  }, { passive: true });
  packageWindow.addEventListener("pointercancel", () => { pointerStart = null; });
  packageCarousel.addEventListener("mouseenter", () => window.clearInterval(packageTimer));
  packageCarousel.addEventListener("mouseleave", restartPackageTimer);
  packageCarousel.addEventListener("focusin", () => window.clearInterval(packageTimer));
  packageCarousel.addEventListener("focusout", event => {
    if (!packageCarousel.contains(event.relatedTarget)) restartPackageTimer();
  });
  showPackage(0);
  restartPackageTimer();
}

const tabs = document.querySelector("#category-tabs");
const list = document.querySelector("#service-list");

function showCategory(index) {
  [...tabs.children].forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    tab.setAttribute("aria-selected", i === index);
  });

  const category = salon.categories[index];

  list.innerHTML =
    `<div class="list-intro reveal"><span>${category.note}</span><span>${String(category.services.length).padStart(2,"0")} serviços</span></div>` +
    category.services.map(([name, price], i) =>
      `<div class="service-row reveal" style="--reveal-delay:${Math.min(i * 45, 360)}ms"><span class="service-number">${String(i + 1).padStart(2,"0")}</span><strong>${name}</strong><span class="service-dots"></span><span class="service-price">${price}</span></div>`
    ).join("");

  observeReveals(list.querySelectorAll(".reveal"));
}

salon.categories.forEach((category, index) => {
  const button = document.createElement("button");
  button.className = "category-tab";
  button.setAttribute("role", "tab");
  button.setAttribute("aria-selected", "false");
  button.innerHTML = `<span>0${index + 1}</span>${category.name}<b>↗</b>`;
  button.addEventListener("click", () => showCategory(index));
  tabs.append(button);
});

showCategory(0);

const revealTargets = document.querySelectorAll(
  ".hero-copy, .hero-art, .intro .section-kicker, .intro h2, .intro > p, .section-heading, .services-heading, .category-tabs, .price-note, .visit-copy, .visit-card, footer"
);

revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${(index % 3) * 80}ms`);
});

function observeReveals(elements) {
  const targets = [...elements].filter(element =>
    !element.classList.contains("reveal-ready") && !element.classList.contains("is-hidden")
  );

  if (!targets.length) return;

  targets.forEach(element => element.classList.add("reveal-ready"));

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    targets.forEach(element => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

  targets.forEach(element => observer.observe(element));
}

observeReveals(document.querySelectorAll(".reveal"));
