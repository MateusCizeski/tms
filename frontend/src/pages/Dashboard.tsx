import { useEffect, useState } from 'react';
import { ordersService } from '../services/transportOrders';
import type { DashboardData, TransportOrder } from '../types';
import { StatusBadge } from '../components/ui/Badge';
import { formatDate } from '../utils/formatters';

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`rounded-xl p-5 text-white ${color} shadow`}>
      <p className="text-sm opacity-80">{label}</p>
      <p className="text-4xl font-bold mt-1">{value}</p>
    </div>
  );
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    ordersService.getDashboard().then(setData);
  }, []);

  if (!data) return <p className="text-gray-500">Carregando...</p>;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total de Ordens" value={data.totals.total} color="bg-gray-700" />
        <StatCard label="Pendentes" value={data.totals.pending} color="bg-yellow-500" />
        <StatCard label="Em Andamento" value={data.totals.in_progress} color="bg-blue-500" />
        <StatCard label="Entregues" value={data.totals.delivered} color="bg-green-500" />
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-gray-700">Últimas 10 Ordens</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                {['Nº Ordem', 'Motorista', 'Origem', 'Destino', 'Data', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.latest.map((order: TransportOrder) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">{order.order_number}</td>
                  <td className="px-4 py-3">{order.driver?.name ?? '—'}</td>
                  <td className="px-4 py-3 max-w-[160px] truncate">{order.origin_address}</td>
                  <td className="px-4 py-3 max-w-[160px] truncate">{order.destination_address}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(order.scheduled_date)}</td>
                  <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}