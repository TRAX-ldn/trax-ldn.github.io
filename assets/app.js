(() => {
  const products = window.TRAX_PRODUCTS || [];

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll(".bag-button").forEach(button => {
    button.addEventListener("click", () => {
      alert("Bag and checkout will connect to Shopify after Louie's store is set up.");
    });
  });

  const grid = document.getElementById("product-grid");
  if (grid) {
    const render = filter => {
      const visible = products.filter(product =>
        filter === "all" ||
        (filter === "coming-soon" ? product.status === "coming-soon" : product.category === filter)
      );

      grid.innerHTML = visible.map((product, index) => `
        <a class="product-card" href="product.html?id=${encodeURIComponent(product.id)}" style="--delay:${index * 30}ms">
          <div class="product-image">
            <img src="assets/logo-black.svg" alt="" loading="lazy">
            <span class="product-stamp">${product.tag}</span>
          </div>
          <div class="product-card-meta">
            <h2>${product.name}</h2>
            <span>${product.status === "coming-soon" ? "COMING SOON" : "VIEW"}</span>
          </div>
        </a>
      `).join("");
    };

    document.querySelectorAll(".filter").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        render(button.dataset.filter);
      });
    });

    render("all");
  }

  const detail = document.getElementById("product-detail");
  if (detail) {
    const id = new URLSearchParams(location.search).get("id");
    const product = products.find(item => item.id === id) || products[0];
    if (!product) return;

    document.title = `${product.name} — TRAX-LDN`;

    detail.innerHTML = `
      <div class="detail-image">
        <img src="assets/logo-black.svg" alt="TRAX placeholder product artwork">
        <span class="detail-index">TRAX-LDN / ${product.category.toUpperCase()}</span>
      </div>
      <div class="detail-info">
        <a class="back-link" href="products.html">← BACK TO PRODUCTS</a>
        <p class="eyebrow dark">${product.tag}</p>
        <h1>${product.name}</h1>
        <p class="detail-price">£${product.price}.00</p>
        <p class="detail-copy">Prototype product page. Final photography, description, materials, sizing and stock will come from the real TRAX catalogue / Shopify data.</p>
        <div class="size-block">
          <span>SIZE</span>
          <div class="size-options">
            ${product.sizes.map((size, i) => `<button class="size-option ${i===0 ? "selected" : ""}" type="button">${size}</button>`).join("")}
          </div>
        </div>
        <button class="buy-button" type="button" ${product.status === "coming-soon" ? "disabled" : ""}>
          ${product.status === "coming-soon" ? "COMING SOON" : "ADD TO BAG — TEST ONLY"}
        </button>
        <p class="checkout-note">Checkout is intentionally disabled until Shopify is connected.</p>
      </div>
    `;

    detail.querySelectorAll(".size-option").forEach(button => {
      button.addEventListener("click", () => {
        detail.querySelectorAll(".size-option").forEach(item => item.classList.remove("selected"));
        button.classList.add("selected");
      });
    });

    const buyButton = detail.querySelector(".buy-button:not([disabled])");
    if (buyButton) {
      buyButton.addEventListener("click", () => {
        alert("Product flow works. Shopify checkout is the next integration step.");
      });
    }
  }
})();