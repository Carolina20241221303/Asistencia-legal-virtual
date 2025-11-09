document.addEventListener('DOMContentLoaded', () => { 
  const chatWidget = document.getElementById('chat-widget');
  const chatToggle = document.getElementById('chat-toggle');
const chatOpen = document.getElementById('chat-open');

  const chatPanel = document.querySelector('.chat-panel');
  const chatClose = document.getElementById('chat-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  //const yearEl = document.getElementById('year');

  //yearEl.textContent = new Date().getFullYear();

  function openChat() {
    chatWidget.classList.remove('chat-closed');
    chatWidget.classList.add('chat-open');
    chatInput.focus();
  }

  function closeChat() {
    chatWidget.classList.add('chat-closed');
    chatWidget.classList.remove('chat-open');
  }

  chatToggle.addEventListener('click', () => {
    if (chatWidget.classList.contains('chat-open')) closeChat();
    else openChat();
  });

  // Botón flotante 💬
chatToggle.addEventListener('click', () => {
  if (chatWidget.classList.contains('chat-open')) closeChat();
  else openChat();
});

// Enlace “Abrir Chatbot” del héroe
if (chatOpen) {
  chatOpen.addEventListener('click', () => {
    if (chatWidget.classList.contains('chat-open')) closeChat();
    else openChat();
  });
}

// Botón ✕ dentro del chat
chatClose.addEventListener('click', closeChat);


  chatClose.addEventListener('click', closeChat);

function addMessage(text, who = 'bot') {
  const div = document.createElement('div');
  div.className = 'chat-message ' + (who === 'bot' ? 'bot' : 'user');
  div.innerHTML = text.replace(/\n/g, '<br>');
  chatMessages.appendChild(div);

  // 🔹 Espera un instante y luego baja automáticamente
  setTimeout(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 100);
}

  // 💬 Menú principal
  function showMenu() {
    addMessage(
      "Bienvenido al chat de asesoría legal 👩‍⚖️👨‍⚖️\n" +
      "¿Cómo puedo ayudarte hoy?\n\n" +
      "Elige una de las siguientes opciones escribiendo el número:\n\n" +
      "1️. Derecho Laboral\n" +
      "2️. Derecho Civil\n" +
      "3️. Derecho Agrario\n" +
      "4️. Derecho de la Familia\n" +
      "5️. Derecho Penal\n\n" +
      "👉 Escribe **volver** en cualquier momento para regresar a este menú.",
      'bot'
    );
  }

  // ✳️ Botón de volver
  function showBackButton() {
    const backButton = document.createElement('button');
    backButton.textContent = '↩️ Volver al menú principal';
    backButton.className = 'back-button';
    backButton.style.margin = '10px 0';
    backButton.style.padding = '6px 12px';
    backButton.style.borderRadius = '8px';
    backButton.style.border = 'none';
    backButton.style.background = '#333';
    backButton.style.color = '#fff';
    backButton.style.cursor = 'pointer';
    backButton.onclick = () => {
      area = null;
      addMessage("Regresaste al menú principal. 🏠", 'bot');
      showMenu();
    };
    chatMessages.appendChild(backButton);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // 🧭 Submenús
  function showLaboral() {
    addMessage(
      "Has seleccionado **Derecho Laboral** ⚖️\n\n" +
      "Temas disponibles:\n" +
      "1. Contratos laborales\n" +
      "2. Prestaciones\n" +
      "3. Despidos\n" +
      "4. Condiciones de trabajo\n\nEscribe el número del tema o 'volver' para regresar.",
      'bot'
    );
    showBackButton();
  }

  function showCivil() {
    addMessage(
      "Has seleccionado **Derecho Civil** 📜\n\n" +
      "Temas disponibles:\n" +
      "1. Herencias\n" +
      "2. Matrimonio\n" +
      "3. Divorcio\n" +
      "4. Obligaciones\n\nEscribe el número del tema o 'volver' para regresar.",
      'bot'
    );
    showBackButton();
  }

  function showAgrario() {
    addMessage(
      "Has seleccionado **Derecho Agrario** 🌱\n\n" +
      "Temas disponibles:\n" +
      "1. Propiedad\n" +
      "2. Posesión\n\nEscribe el número del tema o 'volver' para regresar.",
      'bot'
    );
    showBackButton();
  }

  function showFamilia() {
    addMessage(
      "Has seleccionado **Derecho de la Familia** 👨‍👩‍👧‍👦\n\n" +
      "Temas disponibles:\n" +
      "1. Unión libre\n" +
      "2. Custodia de hijos\n" +
      "3. Alimentos\n" +
      "4. Adopción\n\nEscribe el número del tema o 'volver' para regresar.",
      'bot'
    );
    showBackButton();
  }

  function showPenal() {
    addMessage(
      "Has seleccionado **Derecho Penal** 🚨\n\n" +
      "Temas disponibles:\n" +
      "1. Lesiones\n" +
      "2. Violencia intrafamiliar\n" +
      "3. Estafas\n\nEscribe el número del tema o 'volver' para regresar.",
      'bot'
    );
    showBackButton();
  }

  let area = null;

  // 🔍 Procesar mensajes
  function processMessage(text) {
    addMessage(text, 'user');
    chatInput.value = '';
    const msg = text.trim().toLowerCase();

    // 🔸 Respuesta especial a “gracias”
    if (["gracias", "muchas gracias", "mil gracias", "te agradezco"].includes(msg)) {
      const respuestas = [
        "¡Fue un gusto ayudarte! 😊",
        "¡Con mucho gusto! Estoy aquí para apoyarte cuando necesites 💛",
        "¡Siempre es un placer poder orientarte! 🙌",
        "Me alegra haberte sido útil. 🌟"
      ];
      const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
      addMessage(respuesta, 'bot');
      return;
    }

    // 🔸 Comando volver
    if (msg === "volver") {
      area = null;
      addMessage("Regresaste al menú principal. 🏠", 'bot');
      showMenu();
      return;
    }

    // 🔸 Menú principal
    if (!area) {
      switch (msg) {
        case "1": area = "laboral"; showLaboral(); return;
        case "2": area = "civil"; showCivil(); return;
        case "3": area = "agrario"; showAgrario(); return;
        case "4": area = "familia"; showFamilia(); return;
        case "5": area = "penal"; showPenal(); return;
        case "salir":
        case "cerrar":
          addMessage("¡Hasta pronto! 👋 Fue un placer ayudarte.", 'bot');
          closeChat();
          return;
        default:
          addMessage("Por favor selecciona una opción válida del menú (1–5).", 'bot');
          return;
      }
    }

    // 🔸 Subtemas según área
    if (area === "laboral") {
      switch (msg) {
        case "1":
          addMessage("**Contratos laborales** ⚖️\n\n📌 Identifica el tipo de contrato (fijo, indefinido, obra o prestación). Verifica salario, jornada, funciones y seguridad social.\n\n💡 *Ejemplo:* Si trabajas sin contrato escrito, guarda chats, consignaciones o testigos.\n\n✅ *Recomendación:* Exige copia firmada y verifica tu afiliación a EPS, pensión y ARL.", 'bot');
          break;
        case "2":
          addMessage("**Prestaciones laborales** 💰\n\nIncluyen cesantías, intereses, prima, vacaciones y seguridad social.\n\n💡 *Ejemplo:* Si ganas $1.200.000, tu prima debe ser de $600.000 cada seis meses.\n\n✅ *Recomendación:* Reclama tus prestaciones dentro de los 3 años posteriores al retiro.", 'bot');
          break;
        case "3":
          addMessage("**Despidos** ⚠️\n\nDetermina si fue con o sin justa causa.\n\n💡 *Ejemplo:* Si te despiden embarazada o con incapacidad, es ilegal.\n\n✅ *Recomendación:* Intenta conciliación laboral antes de demandar.", 'bot');
          break;
        case "4":
          addMessage("**Condiciones de trabajo** 🏭\n\nJornadas excesivas o acoso laboral son inadecuadas.\n\n💡 *Ejemplo:* Si trabajas sin guantes o ventilación, denúncialo a la ARL.\n\n✅ *Recomendación:* Documenta con fotos y repórtalo al Ministerio de Trabajo.", 'bot');
          break;
        default:
          addMessage("Escribe el número del tema o 'volver' para regresar al menú principal.", 'bot');
      }
    }

    else if (area === "civil") {
      switch (msg) {
        case "1":
          addMessage("**Herencias** ⚰️\n\nVerifica testamento, herederos y deudas.\n\n💡 *Ejemplo:* Si no hay testamento, heredan hijos y cónyuge por igual.\n\n✅ *Recomendación:* Haz inventario antes de iniciar la sucesión.", 'bot');
          break;
        case "2":
          addMessage("**Matrimonio** 💍\n\nRegula la unión legal de dos personas.\n\n💡 *Ejemplo:* Puedes casarte con o sin sociedad conyugal.\n\n✅ *Recomendación:* Firma capitulaciones para proteger tus bienes.", 'bot');
          break;
        case "3":
          addMessage("**Divorcio** ⚖️\n\nPuede ser notarial o judicial.\n\n💡 *Ejemplo:* Si hay hijos menores, se hace ante juez.\n\n✅ *Recomendación:* Busca conciliación familiar antes del proceso.", 'bot');
          break;
        case "4":
          addMessage("**Obligaciones** 🧾\n\nCompromisos legales entre partes.\n\n💡 *Ejemplo:* No entregar un producto vendido es incumplimiento.\n\n✅ *Recomendación:* Deja todo por escrito y guarda comprobantes.", 'bot');
          break;
        default:
          addMessage("Escribe el número del tema o 'volver' para regresar al menú principal.", 'bot');
      }
    }

    else if (area === "agrario") {
      switch (msg) {
        case "1":
          addMessage("**Propiedad rural** 🌾\n\nDerecho legal sobre la tierra.\n\n💡 *Ejemplo:* Tener escritura registrada te hace propietario.\n\n✅ *Recomendación:* Revisa certificado de tradición para evitar fraudes.", 'bot');
          break;
        case "2":
          addMessage("**Posesión** 🚜\n\nUso y cuidado de terreno con ánimo de dueño.\n\n💡 *Ejemplo:* Si mantienes una finca 10 años, puedes adquirirla por prescripción.\n\n✅ *Recomendación:* Guarda pruebas de ocupación (recibos, fotos, testigos).", 'bot');
          break;
        default:
          addMessage("Escribe el número del tema o 'volver' para regresar al menú principal.", 'bot');
      }
    }

    else if (area === "familia") {
      switch (msg) {
        case "1":
          addMessage("**Unión libre** 💞\n\nSurge tras 2 años de convivencia.\n\n💡 *Ejemplo:* Si tu pareja fallece, puedes reclamar pensión si se demuestra la unión.\n\n✅ *Recomendación:* Regístrala ante notaría o juzgado.", 'bot');
          break;
        case "2":
          addMessage("**Custodia de hijos** 👶\n\nEl juez decide según el interés del menor.\n\n💡 *Ejemplo:* Custodia compartida si ambos padres cumplen deberes.\n\n✅ *Recomendación:* Busca mediación familiar antes de litigar.", 'bot');
          break;
        case "3":
          addMessage("**Alimentos** 🍽️\n\nObligación de cubrir necesidades básicas.\n\n💡 *Ejemplo:* El padre que no paga cuota puede ser demandado.\n\n✅ *Recomendación:* Guarda recibos y prueba de gastos.", 'bot');
          break;
        case "4":
          addMessage("**Adopción** 👨‍👩‍👧\n\nOtorga paternidad legal.\n\n💡 *Ejemplo:* Solo puede hacerse con autorización del ICBF.\n\n✅ *Recomendación:* Reúne antecedentes y exámenes médicos antes del proceso.", 'bot');
          break;
        default:
          addMessage("Escribe el número del tema o 'volver' para regresar al menú principal.", 'bot');
      }
    }

    else if (area === "penal") {
      switch (msg) {
        case "1":
          addMessage("**Lesiones personales** 🚑\n\nCausar daño físico a otro es delito.\n\n💡 *Ejemplo:* Una incapacidad médica de más de 30 días agrava la pena.\n\n✅ *Recomendación:* Acude a Medicina Legal y denuncia ante la Fiscalía.", 'bot');
          break;
        case "2":
          addMessage("**Violencia intrafamiliar** 🚨\n\nIncluye maltrato físico, psicológico o sexual.\n\n💡 *Ejemplo:* Las víctimas pueden pedir medidas de protección.\n\n✅ *Recomendación:* Guarda evidencias y denuncia en comisaría o Fiscalía.", 'bot');
          break;
        case "3":
          addMessage("**Estafas** 💸\n\nEngaño para obtener dinero o bienes.\n\n💡 *Ejemplo:* Pagar por un producto inexistente es estafa.\n\n✅ *Recomendación:* Conserva pruebas (recibos, mensajes, extractos) y denuncia.", 'bot');
          break;
        default:
          addMessage("Escribe el número del tema o 'volver' para regresar al menú principal.", 'bot');
      }
    }
  }

  // 🏁 Iniciar chat
  showMenu();

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = chatInput.value.trim();
    if (!val) return;
    processMessage(val);
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chatForm.dispatchEvent(new Event('submit'));
    }
  });
});



