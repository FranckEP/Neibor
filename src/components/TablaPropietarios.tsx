import { useState } from "react";
import { TablaInfo } from "../types";

interface Propietario {
  apartamento: string;
  nombre: string;
  celular: string;
  correo: string;
}

interface Props {
  tabla: TablaInfo;
  onVolver: () => void;
  onActualizar: (tabla: TablaInfo) => Promise<void>;
  onEliminar: (id: string) => Promise<void>;
}

export default function TablaPropietarios({
  tabla,
  onVolver,
  onActualizar,
  onEliminar,
}: Props) {
  const [propietarios, setPropietarios] = useState<Propietario[]>(tabla.propietarios);
  const [nuevo, setNuevo] = useState<Propietario>({
    apartamento: "",
    nombre: "",
    celular: "",
    correo: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Propietario | null>(null);
  const [notificacion, setNotificacion] = useState<string | null>(null); // Estado para la notificación

  const agregar = () => {
    if (!nuevo.apartamento || !nuevo.nombre) return;
    setPropietarios([...propietarios, nuevo]);
    setNuevo({ apartamento: "", nombre: "", celular: "", correo: "" });
  };

  const eliminar = (index: number) => {
    const nuevos = [...propietarios];
    nuevos.splice(index, 1);
    setPropietarios(nuevos);
  };

  const guardarCambios = async () => {
    await onActualizar({ ...tabla, propietarios });
    setNotificacion("Cambios guardados correctamente."); // Mostrar notificación
    setTimeout(() => setNotificacion(null), 3000); // Ocultar notificación después de 3 segundos
  };

  const handleEditarClick = (index: number) => {
    setEditIndex(index);
    setEditData({ ...propietarios[index] });
  };

  const handleGuardarEdit = () => {
    if (editIndex === null || !editData) return;
    const nuevos = [...propietarios];
    nuevos[editIndex] = editData;
    setPropietarios(nuevos);
    setEditIndex(null);
    setEditData(null);
    setNotificacion("Cambios guardados correctamente."); // Mostrar notificación
    setTimeout(() => setNotificacion(null), 3000); // Ocultar notificación después de 3 segundos
  };

  const handleCancelarEdit = () => {
    setEditIndex(null);
    setEditData(null);
  };

  const handleInputChange = (field: keyof Propietario, value: string) => {
    if (!editData) return;
    setEditData({ ...editData, [field]: value });
  };

  const handleEliminarTorre = async () => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta torre?");
    if (confirm) {
      await onEliminar(tabla.id);
      onVolver();
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-1">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-semibold">Torre - {tabla.nombre}</h3>
        <div className="flex gap-2">
          <button
            onClick={onVolver}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
          >
            ← Volver
          </button>
          <button
            onClick={handleEliminarTorre}
            className="px-4 py-2 text-red-600 bg-red-200 rounded-md hover:bg-red-300 transition duration-200"
          >
            Eliminar Torre
          </button>
        </div>
      </div>

      {notificacion && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
          {notificacion}
        </div>
      )}

      <div className="shadow-sm p-6 mb-6 bg-gray-50 rounded-md">
        <div className="flex flex-wrap gap-4 items-end">
          <input
            type="text"
            placeholder="Apartamento"
            value={nuevo.apartamento}
            onChange={(e) => setNuevo({ ...nuevo, apartamento: e.currentTarget.value })}
            className="min-w-[120px] flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Nombre"
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.currentTarget.value })}
            className="min-w-[150px] flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Celular"
            value={nuevo.celular}
            onChange={(e) => setNuevo({ ...nuevo, celular: e.currentTarget.value })}
            className="min-w-[140px] flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Correo"
            value={nuevo.correo}
            onChange={(e) => setNuevo({ ...nuevo, correo: e.currentTarget.value })}
            className="min-w-[180px] flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={agregar}
            className="flex-shrink-0 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Agregar Propietario
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-md overflow-hidden shadow-sm text-sm">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="p-3 border">Apartamento</th>
              <th className="p-3 border">Nombre</th>
              <th className="p-3 border">Celular</th>
              <th className="p-3 border">Correo</th>
              <th className="p-3 border text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {propietarios.map((prop, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50">
                {editIndex === index ? (
                  <>
                    <td className="p-3 border">
                      <input
                        type="text"
                        value={editData?.apartamento || ""}
                        onChange={(e) => handleInputChange("apartamento", e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <input
                        type="text"
                        value={editData?.nombre || ""}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <input
                        type="text"
                        value={editData?.celular || ""}
                        onChange={(e) => handleInputChange("celular", e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <input
                        type="email"
                        value={editData?.correo || ""}
                        onChange={(e) => handleInputChange("correo", e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-3 border text-center space-x-1">
                      <button
                        onClick={handleGuardarEdit}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancelarEdit}
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        Cancelar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3 border">{prop.apartamento}</td>
                    <td className="p-3 border">{prop.nombre}</td>
                    <td className="p-3 border">{prop.celular}</td>
                    <td className="p-3 border">{prop.correo}</td>
                    <td className="p-3 border text-center space-x-1">
                      <button
                        onClick={() => handleEditarClick(index)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminar(index)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={guardarCambios}
        className="mt-6 w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200"
      >
        Guardar Cambios
      </button>
    </div>
  );
}
