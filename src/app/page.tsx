import PokemonCard from "./components/PokemonCard";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="p-4">
        <PokemonCard
          name="ditto"
          imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          number="#0002"
          types={["normal"]}
        />
      </div>
    </div>
  );
}
