/* =========================================================
   Musicala · Articulación en el Canto
   app.js — Audio + Tabs + Mini-trabalenguas
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Helpers ---------- */
  const $  = (q, ctx=document) => ctx.querySelector(q);
  const $$ = (q, ctx=document) => Array.from(ctx.querySelectorAll(q));

  /* ---------- Año en footer ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     AUDIO: Botón “🔊 Empecemos”
     ========================================================= */
  const btnAudio  = $("#btnAudio");
  const audioGuia = $("#audioGuia");
  let audioCtx = null;

  const ensureAudioContext = async () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") { try { await audioCtx.resume(); } catch(e){} }
    return audioCtx;
  };

  btnAudio?.addEventListener("click", async () => {
    await ensureAudioContext();
    try { await audioGuia.play(); } catch (e) { /* algunos navegadores requieren segundo toque */ }
  });

  /* =========================================================
     TABS: Buenas prácticas / Errores comunes
     ========================================================= */
  const tabs   = $$(".tab");
  const panels = $$(".tab-panel");

  function showTab(name){
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
    panels.forEach(p => p.classList.toggle("is-hidden", p.id !== `tab-${name}`));
  }

  // Estado inicial
  showTab("tips");

  tabs.forEach(t => t.addEventListener("click", () => showTab(t.dataset.tab)));

  /* =========================================================
     MINI-TRABALENGUAS (en sección “Ejemplos”)
     ========================================================= */
  const twisters = [
    "Tres tristes tigres tragaban trigo en tres tristes trastos.",
    "El cielo está enladrillado, ¿quién lo desenladrillará?",
    "Pepe Pecas pica papas con un pico y con un palito.",
    "Parra tenía una perra y Guerra tenía una parra.",
    "Pablito clavó un clavito en la calva de un calvito."
  ];

  let twIdx = 0;
  const twText = $("#twisterText");
  const prevTw = $("#prevTw");
  const nextTw = $("#nextTw");

  const renderTwister = () => { if (twText) twText.textContent = twisters[twIdx]; };
  renderTwister();

  prevTw?.addEventListener("click", () => {
    twIdx = (twIdx - 1 + twisters.length) % twisters.length;
    renderTwister();
  });

  nextTw?.addEventListener("click", () => {
    twIdx = (twIdx + 1) % twisters.length;
    renderTwister();
  });

  /* =========================================================
     Accesibilidad (opcional):
     - Tecla Tab para navegar botones; no añadimos atajos globales
    ========================================================= */
});
