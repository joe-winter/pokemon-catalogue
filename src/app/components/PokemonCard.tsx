import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { capitalizeString } from "@/lib/utils";

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  number: string;
  types: string[];
}

export default function PokemonCard({
  name = "hello",
  imageUrl,
  number,
  types,
}: PokemonCardProps) {
  return (
    <div className="max-w-fit">
      <Card>
        <div className="bg-gray-100 rounded-t-xl">
          <CardContent>
            <Image
              src={imageUrl}
              alt={imageUrl}
              width={200}
              height={200}
              quality={100}
            />
          </CardContent>
        </div>
        <CardContent>
          <h2 className="font-bold text-xl pt-3">{capitalizeString(name)}</h2>
          <div className="text-gray-500 text-sm mb-6">{number}</div>
          <div className="flex">
            {types &&
              types.map((type, index) => (
                <div className="bg-black max-w-fit rounded mr-3" key={index}>
                  <div className="px-2 py-0.5 text-white text-[10px]">
                    {capitalizeString(type)}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
