import { Button } from "@/components/ui/button";

const CallToAction = () => {
  const scrollToWaitlist = () => {
    const waitlistElement = document.getElementById('waitlist-form');
    if (waitlistElement) {
      waitlistElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para revolucionar a mobilidade elétrica?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Junte-se à Slaup Hub e faça parte da maior comunidade de mobilidade elétrica compartilhada do Brasil.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              onClick={scrollToWaitlist}
              className="px-8 py-6 h-auto text-base"
            >
              Entre na lista de espera
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-6 h-auto text-base"
            >
              Saiba mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
