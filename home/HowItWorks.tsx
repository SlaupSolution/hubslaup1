import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      icon: "car-side",
      title: "Cadastre seu veículo",
      description:
        "Registre seu carro ou moto elétrica com todas as informações necessárias: modelo, autonomia, fotos e disponibilidade.",
      iconBg: "bg-primary-50",
      iconColor: "text-primary",
    },
    {
      icon: "calendar-alt",
      title: "Defina sua agenda",
      description:
        "Escolha os períodos em que seu veículo ou ponto de recarga estará disponível para locação na plataforma.",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: "money-bill-wave",
      title: "Receba sua renda",
      description:
        "Os pagamentos são processados de forma segura e você recebe diretamente em sua conta os valores das locações.",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Como funciona o Slaup Hub</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Uma plataforma completa para proprietários de veículos elétricos e pontos de recarga que desejam gerar renda extra de forma sustentável.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
              <div className={`w-16 h-16 ${step.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`${step.iconColor} h-8 w-8`}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  {index === 0 && (
                    <>
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h1" />
                      <path d="M6 17h9" />
                      <path d="M18.6 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                      <path d="M6.6 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                      <path d="m15 15-3-3-3 3" />
                      <path d="M15 15v-3h-3" />
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <path d="M12 6v12" />
                      <path d="M8 10a4 4 0 0 1 8 0" />
                      <path d="M8 14a4 4 0 0 0 8 0" />
                      <path d="M18 8c0-2.2-1.8-4-4-4H6" />
                      <path d="M18 16c0 2.2-1.8 4-4 4H6" />
                    </>
                  )}
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-neutral-900 rounded-xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Gere renda extra com seus ativos elétricos
              </h3>
              <p className="text-gray-300 mb-6">
                Proprietários de veículos elétricos e pontos de recarga podem gerar até R$ 2.000 por mês ao disponibilizarem seus recursos na plataforma.
              </p>
              <ul className="space-y-3 text-gray-200">
                {[
                  "Cadastro gratuito e sem mensalidades",
                  "Seguro completo durante as locações",
                  "Verificação completa dos usuários",
                  "Suporte 24/7 para proprietários",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="text-primary h-5 w-5 mr-2"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a href="#cadastro">
                  <Button variant="default" className="flex items-center">
                    Começar agora
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
                  </Button>
                </a>
              </div>
            </div>
            <div
              className="hidden md:block bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1571987502227-9231b837d92a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
