import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Stat {
  name: string;
  value: number;
}

interface StatsCardProps {
  stats: Stat[];
  className?: string;
}

export default function StatsCard({ stats, className }: StatsCardProps) {
  return (
    <>
      <Card className={`${className}`}>
        {stats.map((stat, index) => (
          <CardContent key={index} className="px-8 py-1.5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xl">{stat.name}</h3>
              <Progress value={stat.value} />
            </div>
          </CardContent>
        ))}
      </Card>
    </>
  );
}
