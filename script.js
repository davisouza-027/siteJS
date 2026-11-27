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

const packageGrid = document.querySelector("#package-grid");

function createPackagePhoto(photo, compact = false) {
  const figure = document.createElement("figure");
  figure.className = `package-photo${compact ? " package-photo-compact" : ""}${photo.fit === "contain" ? " package-photo-contain" : ""}`;
  const image = document.createElement("img");
  image.src = photo.src || photo.image;
  image.alt = photo.alt || photo.imageAlt || "";
  image.loading = "lazy";
  image.decoding = "async";
  const placeholder = document.createElement("span");
  placeholder.className = "package-photo-placeholder";
  placeholder.textContent = photo.placeholder ? "Foto de laserterapia" : "Imagem do pacote";
  placeholder.hidden = true;
  image.addEventListener("error", () => {
    image.hidden = true;
    placeholder.hidden = false;
  }, { once: true });
  figure.append(image, placeholder);
  return figure;
}

function renderPackage(item, index) {
  const card = document.createElement("article");
  card.className = `package-card reveal${index === 0 ? " package-card-featured" : ""}`;
  card.style.setProperty("--package-delay", `${Math.min(index * 55, 385)}ms`);

  const media = document.createElement("div");
  media.className = item.images ? `package-photos package-photos-strip package-photos-${item.images.length}` : "package-photos";
  (item.images || [item]).forEach(photo => media.append(createPackagePhoto(photo, Boolean(item.images))));

  const content = document.createElement("div");
  content.className = "package-card-content";
  const eyebrow = document.createElement("span");
  eyebrow.className = "package-eyebrow";
  eyebrow.textContent = item.eyebrow;
  const title = document.createElement("h3");
  title.textContent = item.title;
  const description = document.createElement("p");
  description.className = "package-description";
  description.textContent = item.description;
  const list = document.createElement("ul");
  list.className = "package-includes";
  item.includes.forEach(text => {
    const entry = document.createElement("li");
    entry.textContent = text;
    list.append(entry);
  });
  content.append(eyebrow, title, description, list);

  const priceBlock = document.createElement("div");
  priceBlock.className = "package-pricing";
  if (item.options) {
    item.options.forEach(option => {
      const row = document.createElement("div");
      row.className = "package-option";
      const name = document.createElement("strong");
      name.textContent = option.name;
      const pix = document.createElement("span");
      pix.className = "package-option-pix";
      pix.textContent = `${option.pricePix} no Pix`;
      const cardPrice = document.createElement("small");
      cardPrice.className = "package-option-card";
      cardPrice.textContent = `${option.priceCard} no cartão`;
      row.append(name, pix, cardPrice);
      priceBlock.append(row);
    });
  } else {
    const price = document.createElement("strong");
    price.className = "package-price package-price-pix";
    price.textContent = item.pricePix;
    priceBlock.append(price);
    const pixLabel = document.createElement("span");
    pixLabel.className = "package-pix-label";
    pixLabel.textContent = "no Pix";
    priceBlock.append(pixLabel);
    const cardPrice = document.createElement("span");
    cardPrice.className = "package-price-card";
    cardPrice.textContent = item.priceCard === "Consulte condições" ? "No cartão: consulte condições" : `${item.priceCard} no cartão`;
    priceBlock.append(cardPrice);
  }

  if (item.detail) {
    const detail = document.createElement("p");
    detail.className = "package-detail";
    detail.textContent = item.detail;
    priceBlock.append(detail);
  }

  const action = document.createElement("a");
  action.className = "package-cta";
  action.href = `https://wa.me/${moneyDigits}?text=${encodeURIComponent(`Olá, gostaria de saber mais sobre o pacote ${item.title} do Studio Janete Souza.`)}`;
  action.target = "_blank";
  action.rel = "noopener noreferrer";
  action.textContent = "Consultar e agendar ↗";
  card.append(media, content, priceBlock, action);
  return card;
}

if (packageGrid && salon.packages?.length) {
  salon.packages.forEach((item, index) => packageGrid.append(renderPackage(item, index)));
  observeReveals(packageGrid.querySelectorAll(".reveal"));
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
