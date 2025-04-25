import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Parte izquierda con imagen */}
      <div className="hidden md:block relative overflow-hidden">
        {" "}
        {/* Set a fixed height */}
        <img
          src="src\assets\background.svg"
          alt="Background"
          className="w-full h-full object-cover" // Ensures the image covers the div
        />
      </div>

      {/* Parte derecha con formulario */}
      <div className="flex items-center justify-center p-6 bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          {/* Logo arriba */}
          <div className="flex justify-center mb-6">
            <img
              src="src\assets\logo.svg"
              alt="Logo Empresa"
              className="h-32 object-contain"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-center text-[#023047]">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full p-2 border border-gray-300 rounded pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#219EBC] text-white py-2 rounded hover:bg-[#023047] transition"
            >
              Ingresar
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-full mt-3 text-sm text-[#023047] underline hover:text-[#FB8500] transition"
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
