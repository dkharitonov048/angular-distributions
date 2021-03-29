export interface DistributorBase {
    name: string;
    tin: string;
    externalId: string;
    segments: number[],
    regions: number[],
}


export interface DistributorToAdd extends DistributorBase{
    kpp: string;
    legalAddress: string;
    actualAddress: string;
    loadSelloutBeforeDay: number;
    formOfActivityId: number;
}

export interface Distributor extends DistributorBase{
    id: string;
    number: number;
    warehousesCount: number;

    legalAddress: string;
    actualAddress: string;
    loadSelloutBeforeDay: number;
    formOfActivity: FormOfActivity;
    contactPersonId: string;
    contactPersonName: string;
}

interface FormOfActivity {
    value: string;
    id: number;
  }

// todo: move to common
export interface PagedResponse<T>{
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    hasNext: boolean;
    items: T[];
}