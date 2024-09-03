const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('email');

if (userEmail) {
    const dryerLink = document.getElementById('dryerLink');
    const laundryLink = document.getElementById('laundryLink');

    if (dryerLink && laundryLink) {
        dryerLink.href += `?email=${encodeURIComponent(userEmail)}`;
        laundryLink.href += `?email=${encodeURIComponent(userEmail)}`;
    } else {
        console.error('Links not found');
    }
} else {
    console.warn('Email parameter not found in URL');
}