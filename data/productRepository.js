export async function fetchProducts() {
  const cachedProducts = localStorage.getItem("products");
  const cacheTimestamp = localStorage.getItem("productsTimestamp");
  const oneHour = 60 * 60 * 1000;

  if (cachedProducts && cacheTimestamp) {
    const timeElapsed = Date.now() - parseInt(cacheTimestamp, 10);

    if (timeElapsed < oneHour) {
      return JSON.parse(cachedProducts);
    }
  }

  const response = await fetch("/data/products.json");

  if (!response.ok) {
    throw new Error(`Error al cargar productos: ${response.statusText}`);
  }

  const products = await response.json();

  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("productsTimestamp", Date.now().toString());

  return products;
}

export async function getProductById(id) {
  const products = await fetchProducts();
  return products.find((product) => product.id === parseInt(id, 10));
}

function getProductsByCategory(categories, filterProducts) {
  return filterProducts.filter((product) => categories.some((category) => product.categories.includes(category)));
}

function getProductsByStore(stores, filterProducts) {
  return filterProducts.filter((product) => stores.some((store) => product.store === store));
}

export async function getProductsByFilters(categories = null, stores = null, filterProducts = null) {
  let filteredProducts = filterProducts ? filterProducts : await fetchProducts();
  let targetCategory = categories ? categories[0] : null;

  if (stores && stores.length > 0) {
    filteredProducts = getProductsByStore(stores, filteredProducts);
  }

  if (categories && categories.length > 0) {
    filteredProducts = getProductsByCategory(categories, filteredProducts);
  }

  return {
    products: filteredProducts,
    categories: getCategoriesByLevel(filteredProducts, targetCategory),
    historyCategories: getHistoryCategories(filteredProducts, targetCategory),
  };
}

function getCategoriesByLevel(filterProducts, targetCategory = null) {
  const categoryMAP = new Map();

  filterProducts.forEach((product) => {
    if (!targetCategory) {
      const categories = product.categories[0];
      if (categories) {
        categoryMAP.set(categories, (categoryMAP.get(categories) || 0) + 1);
      }
    } else {
      const index = product.categories.indexOf(targetCategory);
      if (index !== -1 && index + 1 < product.categories.length) {
        const categories = product.categories[index + 1];
        if (categories) {
          categoryMAP.set(categories, (categoryMAP.get(categories) || 0) + 1);
        }
      }
    }
  });

  return Array.from(categoryMAP, ([category, count]) => ({ category, count }));
}

function getHistoryCategories(filterProducts, targetCategory = null) {
  const historyMAP = new Map();

  if (!targetCategory || !filterProducts.length || !filterProducts[0].categories.includes(targetCategory)) {
    return [];
  }

  const indexCategory = filterProducts[0].categories.indexOf(targetCategory);

  filterProducts[0].categories.forEach((category, index) => {
    if (index <= indexCategory) {
      historyMAP.set(category, true);
    }
  });

  return Array.from(historyMAP.keys());
}
