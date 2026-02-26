import api from './api';
import type { Driver } from '../types';

export const driversService = {
  getAll: () =>
    api.get<Driver[]>('/drivers').then((r) => r.data),

  create: (data: Omit<Driver, 'id' | 'created_at' | 'updated_at' | 'is_active'>) =>
    api.post<Driver>('/drivers', data).then((r) => r.data),

  update: (id: number, data: Partial<Driver>) =>
    api.put<Driver>(`/drivers/${id}`, data).then((r) => r.data),

  toggleActive: (id: number) =>
    api.patch<Driver>(`/drivers/${id}/toggle-active`).then((r) => r.data),
};