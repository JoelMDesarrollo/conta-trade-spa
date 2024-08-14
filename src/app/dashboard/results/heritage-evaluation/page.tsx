"use client";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeritageEvaluationPage() {
  const [gestionInit, setGestionInit] = useState<number | "">(2022);
  const [inSus, setInSus] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(6.97);
  const [date, setDate] = useState<string>("2024-02-20");
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [documentLink, setDocumentLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/api/Ufv/update-accounts", {
        inSus,
        exchangeRate,
        date,
      });
      const response = await axios.get(`/api/Report/HeritageEvaluation`, {
        params: {
          gestionInit,
          endDate: date,
          inSus,
        },
        responseType: "text",
      });

      setDocumentLink(response.data);
      setShowDialog(true);
    } catch (error) {
      console.error("Error al enviar o recibir datos", error);
      alert("Error al procesar la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="gestionInit" className="block text-sm font-medium">
            Gestión Inicial
          </label>
          <Input
            id="gestionInit"
            type="number"
            value={gestionInit}
            onChange={(e) => setGestionInit(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="inSus" className="block text-sm font-medium">
            En Sus
          </label>
          <Input
            id="inSus"
            type="checkbox"
            checked={inSus}
            onChange={(e) => setInSus(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="exchangeRate" className="block text-sm font-medium">
            Tasa de Cambio
          </label>
          <Input
            id="exchangeRate"
            type="number"
            step="0.01"
            value={exchangeRate}
            onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium">
            Fecha
          </label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Generar Reporte"}
        </Button>
      </form>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className="hidden">
            Mostrar Enlace
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enlace del Documento</DialogTitle>
            <DialogDescription>
              Puedes descargar el documento generado a continuación:
            </DialogDescription>
          </DialogHeader>
          {documentLink && (
            <a href={documentLink} target="_blank" rel="noopener noreferrer">
              Descargar Documento
            </a>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
