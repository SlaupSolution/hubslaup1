import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
              <span className="text-xl font-bold">Slaup<span className="text-primary">Hub</span></span>
            </div>
            <p className="text-gray-400 mb-4">
              A plataforma que conecta proprietários de veículos elétricos e pontos de recarga com pessoas que buscam mobilidade sustentável.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: "facebook-f", href: "#" },
                { icon: "instagram", href: "#" },
                { icon: "twitter", href: "#" },
                { icon: "linkedin-in", href: "#" },
              ].map((social) => (
                <a 
                  key={social.icon} 
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition"
                  aria-label={`Visit our ${social.icon} page`}
                >
                  <i className={`fab fa-${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Plataforma</h4>
            <ul className="space-y-2">
              {[
                { name: "Como funciona", href: "/#como-funciona" },
                { name: "Proprietários", href: "/#cadastro" },
                { name: "Usuários", href: "/#cadastro" },
                { name: "Pontos de Recarga", href: "/#pontos-recarga" },
                { name: "Cadastre seu veículo", href: "/register/vehicle" },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              {[
                { name: "Central de Ajuda", href: "#" },
                { name: "Contato", href: "#" },
                { name: "Termos de Uso", href: "#" },
                { name: "Política de Privacidade", href: "#" },
                { name: "Segurança", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Receba novidades e atualizações sobre mobilidade elétrica.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-lg transition"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Slaup Hub. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">
              Termos
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">
              Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
