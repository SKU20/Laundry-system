document.addEventListener('DOMContentLoaded', () => {
    const email = new URLSearchParams(window.location.search).get('email');

    document.querySelectorAll('.status-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const button = event.currentTarget;
            const id = button.dataset.id;
            const status = button.dataset.status;
            const newStatus = status === 'available' ? 'busy' : 'available';

            if (newStatus === 'busy') {
                button.dataset.status = newStatus;
                button.textContent = 'Release';
                document.getElementById(`status-${id}`).textContent = newStatus;
                await fetch('/update-machine-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, status: newStatus, email })
                });
            } else {
                let enteredEmail = window.prompt('Enter your email to release the machine:');

                while (enteredEmail && enteredEmail !== email) {
                    enteredEmail = window.prompt('Email does not match. Please re-enter your email:');
                }

                if (enteredEmail === email) {
                    const response = await fetch('/update-machine-status', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id, status: newStatus, email: enteredEmail })
                    });

                    if (response.ok) {
                        button.dataset.status = newStatus;
                        button.textContent = 'Take';
                        document.getElementById(`status-${id}`).textContent = newStatus;
                    }
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

   
    document.getElementById('hidden-email').value = email;
});