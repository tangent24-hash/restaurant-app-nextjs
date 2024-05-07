// FoodItemCard.js
const FoodItemCard = ({ food }) => {
  return (
    <div className="food-item-card">
      <img src={food.image} alt={food.name} />
      <h3>{food.name}</h3>
      <p>{food.description}</p>
      <p>Price: ${food.price}</p>
    </div>
  );
};

export default FoodItemCard;
