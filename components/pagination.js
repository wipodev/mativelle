export function renderPagination(currentPage, totalPages) {
  const paginationContainer = document.querySelector("[data-pagination] > ul");

  let paginationHTML = "";

  const urlParams = new URLSearchParams(window.location.search);

  const generateUrl = (page) => {
    urlParams.set("page", page);
    return `/?${urlParams.toString()}`;
  };

  if (currentPage > 1) {
    paginationHTML += `<li class="page-back"><a href="${generateUrl(currentPage - 1)}">< Anterior</a></li>`;
  } else {
    paginationHTML += `<li class="page-back"><a href="" aria-disabled="true">< Anterior</a></li>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationHTML += `<li><a class="active" href="">${i}</a></li>`;
    } else {
      paginationHTML += `<li><a href="${generateUrl(i)}">${i}</a></li>`;
    }
  }

  if (currentPage < totalPages) {
    paginationHTML += `<li class="page-next"><a href="${generateUrl(currentPage + 1)}">Siguiente ></a></li>`;
  } else {
    paginationHTML += `<li class="page-next"><a href="" aria-disabled="true">Siguiente ></a></li>`;
  }

  paginationContainer.innerHTML = paginationHTML;
}
