import { useState, useEffect } from "react";

function DogImage() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDogImage() {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!response.ok) {
          throw new Error("Failed to fetch dog image");
        }

        const data = await response.json();
        setImageUrl(data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDogImage();
  }, []);

  if (isLoading) {
    return <div>Loading dog image...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Random Dog</h1>
      <img
        src={imageUrl}
        alt="A random dog"
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
    </div>
  );
}

export default DogImage;
