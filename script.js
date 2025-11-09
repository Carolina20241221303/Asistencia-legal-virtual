// script.js
document.addEventListener('DOMContentLoaded', () => {
  const chatWidget = document.getElementById('chat-widget');
  const chatToggle = document.getElementById('chat-toggle');
  const chatPanel = document.querySelector('.chat-panel');
  const chatClose = document.getElementById('chat-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const yearEl = document.getElementById('year');

  yearEl.textContent = new Date().getFullYear();

  function openChat(){
    chatWidget.classList.remove('chat-closed');
    chatWidget.classList.add('chat-open');
    chatInput.focus();
  }
  function closeChat(){
    chatWidget.classList.add('chat-closed');
    chatWidget.classList.remove('chat-open');
  }

  chatToggle.addEventListener('click', () => {
    if (chatWidget.classList.contains('chat-open')) closeChat();
    else openChat();
  });
  chatClose.addEventListener('click', closeChat);

  function addMessage(text, who='bot'){
    const div = document.createElement('div');
    div.className = 'chat-message ' + (who==='bot' ? 'bot' : 'user');
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // initial greeting
  addMessage('Hola, soy tu asistente legal virtual. Escribe "Información de seguros" o "Salir".', 'bot');

  async function sendToServer(text){
    addMessage(text, 'user');
    chatInput.value = '';
    try{
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({message:text})
      });
      if(!res.ok) throw new Error('Error de servidor');
      const data = await res.json();
      if(data.reply) addMessage(data.reply, 'bot');
      else addMessage('Error: respuesta inválida del servidor', 'bot');
    }catch(err){
      addMessage('No se pudo conectar con el servidor. Asegúrate de ejecutar el backend (Flask).', 'bot');
      console.error(err);
    }
  }

  chatForm.addEventListener('submit', () => {
    const val = chatInput.value.trim();
    if(!val) return;
    sendToServer(val);
  });

  // support pressing Enter
  chatInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault();
      chatForm.dispatchEvent(new Event('submit'));
    }
  });
});

