import { api } from "../api";
import type { CustomerDTO, ProcurementsDTO, SearchTermDTO } from "../dtos/DTOS";
import type { SearchTermBody } from "../types/SearchTermBody";

export class CustomerService {
    constructor(){}

    getAll = async (): Promise<CustomerDTO[]> => {
        const response = await api.get("/customers");
        return response.data
    }

    getById = async (id: string): Promise<CustomerDTO> => {
        const response = await api.get(`/customers/${id}`);
        return response.data
    }

    createCustomer = async (userId: number, name: string) => {
        const body = {userId, name};
        const response = await api.post("/customers", body);
        return response.data
    }

    getSearchTermsByCustomer = async (customerId: number):Promise<SearchTermDTO[]> => {
        const response = await api.get(`/customers/${customerId}/search-terms`);
        return response.data
    }

    getAllProcurementByCustomer = async (customerId: number | string, discard?: boolean): Promise<ProcurementsDTO[]> => {
        const response = await api.get(`/customers/${customerId}/procurements`, {params: {discard: discard ? discard : false}});
        return response.data
    }

    deleteAllDiscardedProcurements = async (customerId: number): Promise<void> => {
        return await api.delete(`/customers/${customerId}/procurements`);
    }

    getAllTerms = async (): Promise<SearchTermDTO[]> => {
        const response = await api.get("/customers/search-terms");
        return response.data
    }

    getTermById = async (id: number): Promise<SearchTermDTO> => {
        const response = await api.get(`/customers/search-terms/${id}`);
        return response.data
    }

    createTerm = async (customerId: number, terms: SearchTermBody[]): Promise<SearchTermDTO> => {
        const body = {customerId: customerId, terms: terms};
        const response = await api.post(`/customers/${customerId}/search-terms`, body);
        return response.data
    }

    deleteTerm = async (customerId: number, termId: number): Promise<void> => {
        return await api.delete(`/customers/${customerId}/search-terms/${termId}`);
    }
}