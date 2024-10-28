export function renderHistoryCategories(categories) {
  const historyCategoriesContainer = document.querySelector(".products-container nav ul");

  if (!categories.length) {
    historyCategoriesContainer.innerHTML = "<li></li>";
  } else {
    const historyCategoriesHTML =
      '<li><a href="/">Inicio</a></li>' +
      categories
        .map(
          (category) => `
    <li><a href="/?category=${category}">${category}</a></li>
  `
        )
        .join(" ");
    historyCategoriesContainer.innerHTML = historyCategoriesHTML;
  }
}
