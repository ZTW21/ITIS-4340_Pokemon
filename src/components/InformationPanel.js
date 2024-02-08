function InformationPanel({ selectedPokemon }) {
  const gradientStyle = {
    background: 'linear-gradient(to bottom, #ffd93d, #ffd93d 85%, #d2f2fa 100%)',
  };

  if (!selectedPokemon) {
    return <div style={gradientStyle} className="p-4 min-h-screen">Select a Pokémon to see its details.</div>;
  }

  return (
    <div style={gradientStyle} className="p-4 min-h-screen">
      <img src={selectedPokemon.sprite} alt={selectedPokemon.name} className="w-40 h-40 mx-auto" />
      <h2 className="text-2xl text-center mt-2">{selectedPokemon.name}</h2>
    </div>
  );
}

export default InformationPanel;
