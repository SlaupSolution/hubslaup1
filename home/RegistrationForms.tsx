import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const RegistrationForms = () => {
  const registrationTypes = [
    {
      type: "vehicle",
      icon: "car",
      title: "Proprietário de Veículo",
      description: "Cadastre seu veículo elétrico e comece a gerar renda extra quando não estiver utilizando.",
      benefits: [
        "Defina sua própria disponibilidade e preços",
        "Seguro completo durante as locações",
        "Receba até R$ 2.000/mês em renda extra",
      ],
      buttonText: "Cadastrar Veículo",
      buttonLink: "/register/owner-vehicle",
      iconBg: "bg-primary-50",
      iconColor: "text-primary",
      buttonClass: "bg-primary hover:bg-primary-600",
    },
    {
      type: "charging-station",
      icon: "charging-station",
      title: "Ponto de Recarga",
      description: "Disponibilize seu ponto de recarga particular e receba por cada kWh utilizado pelos usuários.",
      benefits: [
        "Defina suas próprias tarifas e horários",
        "Sistema de agendamento automático",
        "Visibilidade no mapa da plataforma",
      ],
      buttonText: "Cadastrar Ponto",
      buttonLink: "/register/charging-station",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      buttonClass: "bg-blue-500 hover:bg-blue-600",
    },
    {
      type: "user",
      icon: "user",
      title: "Usuário",
      description: "Utilize veículos elétricos por demanda e encontre pontos de recarga próximos a você.",
      benefits: [
        "Acesso a diversos veículos elétricos",
        "Encontre pontos de recarga no mapa",
        "Reservas e pagamentos simplificados",
      ],
      buttonText: "Criar Conta",
      buttonLink: "/register/user",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      buttonClass: "bg-amber-500 hover:bg-amber-600",
    },
  ];

  return (
    <section id="cadastro" className="py-16 bg-gradient-to-br from-primary/10 to-blue-500/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Cadastre-se na Slaup Hub</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Escolha como você quer participar da maior comunidade de mobilidade elétrica compartilhada do Brasil.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {registrationTypes.map((type) => (
            <div key={type.type} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="p-6">
                <div className={`w-16 h-16 ${type.iconBg} rounded-full flex items-center justify-center mb-4`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`${type.iconColor} h-8 w-8`}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    {type.type === "vehicle" && (
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h1m3.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm8.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    )}
                    {type.type === "charging-station" && (
                      <>
                        <path d="M23 8h-6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Z" />
                        <path d="M12 20V4" />
                        <path d="M17 4V2" />
                        <path d="M12 4H1" />
                        <path d="M7 16H1" />
                        <path d="M7 8H1" />
                        <path d="M17 15v2" />
                      </>
                    )}
                    {type.type === "user" && (
                      <>
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </>
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-2 mb-6">
                  {type.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`${type.iconColor} h-4 w-4 mt-1 mr-2`}
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link href={type.buttonLink}>
                  <Button className={`w-full ${type.buttonClass} text-white font-medium px-4 py-3 h-auto rounded-lg transition`}>
                    {type.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegistrationForms;
