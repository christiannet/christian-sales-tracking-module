export interface Sale {
  id: number;
  promoterId: number;
  amount: number;
  description: string;
  saleDate: string;
  createdAt: string;
}

export interface CreateSaleDto {
  promoterId: number;
  amount: number;
  description: string;
  saleDate?: string;
}
