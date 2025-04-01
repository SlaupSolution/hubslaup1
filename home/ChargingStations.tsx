import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChargingStation } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ChargingStations = () => {
  // Fetch charging stations from API
  const { data: stations, isLoading } = useQuery<ChargingStation[]>({
    queryKey: ['/api/charging-stations'],
  });

  // Sample charging stations for initial render
  const sampleStations: ChargingStation[] = [
    {
      id: 1,
      ownerId: 1,
      name: "Estação Shopping Ibirapuera",
      location: "Av. Ibirapuera, 3103",
      city: "São Paulo",
      state: "SP",
      price: 1.2,
      connectorTypes: ["Tipo 2", "CCS"],
      power: 22,
      available: true,
      requiresBooking: false,
      rating: 4.7,
      reviewCount: 23,
      imageUrl: "",
      createdAt: new Date(),
    },
    {
      id: 2,
      ownerId: 2,
      name: "Estação Residencial Pacaembu",
      location: "Rua Itápolis, 300",
      city: "São Paulo",
      state: "SP",
      price: 0.9,
      connectorTypes: ["Tipo 2"],
      power: 11,
      available: true,
      requiresBooking: true,
      rating: 4.9,
      reviewCount: 11,
      imageUrl: "",
      createdAt: new Date(),
    },
    {
      id: 3,
      ownerId: 3,
      name: "Estação Corporativa Berrini",
      location: "Av. Engenheiro Luís Carlos Berrini, 1500",
      city: "São Paulo",
      state: "SP",
      price: 1.5,
      connectorTypes: ["CCS", "CHAdeMO"],
      power: 150,
      available: false,
      requiresBooking: false,
      rating: 4.5,
      reviewCount: 32,
      imageUrl: "",
      createdAt: new Date(),
    },
  ];

  const StationCard = ({ station }: { station: ChargingStation }) => {
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition p-4 flex">
        <div className="bg-blue-50 p-4 rounded-lg mr-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="text-blue-500 h-6 w-6"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M23 8h-6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Z" />
            <path d="M12 20V4" />
            <path d="M17 4V2" />
            <path d="M12 4H1" />
            <path d="M7 16H1" />
            <path d="M7 8H1" />
            <path d="M17 15v2" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{station.name}</h3>
            <span className="text-primary font-bold">
              R$ {station.price.toFixed(2)}
              <span className="text-sm font-normal text-gray-500">/kWh</span>
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {station.location} - {station.city}, {station.state}
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {station.connectorTypes.map((type, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {type}
              </span>
            ))}
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {station.power}kW
            </span>
            {station.available ? (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Disponível
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                Ocupado
              </span>
            )}
            {station.requiresBooking && (
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                Agendamento
              </span>
            )}
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center text-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1 text-amber-500"
                viewBox="0 0 24 24" 
                fill="currentColor" 
                stroke="none"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>{station.rating.toFixed(1)} ({station.reviewCount} avaliações)</span>
            </div>
            <a href="#" className="text-primary font-medium text-sm hover:text-primary-600">
              Ver detalhes
            </a>
          </div>
        </div>
      </div>
    );
  };

  const displayStations = stations || sampleStations;

  return (
    <section id="pontos-recarga" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Pontos de Recarga</h2>
          <p className="text-gray-600 mt-2">
            Encontre ou disponibilize pontos de recarga para veículos elétricos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map section */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md h-[500px] relative">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1578598025768-5c13ecc58baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center">
                <div className="bg-white rounded-xl p-6 max-w-md shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">
                    Mapa interativo de pontos de recarga
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore o mapa para encontrar estações de carregamento próximas à sua localização.
                  </p>
                  <Button className="w-full">
                    Explorar mapa completo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Charging station cards */}
          <div className="space-y-4">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex animate-pulse">
                  <div className="bg-gray-200 p-4 rounded-lg mr-4 h-14 w-14"></div>
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between">
                      <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              displayStations.map((station) => (
                <StationCard key={station.id} station={station} />
              ))
            )}

            <div className="mt-6">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                Ver todos os pontos de recarga
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChargingStations;
