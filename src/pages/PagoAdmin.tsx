import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { ChevronDown, CheckCircle, Loader2 } from "lucide-react";
import dayjs from "dayjs";

export default function PagoAdmin() {
  const [torres, setTorres] = useState<string[]>([]);
  const [propietarios, setPropietarios] = useState<any[]>([]);
  const [torreSeleccionada, setTorreSeleccionada] = useState<string>("");
  const [fecha, setFecha] = useState<string>(""); // yyyy-MM
  const [pagos, setPagos] = useState<Record<string, boolean>>({});
  const [cargando, setCargando] = useState(false);

  const obtenerMesAnio = (fechaISO: string) => {
    const d = dayjs(fechaISO);
    return { mes: d.format("MMMM"), anio: d.year() };
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tablas_propietarios"), (snap) => {
      const torresUnicas = snap.docs
        .filter((doc) => doc.data().tipo === "Torre")
        .map((doc) => doc.data().nombre);
      setTorres(torresUnicas);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!torreSeleccionada) return;
    setCargando(true);
    const unsub = onSnapshot(collection(db, "tablas_propietarios"), (snap) => {
      const torre = snap.docs.find(
        (doc) =>
          doc.data().tipo === "Torre" && doc.data().nombre === torreSeleccionada
      );
      if (torre) {
        const data = torre.data();
        setPropietarios(data.propietarios || []);
      } else {
        setPropietarios([]);
      }
      setCargando(false);
    });
    return () => unsub();
  }, [torreSeleccionada]);

  useEffect(() => {
    const fetchPagos = async () => {
      if (!torreSeleccionada || !fecha) return;
      const { mes, anio } = obtenerMesAnio(fecha);
      const docId = `${torreSeleccionada}_${mes}_${anio}`;
      const snapshot = await getDoc(doc(db, "pagos_administracion", docId));
      if (snapshot.exists()) {
        setPagos(snapshot.data().pagos || {});
      } else {
        setPagos({});
      }
    };
    fetchPagos();
  }, [torreSeleccionada, fecha]);

  const togglePago = async (apartamento: string) => {
    const { mes, anio } = obtenerMesAnio(fecha);
    const docId = `${torreSeleccionada}_${mes}_${anio}`;
    const nuevoEstado = !pagos[apartamento];
    const nuevosPagos = { ...pagos, [apartamento]: nuevoEstado };
    await setDoc(
      doc(db, "pagos_administracion", docId),
      { pagos: nuevosPagos },
      { merge: true }
    );
    setPagos(nuevosPagos);
  };

  return (
    <div className="flex min-h-screen relative bg-gray-100">
      <main className="flex-1 p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-[#023047] mb-4">
          Pagos de Administración
        </h1>
        <p className="text-gray-700 mb-6">
          Controla el estado de pago de cada apartamento por torre y mes.
        </p>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex flex-col w-full">
            <label className="font-medium text-sm text-gray-700">Torre</label>
            <select
              value={torreSeleccionada}
              onChange={(e) => setTorreSeleccionada(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Selecciona una torre</option>
              {torres.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium text-sm text-gray-700">
              Mes y Año
            </label>
            <input
              type="month"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
        </div>

        {cargando ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin" size={20} /> Cargando
            propietarios...
          </div>
        ) : (
          <table className="w-full table-auto border mt-4 bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-4 border-b">Apartamento</th>
                <th className="text-left p-4 border-b">Nombre</th>
                <th className="text-left p-4 border-b">Estado de pago</th>
              </tr>
            </thead>
            <tbody>
              {propietarios.map((prop) => (
                <tr
                  key={prop.apartamento}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 border-b">{prop.apartamento}</td>
                  <td className="p-4 border-b">{prop.nombre}</td>
                  <td className="p-4 border-b">
                    <button
                      onClick={() => togglePago(prop.apartamento)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200 ${
                        pagos[prop.apartamento]
                          ? "bg-green-200 text-green-800 hover:bg-green-300"
                          : "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
                      }`}
                    >
                      {pagos[prop.apartamento] ? (
                        <CheckCircle size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                      {pagos[prop.apartamento] ? "Pagado" : "Pendiente"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
