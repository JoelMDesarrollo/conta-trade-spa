"use client";
import Select from "react-select";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import axios from "axios";

export default function BalanceAmountsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });
  const [fileLink, setFileLink] = useState<string | null>(null);

  const handleClick = async () => {
    if (date?.from && date?.to) {
      try {
        const response = await axios.get('http://localhost:5050/api/Report/BalanceAmounts', {
          params: {
            InitDate: format(date.from, "yyyy/MM/dd"),
            EndDate: format(date.to, "yyyy/MM/dd"),
          },
          responseType: 'text', // Asegura que axios maneje la respuesta como texto plano
        });

        if (response.data) {
          setFileLink(response.data); // Almacenar directamente el texto plano como enlace
        }
      } catch (error) {
        console.error("Error al generar el reporte", error);
      }
    }
  };

  return (
    <div>
      <h1>Balance de Sumas y Saldos PDF</h1>
      <div className={cn("grid gap-2")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button onClick={handleClick}>Generar Reporte PDF</Button>
      {fileLink && (
        <a href={fileLink} target="_blank" rel="noopener noreferrer" download>
          Descargar Reporte PDF
        </a>
      )}
    </div>
  );
}
