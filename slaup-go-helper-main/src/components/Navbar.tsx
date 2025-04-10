import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Slaup Go
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus size={20} />
            Cadastrar Item
          </Link>
        </div>
      </div>
    </nav>
  );
}