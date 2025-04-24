/*import { useAuth } from '../context/AuthContext';*/
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function Home() {
  /*const { user, role } = useAuth();*/
  const [stats, setStats] = useState({
    totalRecaudado: 1250000,
    apartamentosAlDia: 24,
    totalGastos: 780000,
    luzRecaudo: 80,
  });

  return (
    <div className="flex min-h-screen bg-[#E0F7FA] text-[#023047]">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Bienvenido, 
        </h1> 

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Total Recaudado" value={`$${stats.totalRecaudado.toLocaleString()}`} color="text-[#219EBC]" />
          <Card title="Aptos al Día" value={stats.apartamentosAlDia} color="text-[#FB8500]" />
          <Card title="Gastos" value={`$${stats.totalGastos.toLocaleString()}`} color="text-[#FFB703]" />
          <Card title="% Luz Recaudada" value={`${stats.luzRecaudo}%`} color="text-[#8ECAE6]" />
        </div>
      </main>
    </div>
  );
}

const Card = ({ title, value, color }: { title: string, value: string | number, color: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow text-center">
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);
