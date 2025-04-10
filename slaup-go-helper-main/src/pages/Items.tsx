import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/ItemCard";
import { Navbar } from "@/components/Navbar";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data para os itens
const mockItems = [
  {
    id: "1",
    title: "Livros de Programação",
    description: "Coleção de livros sobre React e TypeScript em ótimo estado",
    type: "product" as const,
    location: "São Paulo, SP",
    code: "ABC123",
    createdAt: new Date(),
    available: true,
  },
  {
    id: "2",
    title: "Aulas de Inglês",
    description: "Ofereço 2 horas de aula de inglês para iniciantes",
    type: "service" as const,
    location: "Rio de Janeiro, RJ",
    code: "DEF456",
    createdAt: new Date(),
    available: true,
  },
  {
    id: "3",
    title: "Cesta de Frutas",
    description: "Frutas frescas da estação",
    type: "food" as const,
    location: "Curitiba, PR",
    code: "GHI789",
    createdAt: new Date(),
    available: true,
  },
];

export default function Items() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Itens Disponíveis</h1>
          <Button
            onClick={() => navigate("/register")}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2" />
            Cadastrar Item
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}