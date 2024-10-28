export function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const entries = Object.fromEntries(params.entries());
  return entries;
}

export const paginate = (items, currentPage, itemsPerPage = 12) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return {
    items: items.slice(startIndex, startIndex + itemsPerPage),
    totalPages: Math.ceil(items.length / itemsPerPage),
  };
};

function toggleTheme() {
  const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

export function loadTheme() {
  const theme = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", theme ? theme : "light");
  document.querySelector("body > header nav > a[data-theme-toggle]").addEventListener("click", toggleTheme);
}

export function handleMenu() {
  document.querySelector("body > header nav > button").addEventListener("click", () => {
    document.querySelector("body > header nav > div").classList.toggle("open");
  });

  document.querySelector("body > header nav > div").addEventListener("click", () => {
    document.querySelector("body > header nav > div").classList.remove("open");
  });
}
