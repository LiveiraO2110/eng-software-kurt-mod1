import { useEffect, useState } from "react";
import type { CustomerDTO } from "../dtos/DTOS";
import { UserServices } from "../services/userServices";

export function useCustomersByUser(userId: number){
    const userServices = new UserServices();
    const [customers, setCustomers] = useState<CustomerDTO[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getData = async () => {
            try{
                setIsLoading(true)
                const data = await userServices.getCustomers(userId);
                setCustomers(data)
            } catch(er){
                setError("Error ao buscar os clientes")
            } finally {
                setIsLoading(false)
            }
        }

        getData()
    }, [userId])

    return { customers, isLoading, error }
}