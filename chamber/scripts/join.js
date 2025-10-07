// scripts/join.js
// ------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const ts = document.getElementById("timestamp");
  if (ts) ts.value = new Date().toISOString();
});

// ------------------------------------------------------------------

(() => {
  const openLinks = document.querySelectorAll("[data-open]");
  const closeButtons = document.querySelectorAll("[data-close]");
  const chooseButtons = document.querySelectorAll("[data-choose]");
  const membershipSelect = document.querySelector('select[name="membership"]');

  
  let lastTrigger = null;

  
  openLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("data-open");
      const dlg = document.getElementById(id);
      if (!dlg) return;

      lastTrigger = link;
      if (typeof dlg.showModal === "function") {
        dlg.showModal();
      } else {
        
        dlg.setAttribute("open", "");
      }
      
      const firstBtn = dlg.querySelector("button,[data-close],[data-choose]");
      if (firstBtn) firstBtn.focus();
    });
  });

  
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dlg = btn.closest("dialog");
      if (!dlg) return;
      dlg.close ? dlg.close() : dlg.removeAttribute("open");
      if (lastTrigger) lastTrigger.focus();
    });
  });

 
  chooseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const level = btn.getAttribute("data-choose"); 
      if (membershipSelect) membershipSelect.value = level;

      const dlg = btn.closest("dialog");
      if (dlg) dlg.close ? dlg.close() : dlg.removeAttribute("open");
      if (lastTrigger) lastTrigger.focus();
    });
  });

  
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.querySelectorAll("dialog[open]").forEach((d) => {
      d.close ? d.close() : d.removeAttribute("open");
    });
    if (lastTrigger) lastTrigger.focus();
  });

  
  document.querySelectorAll("dialog").forEach((dlg) => {
    dlg.addEventListener("click", (e) => {
      const rect = dlg.getBoundingClientRect();
      const inDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inDialog) {
        dlg.close ? dlg.close() : dlg.removeAttribute("open");
        if (lastTrigger) lastTrigger.focus();
      }
    });
  });
})();

// ------------------------------------------------------------------

(() => {
  const form = document.getElementById("joinForm");
  if (!form) return;
  form.addEventListener("submit", () => {
    const ts = document.getElementById("timestamp");
    if (ts && !ts.value) ts.value = new Date().toISOString();
  });
})();
