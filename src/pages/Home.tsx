import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function Home() {
  const pagosData = [
    { mes: 'Ene', pagos: 50 },
    { mes: 'Feb', pagos: 42 },
    { mes: 'Mar', pagos: 55 },
    { mes: 'Abr', pagos: 48 },
    { mes: 'May', pagos: 60 },
  ];

  const estadoData = [
    { name: 'Al día', value: 85 },
    { name: 'Morosos', value: 15 },
  ];

  const reportesData = [
    { mes: 'Ene', reportes: 10 },
    { mes: 'Feb', reportes: 15 },
    { mes: 'Mar', reportes: 8 },
    { mes: 'Abr', reportes: 12 },
    { mes: 'May', reportes: 6 },
  ];

  const consumoData = [
    { mes: 'Ene', agua: 200, luz: 300 },
    { mes: 'Feb', agua: 180, luz: 310 },
    { mes: 'Mar', agua: 190, luz: 320 },
    { mes: 'Abr', agua: 170, luz: 305 },
    { mes: 'May', agua: 210, luz: 330 },
  ];

  const COLORS = ['#219EBC', '#FF6B6B'];

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-semibold mb-4 text-[#023047]">Panel Principal</h1>
        <p className="mb-8">Bienvenido al sistema del conjunto residencial.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pagos por mes */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold text-[#023047] mb-4">Pagos por mes</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pagosData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pagos" fill="#219EBC" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Estado de pagos */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold text-[#023047] mb-4">Estado de pagos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={estadoData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {estadoData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Reportes mensuales */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold text-[#023047] mb-4">Reportes mensuales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reportes" stroke="#FF6B6B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Consumo de servicios */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold text-[#023047] mb-4">Consumo de servicios</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={consumoData}>
                <defs>
                  <linearGradient id="agua" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#219EBC" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#219EBC" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="luz" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFB703" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFB703" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="agua" stroke="#219EBC" fill="url(#agua)" />
                <Area type="monotone" dataKey="luz" stroke="#FFB703" fill="url(#luz)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
