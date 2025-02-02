import React, { useState } from "react";

function DogButton() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchDogImage() {
    setIsLoading(true);
    setError(null); // Reset error on new fetch

    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");

      if (!response.ok) {
        throw new Error("Failed to fetch dog image");
      }

      const data = await response.json();
      setImageUrl(data.message);
    } catch (err) {
      setError(err.message);
      setImageUrl(""); // Clear previous image on error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>Random Dog Generator</h1>
      <button onClick={fetchDogImage} disabled={isLoading}>
        {isLoading ? "Loading..." : "New Dog!"}
      </button>

      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={imageUrl}
            alt="A random dog"
            style={{ width: "500px", height: "500px", objectFit: "cover" }}
            key="dog-image" // Force re-render on new image
          />
        </div>
      )}

      {!imageUrl && !isLoading && !error && (
        <p>Click the button to fetch a dog! 🐶</p>
      )}
    </div>
  );
}

export default DogButton;
