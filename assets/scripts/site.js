const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
const mobileToggle = document.querySelector("[data-menu-toggle]");
const mobilePanel = document.querySelector("[data-menu]");
const contactForm = document.querySelector("[data-contact-form]");

function closeMenu() {
  if (!mobileToggle || !mobilePanel) {
    return;
  }

  mobileToggle.setAttribute("aria-expanded", "false");
  mobilePanel.classList.remove("is-open");
}

if (mobileToggle && mobilePanel) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = mobilePanel.classList.toggle("is-open");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

if (revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal", "is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}

if (contactForm instanceof HTMLFormElement) {
  const status = contactForm.querySelector("[data-form-status]");
  const submitLabel = contactForm.querySelector("[data-submit-label]");
  const endpoint = contactForm.dataset.endpoint?.trim();

  const setStatus = (message, tone = "neutral") => {
    if (!(status instanceof HTMLElement)) {
      return;
    }

    status.textContent = message;
    status.classList.remove("is-success", "is-error");

    if (tone === "success") {
      status.classList.add("is-success");
    }

    if (tone === "error") {
      status.classList.add("is-error");
    }
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (submitLabel instanceof HTMLElement) {
      submitLabel.textContent = "Enviando...";
    }

    const formData = new FormData(contactForm);

    try {
      if (!endpoint) {
        setStatus(
          "Pré-visualização local concluída. Configure o atributo data-endpoint para enviar o formulário em produção.",
          "success",
        );
        contactForm.reset();
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar formulário.");
      }

      setStatus("Solicitação enviada com sucesso. A equipe entrará em contato em breve.", "success");
      contactForm.reset();
    } catch (error) {
      console.error(error);
      setStatus("Não foi possível enviar agora. Revise o endpoint configurado e tente novamente.", "error");
    } finally {
      if (submitLabel instanceof HTMLElement) {
        submitLabel.textContent = "Enviar solicitação";
      }
    }
  });
}

document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
