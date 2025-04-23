// Get form and thank-you message elements
const form = document.querySelector("form");
const thankYou = document.getElementById("thankYouMessage");

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission behavior

  const formData = new FormData(form);

  // Send form data to Formspree
  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Show thank-you message and reset form
        thankYou.style.display = "block";
        form.reset();
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    })
    .catch((error) => {
      alert("Oops! There was a problem submitting the form.");
    });
});

// Fetch volunteer stories from JSONPlaceholder API
document.addEventListener("DOMContentLoaded", () => {
  const storiesContainer = document.getElementById("storiesContainer");

  fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((story) => {
        const storyCard = document.createElement("div");
        storyCard.className = "opportunity-card";
        storyCard.innerHTML = `
          <h3>${story.title}</h3>
          <p>${story.body}</p>
        `;
        storiesContainer.appendChild(storyCard);
      });
    })
    .catch((error) => {
      storiesContainer.innerHTML = `
        <div class="error-message">
          <p>😕 Oops! We couldn’t load the stories. Please try again later.</p>
        </div>
      `;
      console.error("Error fetching stories:", error);
    });
});


