import api from './api';
import type { TransportOrder, PaginatedResponse, DashboardData } from '../types';

interface OrderFilters {
  status?: string;
  driver_id?: number;
  page?: number;
}

export const ordersService = {
  getAll: (filters?: OrderFilters) =>
    api.get<PaginatedResponse<TransportOrder>>('/transport-orders', { params: filters }).then((r) => r.data),

  getDashboard: () =>
    api.get<DashboardData>('/dashboard').then((r) => r.data),

  create: (data: Partial<TransportOrder>) =>
    api.post<TransportOrder>('/transport-orders', data).then((r) => r.data),

  update: (id: number, data: Partial<TransportOrder>) =>
    api.put<TransportOrder>(`/transport-orders/${id}`, data).then((r) => r.data),

  advanceStatus: (id: number) =>
    api.patch<TransportOrder>(`/transport-orders/${id}/advance`).then((r) => r.data),

  delete: (id: number) =>
    api.delete(`/transport-orders/${id}`),
};