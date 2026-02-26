import { useEffect, useState, useCallback } from 'react';
import { ordersService } from '../services/transportOrders';
import { driversService } from '../services/drivers';
import type { Driver, TransportOrder, PaginatedResponse } from '../types';
import { StatusBadge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { OrderForm } from '../components/forms/OrderForm';
import { STATUS_NEXT_LABEL, formatDate } from '../utils/formatters';
import toast from 'react-hot-toast';

export function Orders() {
  const [paged, setPaged] = useState<PaginatedResponse<TransportOrder> | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDriver, setFilterDriver] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TransportOrder | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TransportOrder | null>(null);

  const load = useCallback(() => {
    ordersService.getAll({
      status: filterStatus || undefined,
      driver_id: filterDriver ? Number(filterDriver) : undefined,
      page,
    }).then(setPaged);
  }, [filterStatus, filterDriver, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { driversService.getAll().then(setDrivers); }, []);

  async function handleSubmit(data: Partial<TransportOrder>) {
    if (editTarget) {
      await ordersService.update(editTarget.id, data);
      toast.success('Ordem atualizada!');
    } else {
      await ordersService.create(data);
      toast.success('Ordem criada!');
    }
    setModalOpen(false);
    setEditTarget(null);
    load();
  }

  async function handleAdvance(order: TransportOrder) {
    await ordersService.advanceStatus(order.id);
    toast.success('Status avançado!');
    load();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await ordersService.delete(deleteTarget.id);
    toast.success('Ordem excluída!');
    setDeleteTarget(null);
    load();
  }

  const orders = paged?.data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ordens de Transporte</h1>
        <button
          onClick={() => { setEditTarget(null); setModalOpen(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          + Nova Ordem
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Todos os status</option>
          <option value="pending">Pendente</option>
          <option value="collecting">Em Coleta</option>
          <option value="collected">Coletado</option>
          <option value="delivering">Em Entrega</option>
          <option value="delivered">Entregue</option>
        </select>

        <select
          value={filterDriver}
          onChange={(e) => { setFilterDriver(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Todos os motoristas</option>
          {drivers.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              {['Nº Ordem', 'Motorista', 'Origem', 'Destino', 'Peso (kg)', 'Data', 'Status', 'Ações'].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-blue-600">{order.order_number}</td>
                <td className="px-4 py-3">{order.driver?.name ?? '—'}</td>
                <td className="px-4 py-3 max-w-[140px] truncate">{order.origin_address}</td>
                <td className="px-4 py-3 max-w-[140px] truncate">{order.destination_address}</td>
                <td className="px-4 py-3">{order.weight_kg ?? '—'}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(order.scheduled_date)}</td>
                <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => { setEditTarget(order); setModalOpen(true); }}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      Editar
                    </button>
                    {STATUS_NEXT_LABEL[order.status] && (
                      <button
                        onClick={() => handleAdvance(order)}
                        className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-2 py-0.5 rounded"
                      >
                        {STATUS_NEXT_LABEL[order.status]}
                      </button>
                    )}
                    {order.status === 'pending' && (
                      <button
                        onClick={() => setDeleteTarget(order)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Excluir
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paged && paged.last_page > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {Array.from({ length: paged.last_page }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition
                ${p === paged.current_page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal
          title={editTarget ? 'Editar Ordem' : 'Nova Ordem'}
          onClose={() => { setModalOpen(false); setEditTarget(null); }}
        >
          <OrderForm
            defaultValues={editTarget ?? undefined}
            drivers={drivers}
            onSubmit={handleSubmit}
            onCancel={() => { setModalOpen(false); setEditTarget(null); }}
          />
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Excluir a ordem "${deleteTarget.order_number}"? Esta ação é irreversível.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}