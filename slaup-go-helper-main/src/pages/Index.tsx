import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, Gift, Wrench, Coffee } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Logo */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <img
                src="/lovable-uploads/71d018dd-b145-4a89-85dd-472b3f07abf5.png"
                alt="Slaup Go Logo"
                className="h-12 w-auto"
              />
              <div className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Início
                </Link>
                <Link to="/items" className="text-gray-600 hover:text-primary">
                  Itens
                </Link>
                <Link to="/register" className="text-gray-600 hover:text-primary">
                  Cadastrar
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Compartilhe e Troque de Forma Sustentável
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Uma plataforma para troca gratuita de produtos, serviços e alimentos na sua região
            </p>
            <Link to="/items">
              <Button size="lg" className="text-lg">
                Ver Itens Disponíveis
              </Button>
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Categorias</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Alimentos</h3>
                <p className="text-gray-600 text-center">Compartilhe alimentos frescos e preparados</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Produtos</h3>
                <p className="text-gray-600 text-center">Troque itens que não usa mais</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Serviços</h3>
                <p className="text-gray-600 text-center">Ofereça suas habilidades</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Coffee className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Experiências</h3>
                <p className="text-gray-600 text-center">Compartilhe momentos especiais</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">Encontre um Item</h3>
                <p className="text-gray-600">Navegue pelos itens disponíveis na sua região</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">Gere um Código</h3>
                <p className="text-gray-600">Receba um código único de 6 dígitos</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">Faça a Troca</h3>
                <p className="text-gray-600">Use o código para retirar seu item no local combinado</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Sobre o Slaup Go</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600 mb-6">
                O Slaup Go é uma plataforma que conecta pessoas interessadas em compartilhar recursos de forma sustentável. 
                Nossa missão é criar uma comunidade baseada na troca, reduzindo o desperdício e promovendo o consumo consciente.
              </p>
              <p className="text-gray-600">
                Através do nosso sistema único de códigos, garantimos que as trocas sejam seguras e eficientes. 
                Junte-se a nós nessa jornada de transformação social e ambiental.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Slaup Go. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;