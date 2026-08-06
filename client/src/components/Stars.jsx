// Renders a star rating (supports fractional values like 4.7)
function Stars({ rating = 0, size = 14 }) {
  const rounded = Math.round(rating * 2) / 2; // nearest 0.5
  return (
    <span
      className="stars"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      style={{ fontSize: size }}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = rounded >= star ? "100%" : rounded >= star - 0.5 ? "50%" : "0%";
        return (
          <span className="star" key={star} aria-hidden="true">
            <span className="star-bg">★</span>
            <span className="star-fill" style={{ width: fill }}>
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default Stars;
