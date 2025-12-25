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

    // CONFIGURATION (Developers update this)
    const REDIRECT_URL = 'thank-you.html';
    
    // OPTION A: If using a Webhook (e.g., n8n, Zapier)
    const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE'; 

    form.addEventListener('submit', function(e) {
        // Prevent default HTML form submission behavior
        e.preventDefault();
        
        const email = emailInput.value;
        const originalBtnText = submitBtn.innerText;

        // Visual feedback
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        /* 
           --- LOGIC BRANCH ---
           If you are using an Embedded Form from MailerLite/Convertkit, 
           you likely won't need this JS file at all (you would replace the HTML form).
           
           If you are using a custom POST to a webhook, uncomment the fetch block below.
        */

        // START WEBHOOK LOGIC (Uncomment to use)
        /*
        fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, source: 'lead_magnet_page' }),
        })
        .then(response => {
            if (response.ok) {
                window.location.href = REDIRECT_URL;
            } else {
                alert('Something went wrong. Please try again.');
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error submitting form.');
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        });
        */
        // END WEBHOOK LOGIC

        // FOR DEMO PURPOSES ONLY (Delete this block when integrating real backend)
        setTimeout(() => {
            console.log(`Email captured: ${email}`);
            window.location.href = REDIRECT_URL;
        }, 1000);
    });
});