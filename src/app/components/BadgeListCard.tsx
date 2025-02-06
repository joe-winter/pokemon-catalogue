import { Card, CardContent } from "@/components/ui/card";
import { capitalizeString } from "@/lib/utils";

interface BadgeListCardProps {
  categories: {
    heading: string;
    badges: string[];
  }[];
  className?: string;
}

export default function BadgeListCard({ categories, className }: BadgeListCardProps) {
  return (
    <Card className={`${className}`}>
      {categories.map((category, index) => (
        <CardContent key={index}>
          <h3 className="text-lg sm:text-2xl font-semibold">
            {capitalizeString(category.heading)}
          </h3>
          <div className="flex pt-3">
            {category.badges.map((type, index) => (
              <div className="bg-black max-w-fit rounded mr-3" key={index}>
                <div className="px-2 py-0.5 text-white text-[10px]">
                  {capitalizeString(type)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      ))}
    </Card>
  );
}
