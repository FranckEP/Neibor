import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import TablaPropietarios from "../components/TablaPropietarios";
import { TablaInfo } from "../types";

function parseTablaData(doc: any): TablaInfo {
  const data = doc.data();
  const tipoVal =
    data.tipo === "Torre" || data.tipo === "Etapa" ? data.tipo : "Torre";
  return {
    id: doc.id,
    nombre: data.nombre || "",
    tipo: tipoVal,
    propietarios: Array.isArray(data.propietarios) ? data.propietarios : [],
  };
}

export default function GestionTorresPage() {
  const [accionSeleccionada, setAccionSeleccionada] = useState<
    "agregar" | "gestionar"
  >("gestionar");

  const [tablas, setTablas] = useState<TablaInfo[]>([]);
  const [tablaSeleccionada, setTablaSeleccionada] = useState<TablaInfo | null>(
    null
  );

  const [nombreNuevo, setNombreNuevo] = useState("");
  const [errorNuevo, setErrorNuevo] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tablas_propietarios"),
      (snapshot) => {
        const data = snapshot.docs.map(parseTablaData);
        setTablas(data);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleAgregarTorre = async () => {
    if (!nombreNuevo.trim()) {
      setErrorNuevo("El nombre de la torre es requerido.");
      return;
    }

    // Validación contra torres duplicadas (case insensitive)
    const existeTorre = tablas.some(
      (tabla) => tabla.nombre.toLowerCase() === nombreNuevo.trim().toLowerCase()
    );
    if (existeTorre) {
      setErrorNuevo("Ya existe una torre con ese nombre.");
      return;
    }

    setErrorNuevo("");
    await addDoc(collection(db, "tablas_propietarios"), {
      nombre: nombreNuevo.trim(),
      tipo: "Torre",
      propietarios: [],
    });
    setNombreNuevo("");
    setAccionSeleccionada("gestionar");
  };

  const actualizarTabla = async (tablaActualizada: TablaInfo) => {
    const ref = doc(db, "tablas_propietarios", tablaActualizada.id);
    await updateDoc(ref, {
      propietarios: tablaActualizada.propietarios,
    });
    setTablaSeleccionada(null);
  };

  // Función para eliminar la torre
  const eliminarTorre = async (id: string) => {
    const ref = doc(db, "tablas_propietarios", id);
    await deleteDoc(ref);
  };

  return (
    <div className="flex min-h-screen relative">
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-semibold mb-4 text-[#023047]">
          Gestión de propietarios
        </h1>
        <p className="mb-8">Bienvenido al sistema del conjunto residencial.</p>

        <section>
          {accionSeleccionada === "agregar" && (
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Agregar Nueva Torre
              </h2>
              <input
                type="text"
                placeholder="Nombre de la torre"
                value={nombreNuevo}
                onChange={(e) => setNombreNuevo(e.currentTarget.value)}
                className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errorNuevo && (
                <p className="mb-4 text-red-600 font-medium text-center">
                  {errorNuevo}
                </p>
              )}
              <button
                onClick={handleAgregarTorre}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Agregar Torre
              </button>
              <button
                onClick={() => setAccionSeleccionada("gestionar")}
                className="mt-4 w-full px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            </div>
          )}

          {accionSeleccionada === "gestionar" && (
            <>
              {tablaSeleccionada ? (
                <TablaPropietarios
                  tabla={tablaSeleccionada}
                  onVolver={() => setTablaSeleccionada(null)}
                  onActualizar={actualizarTabla}
                  onEliminar={eliminarTorre} // Pasamos la función de eliminación
                />
              ) : (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-center">
                    Torres Existentes
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tablas.map((tabla) => (
                      <div
                        key={tabla.id}
                        role="button"
                        tabIndex={0}
                        className="p-6 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => setTablaSeleccionada(tabla)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") setTablaSeleccionada(tabla);
                        }}
                      >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {tabla.nombre}
                        </h3>
                        <p className="text-gray-600">{tabla.tipo}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </main>

      <button
        onClick={() => setAccionSeleccionada("agregar")}
        aria-label="Agregar nueva torre"
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl font-bold 
        hover:bg-blue-700 group transition"
        type="button"
      >
        +
        <span className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 pointer-events-none group-hover:opacity-100 transition">
          Agregar nueva torre
        </span>
      </button>
    </div>
  );
}
