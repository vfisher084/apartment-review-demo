
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// temp storage for submitted reviews
const reviews = [];

app.get("/", (req, res) => {
  res.send("Apartment Review API is running");
});

// return all submitted reviews
app.get("/reviews", (req, res) => {
  res.json(reviews);
});

// receive a new review
app.post("/reviews", (req, res) => {
  const { name, rating, text } = req.body;

  // check that all fields are provided
  if (!name?.trim() || !text?.trim() || rating == null) {
    return res.status(400).json({
      error: "Name, rating, and review text are required."
    });
  }

  // check that the rating is a whole number from 1 to 5
  if (
    !Number.isInteger(Number(rating)) ||
    Number(rating) < 1 ||
    Number(rating) > 5
  ) {
    return res.status(400).json({
      error: "Rating must be a whole number from 1 to 5."
    });
  }

  const newReview = {
    id: reviews.length + 1,
    name: name.trim(),
    rating: Number(rating),
    text: text.trim()
  };

  reviews.push(newReview);

  res.status(201).json(newReview);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

