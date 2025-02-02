
import {useState, useEffect} from "react";

export default function DogImageMultiple() {
      const [images, setImages] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        async function fetchDogImages() {
          try {
            // Fetch 15 images (you can change this number)
            const response = await fetch(
              "https://dog.ceo/api/breeds/image/random/15"
            );

            if (!response.ok) {
              throw new Error("Failed to fetch dog images");
            }

            const data = await response.json();

            // Use slice to display the first 10 images (adjust the number as needed)
            const slicedImages = data.message.slice(0, 10);
            setImages(slicedImages);
          } catch (err) {
            setError(err.message);
          } finally {
            setIsLoading(false);
          }
        }

        fetchDogImages();
      }, []);

      if (isLoading) {
        return <div>Loading dogs...</div>;
      }

      if (error) {
        return <div>Error: {error}</div>;
      }

      return (
        <div>
          <h1>Dog Gallery</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {images.map((imageUrl, index) => (
              <img
                key={index} // Use index as key since URLs might repeat
                src={imageUrl}
                alt={`Dog ${index + 1}`}
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
            ))}
          </div>
        </div>
      );
}