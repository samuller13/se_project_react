import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_liked" : ""}`;
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser?._id && (
          <button
            onClick={handleLike}
            type="button"
            className={itemLikeButtonClassName}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
