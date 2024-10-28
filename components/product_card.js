export function renderProducts(products) {
  const productsContainer = document.querySelector(".products");
  const productsHTML = products
    .map(
      (product) => `
    <article>
      <header>
        <img src="${product.thumbnail}" alt="${product.name}" loading="lazy" />
      </header>
      <h4 class="card-title">${product.name}</h4>
      <section class="card-actions">
        <a href="/product?id=${product.id}" role="button" class="outline">Ver detalles</a>
        <a href="${product.affiliateLink}" role="button" >
          <i class="fab fa-amazon"></i>
          Comprar ahora
        </a>
      </section>
    </article>
  `
    )
    .join("");
  productsContainer.innerHTML = productsHTML;
}
