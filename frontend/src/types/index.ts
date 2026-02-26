export type CnhCategory = 'A' | 'B' | 'C' | 'D' | 'E';

export type OrderStatus =
  | 'pending'
  | 'collecting'
  | 'collected'
  | 'delivering'
  | 'delivered';

export interface Driver {
  id: number;
  name: string;
  cpf: string;
  cnh_number: string;
  cnh_category: CnhCategory;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TransportOrder {
  id: number;
  order_number: string;
  driver_id: number;
  driver: Driver;
  origin_address: string;
  destination_address: string;
  cargo_description: string;
  weight_kg: number | null;
  status: OrderStatus;
  scheduled_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface DashboardData {
  totals: {
    total: number;
    pending: number;
    in_progress: number;
    delivered: number;
  };
  latest: TransportOrder[];
}