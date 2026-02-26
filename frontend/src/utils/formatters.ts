import type { OrderStatus } from '../types';

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendente',
  collecting: 'Em Coleta',
  collected: 'Coletado',
  delivering: 'Em Entrega',
  delivered: 'Entregue',
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  collecting: 'bg-blue-100 text-blue-800',
  collected: 'bg-purple-100 text-purple-800',
  delivering: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
};

export const STATUS_NEXT_LABEL: Record<string, string> = {
  pending: 'Iniciar Coleta',
  collecting: 'Marcar Coletado',
  collected: 'Iniciar Entrega',
  delivering: 'Confirmar Entrega',
};

export function formatDate(dateStr: string): string {
  return dateStr.split('T')[0].split('-').reverse().join('/');
}

export function formatCPF(cpf: string): string {
  return cpf.replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}