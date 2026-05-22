// ============================================================
// GSYNCRO — Shared Info Pages (forms & tracking UI)
// ============================================================

function handleContactSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) {
    btn.textContent = 'Message Sent ✓';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      e.target.reset();
    }, 4000);
  }
}

function handleTrackSubmit(e) {
  e.preventDefault();
  const result = document.getElementById('trackingResult');
  const steps = document.querySelectorAll('.tracking-step');
  if (!result) return;

  steps.forEach((step, i) => {
    step.classList.remove('active', 'done');
    if (i < 2) step.classList.add('done');
    if (i === 2) step.classList.add('active');
  });

  result.classList.add('visible');
  result.innerHTML = `
    <h3>Order in transit</h3>
    <p>Your parcel has been dispatched and is on its way. Tracking integrations will connect here once our fulfilment API is live.</p>
    <p style="font-size:0.8rem;color:var(--muted);margin-top:0.75rem;">Reference: GS-${Date.now().toString().slice(-8)}</p>
  `;
}

window.handleContactSubmit = handleContactSubmit;
window.handleTrackSubmit = handleTrackSubmit;
