import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Township {
  id: number;
  name: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
  distributions: Distribution[];
}

export interface AidType {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  distributions: Distribution[];
}

export interface FieldWorker {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  distributions: Distribution[];
}

export interface Distribution {
  id: number;
  date: Date;
  quantity: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  townshipId: number;
  aidTypeId: number;
  fieldWorkerId: number;
  aidType: AidType;
  fieldWorker: FieldWorker;
  township: Township;
}

export interface DistributionSummary {
  township: string;
  foodKits: number;
  educationalMaterials: number;
  medicalSupplies: number;
  hygieneKits: number;
  shelterMaterials: number;
  total: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: 'api',
  tagTypes: ['Townships', 'SummaryByTownship'],
  endpoints: (build) => ({
    getTownships: build.query<Township[], void>({
      query: () => 'townships',
      providesTags: ['Townships'],
    }),
    getDistributionsSummaryByTownship: build.query<DistributionSummary[], void>(
      {
        query: () => 'distributions/by-township',
        providesTags: ['SummaryByTownship'],
      }
    ),
  }),
});

export const {
  useGetTownshipsQuery,
  useGetDistributionsSummaryByTownshipQuery,
} = api;
