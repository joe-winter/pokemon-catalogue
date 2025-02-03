import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card>
      <CardContent>
        <div>
          <Image
            src={imageUrl}
            alt={imageUrl}
            width={200}
            height={200}
            quality={100}
          />
        </div>
        <h2>{name}</h2>
        <span>{number}</span>
        {types &&
          types.map((type, index) => (
            <div key={index}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
