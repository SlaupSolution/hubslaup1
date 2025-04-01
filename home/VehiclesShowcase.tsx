import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Vehicle } from "@shared/schema";
import { cn } from "@/lib/utils";

const VehiclesShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch vehicles from API
  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ['/api/vehicles'],
  });

  const filteredVehicles = vehicles?.filter(vehicle => {
    if (activeFilter === 'all') return true;
    return vehicle.type.toLowerCase() === activeFilter;
  });

  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
        <div className="relative">
          <img 
            src={vehicle.imageUrl || "https://images.unsplash.com/photo-1633280966543-3aa9d0b23858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
            alt={`${vehicle.brand} ${vehicle.model}`} 
            className="h-48 w-full object-cover"
          />
          <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            {vehicle.available ? "Disponível" : "Indisponível"}
          </span>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{vehicle.brand} {vehicle.model}</h3>
            <span className="text-lg font-bold text-primary">
              R$ {vehicle.price}<span className="text-sm font-normal text-gray-500">/dia</span>
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{vehicle.city}, {vehicle.state}</span>
            <span className="mx-2">•</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1 text-amber-500"
              viewBox="0 0 24 24" 
              fill="currentColor" 
              stroke="none"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>
              {vehicle.rating ? `${vehicle.rating.toFixed(1)} (${vehicle.reviewCount} avaliações)` : 'Sem avaliações'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-2 text-blue-500"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 16V8a5 5 0 0 1 10 0v8" />
                <path d="M18 8h1a2 2 0 0 1 2 2v1" />
                <path d="M21 15v-2a2 2 0 0 0-2-2h-1" />
                <path d="M3 8h1a2 2 0 0 1 2 2v1" />
                <path d="M8 15v-2a2 2 0 0 0-2-2H5" />
              </svg>
              <span>{vehicle.range} km autonomia</span>
            </div>
            <div className="flex items-center text-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-2 text-blue-500"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center text-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-2 text-blue-500"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                <path d="M7 7h.01" />
              </svg>
              <span>{vehicle.features?.[0] || "Ar-condicionado"}</span>
            </div>
            <div className="flex items-center text-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-2 text-blue-500"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>{vehicle.seats} lugares</span>
            </div>
          </div>

          <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
            Ver detalhes
          </Button>
        </div>
      </div>
    );
  };

  // Sample vehicles for initial render
  const sampleVehicles: Vehicle[] = [
    {
      id: 1,
      ownerId: 1,
      type: "car",
      brand: "Tesla",
      model: "Model 3",
      year: 2022,
      range: 459,
      price: 350,
      location: "Avenida Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      available: true,
      rating: 4.9,
      reviewCount: 12,
      seats: 5,
      features: ["Piloto automático"],
      imageUrl: "https://images.unsplash.com/photo-1633280966543-3aa9d0b23858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      createdAt: new Date(),
    },
    {
      id: 2,
      ownerId: 2,
      type: "car",
      brand: "Volvo",
      model: "XC40 Recharge",
      year: 2023,
      range: 418,
      price: 420,
      location: "Rua Oscar Freire, 500",
      city: "São Paulo",
      state: "SP",
      available: true,
      rating: 4.8,
      reviewCount: 7,
      seats: 5,
      features: ["AWD"],
      imageUrl: "https://images.unsplash.com/photo-1642706454725-61d97a1fb078?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      createdAt: new Date(),
    },
    {
      id: 3,
      ownerId: 3,
      type: "motorcycle",
      brand: "Zero",
      model: "SR/F",
      year: 2022,
      range: 200,
      price: 180,
      location: "Avenida Atlântica, 2000",
      city: "Rio de Janeiro",
      state: "RJ",
      available: true,
      rating: 5.0,
      reviewCount: 5,
      seats: 1,
      features: ["Modos de pilotagem"],
      imageUrl: "https://images.unsplash.com/photo-1644896585587-d9dbc089fae8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      createdAt: new Date(),
    },
  ];

  const displayVehicles = filteredVehicles || sampleVehicles;

  return (
    <section id="veiculos" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Veículos Disponíveis</h2>
            <p className="text-gray-600 mt-2">
              Conheça alguns dos veículos que estarão disponíveis na plataforma
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            {[
              { id: "all", label: "Todos" },
              { id: "car", label: "Carros" },
              { id: "motorcycle", label: "Motos" },
              { id: "scooter", label: "Scooters" },
            ].map((filter) => (
              <button
                key={filter.id}
                className={cn(
                  "px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white shadow-sm",
                  activeFilter === filter.id && "bg-primary/10 border-primary text-primary"
                )}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle cards grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md h-[420px] animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center text-primary font-medium hover:text-primary-600">
            Ver todos os veículos
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default VehiclesShowcase;
