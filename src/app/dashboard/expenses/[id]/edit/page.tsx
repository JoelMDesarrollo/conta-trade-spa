"use client";
import EditVoucher from "@/modules/shared/components/EditVoucher";
import { VoucherType } from "@/modules/shared/types/sharedTypes";

export default function EditExpensePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return (
    <div className="px-5">
      <h2 className="text-lg font-bold">Formulario para editar Egreso {id}</h2>
      <EditVoucher id={id} type={VoucherType.EXPENSE} />
    </div>
  );
}
