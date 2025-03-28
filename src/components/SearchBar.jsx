import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch , placeholder_value}) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className={styles["search-container"]}>
      <input
        type="text"
        placeholder= {placeholder_value}
        className={styles["search-input"]}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
