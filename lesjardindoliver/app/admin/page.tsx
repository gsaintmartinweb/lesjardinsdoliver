import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/next-auth-config";
import LogoutButton from "../components/logout-button";
import LoginButton from "../components/login-button";
import Link from "next/link";
import FormUpload from "../components/form-upload";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-10">
        <h1 className="text-gray-800 text-2xl font-bold mb-4 text-center">
          Bienvenue sur la page d&apos;administration
        </h1>
        <p className="text-gray-700 text-lg font-medium mb-6 text-center">
          Veuillez vous connecter pour accéder à cette page.
        </p>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-10">
      <h1 className="text-gray-800 text-2xl font-bold mb-4 text-center">
        Bienvenue sur la page d&apos;administration
      </h1>
      <p className="text-gray-700 text-lg font-medium mb-6 text-center">
        Connecté en tant que:{" "}
        <span className="text-blue-600 font-semibold">{session.user?.name}</span>
      </p>

      <div className="flex flex-col items-center gap-6">
        <LogoutButton />
        <Link
          href="/"
          className="text-blue-600 text-sm font-medium underline hover:text-blue-800 transition"
        >
          Retourner à la page d&apos;accueil
        </Link>
        <Link 
          href="/admin/plantes"
          className="text-blue-600 text-sm font-medium underline hover:text-blue-800 transition"
        >
          Ajouter une plante
        </Link>
      </div>

      
    </div>
  );
};

export default AdminPage;
