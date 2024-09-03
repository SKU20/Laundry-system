document.addEventListener('DOMContentLoaded', () => {
    const toggleLink = document.getElementById('toggle-link');
    const toggleLinkBack = document.getElementById('toggle-link-back');
    const card = document.querySelector('.card');

    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        card.style.transform = 'rotateY(180deg)';
    });

    toggleLinkBack.addEventListener('click', (e) => {
        e.preventDefault();
        card.style.transform = 'rotateY(0deg)';
    });
});


document.getElementById('verificationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const code = document.getElementById('code').value;

    try {
        const response = await fetch('/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code })
        });

        if (response.ok) {
            alert('Email verified successfully!');
            window.location.href = '/'; 
        } else {
            alert('Invalid verification code.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
document.getElementById('loginFormBack').addEventListener('submit', async function(e) {
    e.preventDefault();

    const emailBack = document.getElementById('emailBack').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailBack }),
        });

        const data = await response.json();

        if (response.status === 400) {
            document.getElementById('error-message-back').innerText = data.error;
        } else if (response.ok) {
            window.location.href = `/dashboard?email=${encodeURIComponent(emailBack)}`;
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.getElementById('error-message-back').innerText = 'An unexpected error occurred. Please try again.';
    }
});

document.getElementById('loginFormBack').addEventListener('submit', async function(e) {
    e.preventDefault();

    const emailBack = document.getElementById('emailBack').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailBack }),
        });

        const data = await response.json();

        if (response.status === 400) {
            document.getElementById('error-message-back').innerText = data.error;
        } else if (response.ok) {
            window.location.href = `/dashboard?email=${encodeURIComponent(emailBack)}`;
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.getElementById('error-message-back').innerText = 'An unexpected error occurred. Please try again.';
    }
});
