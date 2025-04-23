import { Item } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
          <Badge
            variant="secondary"
            className={
              item.type === "food"
                ? "bg-orange-100 text-orange-800"
                : item.type === "service"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }
          >
            {item.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin size={16} />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
          <Clock size={16} />
          <span>
            {new Date(item.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        </div>
        <div className="mt-4 p-2 bg-secondary rounded-md text-center">
          <p className="text-sm text-gray-600">Código para resgate</p>
          <p className="text-lg font-mono font-bold">{item.code}</p>
        </div>
      </CardContent>
    </Card>
  );
}