import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onCardClick,
  onAddClick,
  clothingItems,
  handleModalOpen,
  onSignOut,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleModalOpen={handleModalOpen} onSignOut={onSignOut} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          onAddClick={onAddClick}
          clothingItems={clothingItems}
          handleModalOpen={handleModalOpen}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
