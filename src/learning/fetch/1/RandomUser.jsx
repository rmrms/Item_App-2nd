import { useState, useEffect, use } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const RandomUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchUser() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://randomuser.me/api/");
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUser(data.results[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="row ">
      <div className="container text-center w-100">
        <h1>Random User Generator</h1>
        <button onClick={fetchUser} disabled={isLoading}>
          {isLoading ? "Loading..." : "Generate User"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {user && (
          <div>
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
            />
            <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
            <p className="border-bottom">Email: {user.email}</p>
            <p className="border-bottom">
              Location: {`${user.location.city}, ${user.location.country}`}
            </p>
            <p className="border-bottom">Phone: {user.phone}</p>
            <p className="border-bottom">Cell Phone: {user.cell}</p>
            <p className="border-bottom">
              Registered on:{" "}
              {new Date(user.registered.date).toLocaleDateString()}
            </p>
            <p className="border-bottom">
              Years since registration: {user.registered.age}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default RandomUser;
