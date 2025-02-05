import { Card, CardContent } from "@/components/ui/card";

interface GeneralDetailsCardProps {
  details: {
    heading: string;
    value: string;
  }[];
  className?: string;
}

export default function GeneralDetailsCard({
  details,
  className,
}: GeneralDetailsCardProps) {
  return (
    <Card className={`${className}`}>
      {details.map((detail, index) => (

      <CardContent key={index}>
        <h3 className="text-2xl font-semibold">{detail.heading}</h3>
        <div className="text-xl pt-2">{detail.value}</div>
      </CardContent>
      ))}
    </Card>
  );
}
