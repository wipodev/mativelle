import { Router } from "/lib/wipoSPA.js";
import { routes } from "/routes/routes.js";
import { loadTheme, handleMenu } from "/utils/utils.js";

const router = Router({ routes });

window.addEventListener("load", () => {
  router.interceptLinks();
  router.handleRoute();
  window.addEventListener("popstate", router.handleRoute);
  loadTheme();
  handleMenu();
});
