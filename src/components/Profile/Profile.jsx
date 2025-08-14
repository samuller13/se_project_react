import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ onCardClick, onAddClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          onAddClick={onAddClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
