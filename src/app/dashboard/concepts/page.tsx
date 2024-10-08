import { Button } from "@/components/ui/button";
import ListConcepts from "@/modules/concepts/components/ListConcepts";
import Link from "next/link";

export default function ConceptsPage() {
  return (
    <main>
      <Button asChild>
        <Link href="/dashboard/concepts/new">Nuevo Concepto</Link>
      </Button>
      <ListConcepts/>
    </main>
  )
}
