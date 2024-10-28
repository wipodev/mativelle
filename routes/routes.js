export const routes = {
  "/": {
    component: "/views/home.html",
  },
  "/product": {
    component: "/views/product.html",
  },
  "/terms": {
    component: "/views/terms.html",
  },
  "/contact": {
    component: "/views/contact.html",
    /* initFunction: async () => await import("/views/js/contact.js"), */
  },
};
