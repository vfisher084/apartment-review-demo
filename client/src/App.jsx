
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  
useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:3000/reviews");

      if (!response.ok) {
        throw new Error("Failed to load reviews.");
      }

      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  fetchReviews();
}, []);

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !reviewText.trim()) {
      alert("Please enter your name and review.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          rating: Number(rating),
          text: reviewText.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review.");
      }

      setReviews((currentReviews) => [...currentReviews, data]);
      alert(`Thanks for your review, ${data.name}!`);

      setName("");
      setRating("5");
      setReviewText("");
    } catch (error) {
      alert(`Could not submit review: ${error.message}`);
    }
  };


  return (
    <main className="app-container">
      <h1>Apartment Review Demo</h1>
      <p>Share your experience living in an apartment.</p>

      <form onSubmit={handleSubmit}>
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
      
<section className="reviews-section">
  <h2>Submitted Reviews</h2>

  {reviews.length === 0 ? (
    <p>No reviews yet. Be the first to leave one!</p>
  ) : (
    reviews.map((review) => (
      <article className="review-card" key={review.id}>
        <h3>{review.name}</h3>
        <p>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
        <p>{review.text}</p>
      </article>
    ))
  )}
</section>
    </main>
  );
}

export default App;
