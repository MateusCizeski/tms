import { useEffect, useState, useCallback } from "react";
import { driversService } from "../services/drivers";
import type { Driver } from "../types";
import { Modal } from "../components/ui/Modal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { DriverForm } from "../components/forms/DriverForm";
import toast from "react-hot-toast";

export function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Driver | null>(null);
  const [toggleTarget, setToggleTarget] = useState<Driver | null>(null);

  const load = useCallback(() => {
    driversService.getAll().then(setDrivers);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(
    data: Omit<Driver, "id" | "created_at" | "updated_at" | "is_active">,
  ) {
    if (editTarget) {
      await driversService.update(editTarget.id, data);
      toast.success("Motorista atualizado!");
    } else {
      await driversService.create(data);
      toast.success("Motorista cadastrado!");
    }
    setModalOpen(false);
    setEditTarget(null);
    load();
  }

  async function handleToggle() {
    if (!toggleTarget) return;
    await driversService.toggleActive(toggleTarget.id);
    toast.success(
      `Motorista ${toggleTarget.is_active ? "inativado" : "ativado"}!`,
    );
    setToggleTarget(null);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Motoristas</h1>
        <button
          onClick={() => {
            setEditTarget(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          + Novo Motorista
        </button>
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              {[
                "Nome",
                "CPF",
                "Nº CNH",
                "Categoria",
                "Telefone",
                "Status",
                "Ações",
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {drivers.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{d.name}</td>
                <td className="px-4 py-3 text-gray-500">{d.cpf}</td>
                <td className="px-4 py-3">{d.cnh_number}</td>
                <td className="px-4 py-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded font-mono text-xs">
                    {d.cnh_category}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{d.phone ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${d.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {d.is_active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditTarget(d);
                        setModalOpen(true);
                      }}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setToggleTarget(d)}
                      className={`text-xs hover:underline ${d.is_active ? "text-red-500" : "text-green-600"}`}
                    >
                      {d.is_active ? "Inativar" : "Ativar"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {drivers.map((d) => (
          <div key={d.id} className="bg-white rounded-xl shadow p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-800">{d.name}</p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold
                ${d.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {d.is_active ? "Ativo" : "Inativo"}
              </span>
            </div>
            <div className="text-xs text-gray-500 space-y-0.5">
              <p>CPF: {d.cpf}</p>
              <p>
                CNH: {d.cnh_number} — Cat.{" "}
                <span className="font-mono font-bold">{d.cnh_category}</span>
              </p>
              {d.phone && <p>Tel: {d.phone}</p>}
            </div>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => {
                  setEditTarget(d);
                  setModalOpen(true);
                }}
                className="text-blue-600 hover:underline text-xs"
              >
                Editar
              </button>
              <button
                onClick={() => setToggleTarget(d)}
                className={`text-xs hover:underline ${d.is_active ? "text-red-500" : "text-green-600"}`}
              >
                {d.is_active ? "Inativar" : "Ativar"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal
          title={editTarget ? "Editar Motorista" : "Novo Motorista"}
          onClose={() => {
            setModalOpen(false);
            setEditTarget(null);
          }}
        >
          <DriverForm
            defaultValues={editTarget ?? undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setModalOpen(false);
              setEditTarget(null);
            }}
          />
        </Modal>
      )}

      {toggleTarget && (
        <ConfirmDialog
          message={`Deseja ${toggleTarget.is_active ? "inativar" : "ativar"} o motorista "${toggleTarget.name}"?`}
          onConfirm={handleToggle}
          onCancel={() => setToggleTarget(null)}
        />
      )}
    </div>
  );
}
