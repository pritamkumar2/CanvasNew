import React, { useState } from "react";
import { Box, Grid, LinearProgress, Rating } from "@mui/material";
import "./rateSection.css";

const RateSection = () => {
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Submitted Rating:", rating);
    console.log("Submitted Comment:", comment);
    setSubmitted(true);
  };

  const handleCommentChange = (event) => {
    event.preventDefault();
    setComment(event.target.value);
  };

  return (
    <div className="ratings-section flex flex-col flex-wrap">
      <div className="mt-4">
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="rate w-full">
              <input
                type="radio"
                id="star5"
                name="rate"
                value="5"
                onClick={(e) => {
                  e.preventDefault();
                  setRating(5);
                }}
              />
              <label htmlFor="star5" title="text">
                5 stars
              </label>
              <input
                type="radio"
                id="star4"
                name="rate"
                value="4"
                onClick={(e) => {
                  e.preventDefault();
                  setRating(4);
                }}
              />
              <label htmlFor="star4" title="text">
                4 stars
              </label>
              <input
                type="radio"
                id="star3"
                name="rate"
                value="3"
                onClick={(e) => {
                  e.preventDefault();
                  setRating(3);
                }}
              />
              <label htmlFor="star3" title="text">
                3 stars
              </label>
              <input
                type="radio"
                id="star2"
                name="rate"
                value="2"
                onClick={(e) => {
                  e.preventDefault();
                  setRating(2);
                }}
              />
              <label htmlFor="star2" title="text">
                2 stars
              </label>
              <input
                type="radio"
                id="star1"
                name="rate"
                value="1"
                onClick={(e) => {
                  e.preventDefault();
                  setRating(1);
                }}
              />
              <label htmlFor="star1" title="text">
                1 star
              </label>
            </div>
            <div className="w-full">
              <textarea
                className="w-full p-2 border border-black"
                placeholder="Write your review..."
                value={comment}
                onChange={handleCommentChange}
                rows={10}
                cols={70}
              ></textarea>

              <button type="submit" className="glitch-button">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className=" flex justify-center items-center">
            <div class="hero">
              <h1 class="text-reveal">
                <span>THANK YOU FOR REVIEW</span>
                <span aria-hidden="true">THANK YOU FOR REVIEW</span>
              </h1>
            </div>
          </div>
        )}
      </div>

<br />
<br />
      <Grid item xs={12} sm={5} >
        <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
        <div className="flex items-center space-x-3 pb-10">
          <div className="flex items-center">
            <Rating name="read-only" value={4.6} precision={0.5} readOnly />
            <p className="opacity-60 ml-2">42807 Ratings</p>
          </div>
        </div>

        {/* Rating Categories */}
        <Box>
          {[
            { label: "Excellent", value: 40, color: "success" },
            { label: "Very Good", value: 30, color: "success" },
            { label: "Good", value: 25, color: "orange" },
            { label: "Average", value: 21, color: "success" },
            { label: "Poor", value: 10, color: "error" },
          ].map((category, index) => (
            <Grid
              key={index}
              container
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <Grid item xs={2}>
                <p className="p-0">{category.label}</p>
              </Grid>
              <Grid item xs={7}>
                <LinearProgress
                  sx={{
                    bgcolor: "#d0d0d0",
                    borderRadius: 4,
                    height: 7,
                    "& .MuiLinearProgress-bar": {
                      bgcolor: category.color,
                    },
                  }}
                  variant="determinate"
                  value={category.value}
                />
              </Grid>
              <Grid item xs={2}>
                <p className="opacity-50 p-2">19259</p>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Grid>
    </div>
  );
};

export default RateSection;
