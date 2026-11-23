/* Documentação: comportamento e integrações específicas desta página. */
/* Interações pequenas, sem dependências além do Bootstrap já usado no menu/FAQ. */
// Inicialização/interação global da página.
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("anoAtual");
  if (year) year.textContent = new Date().getFullYear();

  // Fecha o menu móvel após selecionar um link de navegação.
  const menu = document.getElementById("menuPrincipal");
  if (menu && window.bootstrap) {
    menu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
          const collapse = window.bootstrap.Collapse.getInstance(menu);
          if (collapse) collapse.hide();
        }
      });
    });
  }

  // Gancho opcional para Analytics. Nenhum rastreamento é enviado por padrão.
  document
    .querySelectorAll("[data-product], [data-whatsapp]")
    .forEach((link) => {
      link.addEventListener("click", () => {
        const detail = {
          event: "whatsapp_click",
          whatsapp_location: link.dataset.whatsapp || "produto",
          product_name: link.dataset.product || "",
        };
        if (window.dataLayer && Array.isArray(window.dataLayer)) {
          window.dataLayer.push(detail);
        }
      });
    });
});
