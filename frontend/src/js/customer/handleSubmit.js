const handleSubmit = async (formData) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/reservations/add-reservation",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log("Successfully sent:", data);
  }
  catch (error) {
    console.error("Error:", error);
  }
};

export default handleSubmit;
