function showParams() {
    const params = new URLSearchParams(location.search);
    const entries = [...params.entries()];
    const el = document.getElementById('response');
    
    if (!entries.length) { 
        el.textContent = 'No form data received.'; 
        return; 
    }
    
    el.innerHTML = `<ul>${entries.map(([k, v]) => 
        `<li><strong>${k}:</strong> ${decodeURIComponent(v)}</li>`
    ).join('')}</ul>`;
}

showParams();