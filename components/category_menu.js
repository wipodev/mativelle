export function renderCategories(categories) {
  const categoriesContainer = document.querySelectorAll(".categories-list");

  const categoriesHTML = categories
    .map(
      (category) => `
    <li><a href="/?category=${category.category}">${category.category} (${category.count})</a></li>
  `
    )
    .join("");

  categoriesContainer.forEach((container) => {
    container.innerHTML = categoriesHTML + container.innerHTML;
  });
}
