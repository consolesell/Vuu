document.addEventListener('DOMContentLoaded', function() {
    const getLocationBtn = document.getElementById('getLocationBtn');
    const loading = document.getElementById('loading');
    const locationInfo = document.getElementById('locationInfo');
    const error = document.getElementById('error');
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');
    const accuracy = document.getElementById('accuracy');
    const mapLink = document.getElementById('mapLink');

    getLocationBtn.addEventListener('click', function() {
        if (!navigator.geolocation) {
            showError('Geolocation is not supported by this browser.');
            return;
        }

        // Hide previous results
        hideAllMessages();
        loading.classList.remove('hidden');
        getLocationBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Success callback
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const acc = position.coords.accuracy;

                latitude.textContent = lat.toFixed(6);
                longitude.textContent = lng.toFixed(6);
                accuracy.textContent = Math.round(acc);

                // Create map link
                const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                mapLink.innerHTML = `<a href="${googleMapsUrl}" target="_blank">View on Google Maps</a>`;

                loading.classList.add('hidden');
                locationInfo.classList.remove('hidden');
                getLocationBtn.disabled = false;
            },
            function(err) {
                // Error callback
                let errorMessage = 'Unable to retrieve your location.';
                
                switch(err.code) {
                    case err.PERMISSION_DENIED:
                        errorMessage = 'Location access denied by user.';
                        break;
                    case err.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case err.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                }

                showError(errorMessage);
                loading.classList.add('hidden');
                getLocationBtn.disabled = false;
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    });

    function showError(message) {
        error.textContent = message;
        error.classList.remove('hidden');
    }

    function hideAllMessages() {
        loading.classList.add('hidden');
        locationInfo.classList.add('hidden');
        error.classList.add('hidden');
    }
});
