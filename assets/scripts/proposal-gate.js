(function () {
  const STORAGE_KEY = "royalSkinProposalGate.v1";

  function readState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { unlocked: false, lead: null, unlockedAt: null };
      }

      const parsed = JSON.parse(raw);
      return {
        unlocked: parsed?.unlocked === true,
        lead: parsed?.lead ?? null,
        unlockedAt: parsed?.unlockedAt ?? null,
      };
    } catch (error) {
      console.error("Failed to read proposal gate state.", error);
      return { unlocked: false, lead: null, unlockedAt: null };
    }
  }

  function saveState(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to persist proposal gate state.", error);
    }
  }

  function unlockFromForm(form) {
    const formData = new FormData(form);
    const lead = Object.fromEntries(formData.entries());
    const state = {
      unlocked: true,
      unlockedAt: new Date().toISOString(),
      lead,
    };

    saveState(state);
    return state;
  }

  function clearGate() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear proposal gate state.", error);
    }
  }

  function hydrateGateUI(root) {
    const scope = root || document;
    const state = readState();
    const unlocked = state.unlocked === true;

    scope.querySelectorAll("[data-proposal-unlocked]").forEach((node) => {
      node.classList.toggle("hidden", !unlocked);
    });

    scope.querySelectorAll("[data-proposal-locked]").forEach((node) => {
      node.classList.toggle("hidden", unlocked);
    });

    scope.querySelectorAll("[data-proposal-clinic]").forEach((node) => {
      node.textContent = state.lead?.company || "sua clínica";
    });

    scope.querySelectorAll("[data-proposal-name]").forEach((node) => {
      node.textContent = state.lead?.name || "sua equipe";
    });

    scope.querySelectorAll("[data-proposal-specialty]").forEach((node) => {
      node.textContent = state.lead?.specialty || "sua especialidade";
    });

    return state;
  }

  async function submitLead(form) {
    const endpoint = form.dataset.endpoint?.trim();

    if (!endpoint) {
      return { ok: true, preview: true };
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });

    if (!response.ok) {
      throw new Error("Failed to submit lead.");
    }

    return { ok: true, preview: false };
  }

  function initProposalForm(form, options) {
    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const settings = {
      redirectTo: "proposta.html",
      successMessage: "Diagnóstico recebido. Sua proposta foi liberada.",
      redirectDelay: 1200,
      ...options,
    };

    const status = form.querySelector("[data-form-status]");
    const submitLabel = form.querySelector("[data-submit-label]");

    const setStatus = (message, tone) => {
      if (!(status instanceof HTMLElement)) {
        return;
      }

      status.textContent = message;
      status.style.color = tone === "success" ? "var(--success)" : "rgba(255,255,255,.45)";
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (submitLabel instanceof HTMLElement) {
        submitLabel.textContent = "Enviando...";
      }

      try {
        await submitLead(form);
        unlockFromForm(form);
        hydrateGateUI(document);
        setStatus(settings.successMessage, "success");

        window.setTimeout(() => {
          window.location.href = settings.redirectTo;
        }, settings.redirectDelay);
      } catch (error) {
        console.error(error);
        setStatus("Não foi possível enviar agora. Revise a integração e tente novamente.", "error");
      } finally {
        if (submitLabel instanceof HTMLElement) {
          submitLabel.textContent = "Enviar e liberar proposta";
        }
      }
    });
  }

  window.RoyalProposalGate = {
    STORAGE_KEY,
    clearGate,
    getState: readState,
    hydrateGateUI,
    initProposalForm,
    isUnlocked() {
      return readState().unlocked === true;
    },
    unlockFromForm,
  };
})();
