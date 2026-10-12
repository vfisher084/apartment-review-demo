
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
    <>
      <header className="site-header">
        <h1 className="site-logo">Carolina Cribs</h1>
        <p className="header-label">Apartment Review Demo</p>
      </header>

      <main className="app-container">
        <div className="page-heading">
          <h2>Student Reviews</h2>
          <p>
            Share your experience living in an apartment and
            help other students find their next home.
          </p>
        </div>

        <div className="content-grid">
          <section className="panel">
            <h2>Write a Review</h2>

            <form className="review-form" onSubmit={handleSubmit}>
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
                <option value="5">5 stars - Excellent</option>
                <option value="4">4 stars - Good</option>
                <option value="3">3 stars - Average</option>
                <option value="2">2 stars - Poor</option>
                <option value="1">1 star - Very poor</option>
              </select>

              <label htmlFor="reviewText">Your review</label>
              <textarea
                id="reviewText"
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                placeholder="What was your experience like?"
                rows="4"
              />

              <button className="submit-button" type="submit">
                Submit Review
              </button>
            </form>
          </section>

          <section className="panel reviews-section">
            <h2>Submitted Reviews ({reviews.length})</h2>

            {reviews.length === 0 ? (
              <p className="empty-message">
                No reviews yet. Be the first to leave one!
              </p>
            ) : (
              <div className="review-list">
                {reviews.map((review) => (
                  <article className="review-card" key={review.id}>
                    <div className="review-card-header">
                      <h3>{review.name}</h3>

                      <div
                        className="review-rating"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                        <span className="review-rating-number">
                          {Number(review.rating).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <p className="review-text">{review.text}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
