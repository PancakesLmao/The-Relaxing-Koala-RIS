// src/js/customer/handleSubmit.js
export default function handleSubmit(formData) {
  console.log(formData);

  // Example of sending form data to the server using fetch
  fetch("http://127.0.0.1:8000/reservations/add-reservation", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Reservation submitted successfully");
      } else {
        console.error("Failed to submit reservation");
      }
    })
    .catch((error) => {
      console.error("Error submitting reservation:", error);
    });
}
