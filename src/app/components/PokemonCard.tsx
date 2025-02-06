import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="max-w-64">
      <Card>
        <div className="bg-[#f4f4f5] rounded-t-xl">
          <CardContent>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageUrl}
                width={200}
                height={200}
                quality={100}
                unoptimized={true}
              />
            )}
          </CardContent>
        </div>
        <CardContent>
          <h2 className="font-bold text-xl pt-3 text-nowrap overflow-hidden">
            {capitalizeString(name)}
          </h2>
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
