import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Driver } from '../../types';

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  cpf: z.string().min(11, 'CPF inválido'),
  cnh_number: z.string().min(5, 'CNH obrigatória'),
  cnh_category: z.enum(['A', 'B', 'C', 'D', 'E']),
  phone: z.string().nullable(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<Driver>;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

export function DriverForm({ defaultValues, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as FormData,
  });

  const inputCls = (hasError?: boolean) =>
    `w-full border rounded-lg px-3 py-2 text-sm outline-none transition
    ${hasError ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-2 focus:ring-blue-300'}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input {...register('name')} className={inputCls(!!errors.name)} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
          <input {...register('cpf')} placeholder="000.000.000-00" className={inputCls(!!errors.cpf)} />
          {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <input {...register('phone')} placeholder="(00) 00000-0000" className={inputCls()} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nº CNH</label>
          <input {...register('cnh_number')} className={inputCls(!!errors.cnh_number)} />
          {errors.cnh_number && <p className="text-red-500 text-xs mt-1">{errors.cnh_number.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select {...register('cnh_category')} className={inputCls(!!errors.cnh_category)}>
            {['A', 'B', 'C', 'D', 'E'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
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