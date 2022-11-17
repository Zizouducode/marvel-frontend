import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ search, setSearch }) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <FontAwesomeIcon
        className="search-bar-search-icon"
        icon="fa-magnifying-glass"
      />
      <input
        type="text"
        placeholder="SEARCH"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
