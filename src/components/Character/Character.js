import "./Character.css";
import { Link } from "react-router-dom";

const Character = ({ character }) => {
  const { name, description, _id } = character;
  // if (!thumbnail.path.includes("image_not_available")) {
  return (
    <div className="character-container">
      <Link to={`/character/${_id}`}>
        <div className="character-img-container">
          <img
            className="character-img"
            src={character.thumbnail.path + "." + character.thumbnail.extension}
            alt={`super hero : ${name}`}
          />
        </div>
        <div className="character-red-line"></div>
        <div className="character-name-description-container">
          <div className="character-name">{name}</div>
          <div className="character-description">{description}</div>
        </div>
      </Link>
    </div>
  );
  // }
};

export default Character;
