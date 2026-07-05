export interface UserDTO {
    id: number
    name: string
}

export interface CustomerDTO {
    id: number
    name: string
    searchTerms: SearchTermDTO[]
    procurements: number

}

export interface SearchTermDTO {
    id: number
    term: string
    customerId: number
}

export interface ProcurementsDTO {
    id: number
    pncpId: string
    customerId : number
    customer: string
    description: string
    city: string
    uf: string
    insertDate: string
    openDate: string
    closeDate: string
    cnpj: string
    name:  string
    modalidade: string
    link: string
}