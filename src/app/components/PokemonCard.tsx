import Image from "next/image";

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  number: string;
  types: string[];
}

export default function PokemonCard({
  name,
  imageUrl,
  number,
  types,
}: PokemonCardProps) {
  return (
    <div>
      <Image src={imageUrl} alt={imageUrl} width={10} height={10} />
      <h2>{name}</h2>
      <span>{number}</span>
      {types &&
        types.map((type, index) => (
          <div key={index}>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
        ))}
    </div>
  );
}
