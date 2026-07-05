import { api } from "../api";
import type { ProcurementsDTO } from "../dtos/DTOS";

export class ProcurementService {
    constructor(){}

    getAll = async (): Promise<ProcurementsDTO[]> => {
        const response = await api.get("/procurements");
        return response.data
    }

    getById = async (id: number): Promise<ProcurementsDTO> => {
        const response = await api.get(`/procurements/${id}`);
        return response.data
    }

    search = async (
        date: string, 
        customerId: number | null, 
        uf: string | null, 
        pncpId: string | null,
    ): Promise<ProcurementsDTO[]> => {
        const response = await api.get("/procurements/search", {params: {
            date: date,
            c: customerId,
            uf: uf,
            pncp: pncpId
        }})
        return response.data
    }

    changeStatus = async (id: number, status: string): Promise<ProcurementsDTO> => {
        const response = await api.put(`/procurements/${id}/status/${status}`);
        return response.data
    }

    deleteAllDiscard = async (): Promise<void> => {
        return await api.delete("/procurements/discards");
    }
}