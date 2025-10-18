import "./../../css/allcoins/SearchInput.css";

export default function SearchInput({ searchTerm, setSearchTerm }) {
  return (
    <div className="search" role="search">
      <input
        id="search-input"
        type="text"
        className="search-input"
        placeholder="Search coin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search for a cryptocurrency"
        aria-describedby="search-hint"
      />
    </div>
  );
}
