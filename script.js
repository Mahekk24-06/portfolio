document.addEventListener('DOMContentLoaded', () => {
    // Ensure the popup is hidden on page load
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.add('hidden');
        popup.classList.remove('show'); // Ensure 'show' class is not present initially
    }

    // Attach event listener to the Ok button inside the popup only once
    const popupOkBtn = document.getElementById('popup-ok-btn');
    if (popupOkBtn && !popupOkBtn.dataset.listenerAdded) {
        popupOkBtn.addEventListener('click', () => {
            showPopup(false); // Hide the popup when 'Ok' is clicked
        });
        popupOkBtn.dataset.listenerAdded = 'true'; // Mark that listener has been added
    }
});


// This is your original addRecommendation function, with necessary updates
function addRecommendation() {
    // Get the message of the new recommendation
    // IMPORTANT: Changed ID from "new_recommendation" to "userMessage" to match previous HTML suggestions
    let recommendationInput = document.getElementById("userMessage");
    // Also get the name input (assuming you have one with id="userName" from previous suggestions)
    let userNameInput = document.getElementById("userName");

    // If the user has left a recommendation (message is not null, empty, or just whitespace)
    if (recommendationInput.value !== null && recommendationInput.value.trim() !== "") {
        console.log("New recommendation added");

        // --- ADDED THIS LINE AS PER YOUR REQUEST ---
        showPopup(true); // Invoke the showPopup function to display the confirmation

        // Create a new 'div' element for the recommendation
        var element = document.createElement("div");
        // Set its class attribute for styling (e.g., from your CSS)
        element.setAttribute("class", "recommendation");

        // Get the trimmed message and user name
        let recommendationText = recommendationInput.value.trim();
        let userName = userNameInput ? userNameInput.value.trim() : ''; // Handle case if userNameInput doesn't exist

        // Construct the inner HTML for the recommendation element
        // It includes the message wrapped in quotes and optionally the user's name
        if (userName !== "") {
            // If a name is provided, include it in the recommendation display
            element.innerHTML = `<span>&#8220;</span>${recommendationText}<span>&#8221;</span><br/><br/><strong>- ${userName}</strong>`;
        } else {
            // If no name, just display the message
            element.innerHTML = `<span>&#8220;</span>${recommendationText}<span>&#8221;</span>`;
        }

        // Add this element to the end of the list of recommendations
        // IMPORTANT: Ensure you have a div with id="all_recommendations" in your HTML
        const allRecommendationsContainer = document.getElementById("all_recommendations");
        if (allRecommendationsContainer) {
            allRecommendationsContainer.appendChild(element);
        } else {
            console.error("Error: Element with ID 'all_recommendations' not found. Cannot append recommendation.");
        }
        
        // Reset the value of the textarea
        recommendationInput.value = "";
        // Reset the value of the name input
        if (userNameInput) {
            userNameInput.value = "";
        }
    } else {
        // Optional: Provide feedback if the message is empty
        console.log("Recommendation message cannot be empty.");
        // You could add a custom modal/message box here instead of a browser alert
        // alert("Please enter your recommendation message.");
    }
}

// This is your original showPopup function, updated to use classList for smooth transitions
function showPopup(bool) {
    const popup = document.getElementById('popup');
    if (!popup) {
        console.error("Error: Popup element with ID 'popup' not found.");
        return; // Exit if popup element doesn't exist
    }

    if (bool) {
        // Show the popup by adding the 'show' class and removing 'hidden'
        // This works with the CSS transitions I provided earlier
        popup.classList.add('show');
        popup.classList.remove('hidden');
        // If you had a form that you want to hide when the popup is shown, add similar logic here:
        // document.getElementById('recommendationForm').classList.add('hidden');
    } else {
        // Hide the popup by removing the 'show' class and adding 'hidden'
        popup.classList.remove('show');
        popup.classList.add('hidden');
        // If you had a form that you want to show again after the popup closes, add similar logic here:
        // document.getElementById('recommendationForm').classList.remove('hidden');
    }
}
