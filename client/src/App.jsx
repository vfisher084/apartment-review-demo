
import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [reviewText, setReviewText] = useState("");

  return (
    <main className="app-container">
      <h1>Apartment Review Demo</h1>
      <p>Share your experience living in an apartment.</p>

      <form>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />

        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        >
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </select>

        <label htmlFor="reviewText">Your review</label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
          placeholder="What was your experience like?"
          rows="4"
        />

        <button type="submit">Submit Review</button>
      </form>
    </main>
  );
}

export default App;
