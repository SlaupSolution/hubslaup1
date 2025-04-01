import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import teslaImage from "../../assets/tsl.jpeg";

const HeroSection = () => {
  const { toast } = useToast();
  const [waitlistForm, setWaitlistForm] = useState({
    name: "",
    email: "",
    interest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!waitlistForm.name || !waitlistForm.email || !waitlistForm.interest) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/waitlist', waitlistForm);
      
      toast({
        title: "Cadastro realizado!",
        description: "Você entrou na nossa lista de espera. Em breve entraremos em contato.",
      });
      
      setWaitlistForm({
        name: "",
        email: "",
        interest: "",
      });
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível completar seu cadastro. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:pr-12">
            <span className="px-3 py-1 text-xs font-semibold bg-primary text-white rounded-full uppercase tracking-wide">
              Lançamento exclusivo
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Compartilhe seus veículos elétricos e gere renda extra
            </h1>
            <p className="text-lg text-gray-200">
              Slaup Hub conecta proprietários de veículos elétricos e pontos de recarga com pessoas que buscam mobilidade sustentável.
            </p>

            {/* Waitlist form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8" id="waitlist-form">
              <h3 className="text-xl font-semibold mb-4">Entre na lista de espera</h3>
              <p className="text-sm text-gray-200 mb-4">
                Seja um dos primeiros a acessar nossa plataforma quando for lançada.
              </p>

              <form className="space-y-3" onSubmit={handleWaitlistSubmit}>
                <div>
                  <Input
                    type="text"
                    placeholder="Nome completo"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={waitlistForm.name}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={waitlistForm.email}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                  />
                </div>
                <div className="flex space-x-2">
                  <Select
                    value={waitlistForm.interest}
                    onValueChange={(value) => setWaitlistForm({ ...waitlistForm, interest: value })}
                  >
                    <SelectTrigger className="px-4 py-3 h-auto rounded-lg bg-white/20 border border-white/20 text-white focus:ring-2 focus:ring-primary">
                      <SelectValue placeholder="Selecione seu interesse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Quero disponibilizar meu veículo</SelectItem>
                      <SelectItem value="chargingStation">Tenho ponto de recarga</SelectItem>
                      <SelectItem value="user">Quero alugar veículos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary-600 px-6 py-3 h-auto rounded-lg font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </div>
                <p className="text-xs text-gray-300 mt-2">
                  Ao se cadastrar, você concorda com nossos{" "}
                  <a href="#" className="underline">
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a href="#" className="underline">
                    Política de Privacidade
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="rounded-xl shadow-2xl overflow-hidden h-[500px]">
              <img 
                src={teslaImage} 
                alt="Tesla - Carro elétrico sendo carregado" 
                className="object-cover h-full w-full"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-primary h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 22c1.25-1.25 2.5-2.5 3.5-2.5 1.5 0 2.5 1.5 4 1.5 1 0 2-1 3.5-1 1.25 0 2.25 1 3.5 1 .75 0 1.75-1 3.5-1 .75 0 1.25.5 2 1"></path>
                    <path d="M12 7c1.25-1.25 2.5-2 3.5-2 1.5 0 2.5 1 4 1 1 0 2-.5 3.5-.5 1 0 2 .5 3 1"></path>
                    <path d="M20 11.5c.5.5 1.5.5 2 0"></path>
                    <path d="M11 15c.5.5 1.5.5 2 0"></path>
                    <path d="M3 11.5c.5.5 1.5.5 2 0"></path>
                    <line x1="12" y1="7" x2="12" y2="22"></line>
                  </svg>
                </div>
                <div>
                  <p className="text-neutral-900 font-semibold">+2.500 kg</p>
                  <p className="text-sm text-gray-500">CO₂ evitados mensalmente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners logos */}
      <div className="container mx-auto px-4 mt-16">
        <p className="text-center text-sm text-gray-400 mb-6">Confiam em nossa plataforma</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
          {/* Partner logos would go here - using SVG placeholders */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-28 bg-gray-500/20 rounded-sm"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
