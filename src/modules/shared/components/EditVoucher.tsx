"use client"
import { token } from "@/modules/shared/constants/token"
import { useQuery } from "@tanstack/react-query";
import { Voucher, VoucherType } from "../types/sharedTypes";
import axios from "axios";
import FormEditVoucher from "./FormEditVoucher";


type EditVoucherProps = {
  id: string
  type: VoucherType
}

export default function EditVoucher({id,type}: EditVoucherProps) {
  const editVoucherQuery = useQuery({
    queryKey: ["Vouchers", id, type],
    queryFn: async function (): Promise<{ data: Voucher }> {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Voucher?id=${id}&type=${type}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    staleTime: 1000*30*10,
  })

  console.log(editVoucherQuery.data);

  if(editVoucherQuery.isLoading) return <div>Loading..</div>

  return (
    <div>
      <FormEditVoucher type={type} voucher={editVoucherQuery!.data}/>
    </div>
  )
}