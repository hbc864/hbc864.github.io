// Function to get query parameters from the URL
function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split("&").forEach(param => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
    });
    return params;
}

// Display the 'model' query parameter on the page
document.addEventListener("DOMContentLoaded", () => {
    const params = getQueryParams();
    const model = params.model || "not specified";
    document.getElementById("model").innerText = model;
});
