const FORMAPI = "http://127.0.0.1:8000/reservations/add-reservation";

export async function handleSubmit(formData) {
  try {
    const response = await fetch(FORMAPI, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Reservation submitted successfully");
      return response;
    } else {
      console.error("Failed to submit reservation");
      return response;
    }
  } catch (error) {
    console.error("Error: ", error);
  }

  // return fetch(FORMAPI, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(formData),
  // })
  //   .then((response) => {
  //     if (response.ok) {
  //       console.log("Reservation submitted successfully");
  //       return response;
  //     } else {
  //       console.error("Failed to submit reservation");
  //       return response;
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error: ", error);
  //   });
}
