document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leadForm');
    if (!form) return;

    const emailInput = document.getElementById('email');
    const submitBtn = form.querySelector('button');

    // Bottom CTA link focus behavior
    const bottomCta = document.getElementById('bottomCta');
    if (bottomCta) {
        bottomCta.addEventListener('click', function(e) {
            e.preventDefault();
            emailInput.focus();
            emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // CONFIGURATION
    const REDIRECT_URL = 'thank-you.html';
    const WEBHOOK_URL = 'https://n8n-bopk.onrender.com/webhook/25708ab7-93b3-461e-b34b-adc71ed033b4';

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value;
        const originalBtnText = submitBtn.innerText;

        // Visual feedback
        submitBtn.innerText = 'Изпращане...';
        submitBtn.disabled = true;

        try {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });

            // Redirect to Thank You page after successful submission
            window.location.href = REDIRECT_URL;

        } catch (error) {
            console.error('Error:', error);
            alert('Възникна грешка при изпращането. Моля, опитайте отново.');
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});