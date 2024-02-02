function SearchBar({ searchQuery, setSearchQuery }) {
    return (
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Search for a Pokémon"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    );
  }
  
  export default SearchBar;
  