import { useEffect, useState } from "react";
import type { CustomerDTO } from "../dtos/DTOS";
import { CustomerService } from "../services/customerService";

export function useCustomersById(id: string | undefined) {
    const [customer, setCustomer] = useState<CustomerDTO | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const customerService = new CustomerService()

    useEffect(() => {
        const getData = async () => {
            if(id === undefined) {
                return;
            }

            try{
                setIsLoading(true)
                const data = await customerService.getById(id)
                setCustomer(data)
            } catch(error){
                setError("Erro ao buscar o cliente.")
            } finally {
                setIsLoading(false)
            }
        }

        getData()
    }, [id])

    return { customer, isLoading, error };
}