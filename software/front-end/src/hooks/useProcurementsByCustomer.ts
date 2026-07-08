import { useEffect, useState } from "react";
import type { ProcurementsDTO } from "../dtos/DTOS";
import { CustomerService } from "../services/customerService";

export const useProcurementsByCustomer = (customerId: number | string) => {
    const [procurements, setProcurements] = useState<ProcurementsDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const customerService = new CustomerService()

    useEffect(() => {
        const getData = async () => {
            if(customerId === undefined) {
                return;
            }

            try {
                setIsLoading(true);
                const data = await customerService.getAllProcurementByCustomer(customerId)
                setProcurements(data)
            } catch(er){
                setError("Error ao buscar os editais do cliente");
            } finally {
                setIsLoading(false);
            }
        }

        getData()
    }, [customerId])

    return { procurements, isLoading, error };
}