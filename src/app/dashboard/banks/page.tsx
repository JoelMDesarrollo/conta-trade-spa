"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useForm, FormProvider} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Link from "next/link";
import { TableBank } from "@/modules/banks/components/TableBank";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { IIncomeResponse } from "@/modules/income/interface/income";
import { IBank } from "@/modules/banks/interface/banks";
import useToken from "@/modules/shared/hooks/useToken";



function Users() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {token, isTokenReady} = useToken();
  const { data, isLoading, isPending, error } = useQuery({
    queryKey: ["Bank"],
    queryFn: async (): Promise<{ data: IBank[] }> =>
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Bank`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      
    enabled: isTokenReady,
    staleTime: 1000 * 60 * 10,

  });


  if (isLoading || isPending) return "Loading...";

  console.log("ESDATA,",data);
  return (
    <div>
    <h1 className="flex  items-center justify-center font-bold text-3xl">BANCOS</h1>
    
      <section className="px-6">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-semibold"></h2>
          <Link href="/dashboard/banks/new">
            <Button>Nuevo Banco</Button>
          </Link>
        </div>
        <TableBank data={data?.data! ?? []}/>
      </section>
      </div>
    
   
  );
}

export default Users;