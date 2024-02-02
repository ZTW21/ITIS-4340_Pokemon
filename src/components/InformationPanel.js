function InformationPanel({ selectedPokemon }) {
  if (!selectedPokemon) {
    return <div className="p-4">Select a Pokémon to see its details.</div>;
  }

  return (
    <div className="p-4">
      <img src={selectedPokemon.sprite} alt={selectedPokemon.name} className="w-40 h-40 mx-auto" />
      <h2 className="text-2xl text-center mt-2">{selectedPokemon.name}</h2>
    </div>
  );
}

export default InformationPanel;
