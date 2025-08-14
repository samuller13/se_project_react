import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import AddItemModal from "../AddItemModal/AddItemModal";

function ClothesSection({ onCardClick, onAddClick, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__title">
        <p className="your-items">Your items</p>
        <button
          className="clothes-section__add-new-btn"
          type="button"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onAddClick={onAddClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
