import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Driver, TransportOrder } from '../../types';

const schema = z.object({
  driver_id: z.coerce.number().min(1, 'Selecione um motorista'),
  origin_address: z.string().min(5, 'Endereço obrigatório'),
  destination_address: z.string().min(5, 'Endereço obrigatório'),
  cargo_description: z.string().min(3, 'Descrição obrigatória'),
  weight_kg: z.string().transform((value) => {
    if (value.trim() === '') return null;
    return Number(value);
  }).refine((val) => val === null || val > 0, {
    message: 'Peso deve ser maior que zero',
  }),
  scheduled_date: z.string().min(1, 'Data obrigatória'),
  notes: z.string().nullable(),
});

type FormData = z.output<typeof schema>;

interface Props {
  defaultValues?: Partial<TransportOrder>;
  drivers: Driver[];
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

export function OrderForm({ defaultValues, drivers, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof schema>,
    any,
    z.output<typeof schema>
  >({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultValues,
      weight_kg: defaultValues?.weight_kg?.toString() ?? '',
      scheduled_date: defaultValues?.scheduled_date?.slice(0, 10),
    },
  });

  const inputCls = (hasError?: boolean) =>
    `w-full border rounded-lg px-3 py-2 text-sm outline-none transition
    ${hasError ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-2 focus:ring-blue-300'}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Motorista</label>
        <select {...register('driver_id')} className={inputCls(!!errors.driver_id)}>
          <option value="">Selecione...</option>
          {drivers.filter((d) => d.is_active).map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        {errors.driver_id && <p className="text-red-500 text-xs mt-1">{errors.driver_id.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de Origem</label>
        <input {...register('origin_address')} className={inputCls(!!errors.origin_address)} />
        {errors.origin_address && <p className="text-red-500 text-xs mt-1">{errors.origin_address.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de Destino</label>
        <input {...register('destination_address')} className={inputCls(!!errors.destination_address)} />
        {errors.destination_address && <p className="text-red-500 text-xs mt-1">{errors.destination_address.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição da Carga</label>
        <textarea {...register('cargo_description')} rows={2} className={inputCls(!!errors.cargo_description)} />
        {errors.cargo_description && <p className="text-red-500 text-xs mt-1">{errors.cargo_description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
          <input type="number" step="0.01" {...register('weight_kg')} className={inputCls()} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data Agendada</label>
          <input type="date" {...register('scheduled_date')} className={inputCls(!!errors.scheduled_date)} />
          {errors.scheduled_date && <p className="text-red-500 text-xs mt-1">{errors.scheduled_date.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
        <textarea {...register('notes')} rows={2} className={inputCls()} />
      </div>

      <div className="flex gap-3 pt-2 justify-end">
        <button type="button" onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
          Cancelar
        </button>
        <button type="submit" disabled={isSubmitting}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm disabled:opacity-60">
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}