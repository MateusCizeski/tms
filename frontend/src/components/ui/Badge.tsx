import type { OrderStatus } from '../../types';
import { STATUS_COLORS, STATUS_LABELS } from '../../utils/formatters';

interface Props {
  status: OrderStatus;
}

export function StatusBadge({ status }: Props) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}