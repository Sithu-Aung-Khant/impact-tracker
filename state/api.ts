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

export interface DistributionByAidType {
  aidType: string;
  totalQuantity: string;
}

export interface RecentDistribution {
  date: string;
  township: string;
  aidType: string;
  quantity: number;
  fieldWorker: string;
}

export interface TotalDistributions {
  totalDistributions: number;
  percentageComparedToLastMonth: number;
  totalTownshipsReached: number;
  numberOfTownshipsThisMonth: number;
  totalFoodKits: number;
  foodKitsPercentage: number;
  totalEducationMaterials: number;
  educationMaterialsPercentage: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: 'api',
  tagTypes: [
    'Townships',
    'SummaryByTownship',
    'SummaryByAidType',
    'RecentDistributions',
    'TotalDistributions',
  ],
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
    getDistributionsByAidType: build.query<DistributionByAidType[], void>({
      query: () => 'distributions/by-aid-type',
      providesTags: ['SummaryByAidType'],
    }),
    getRecentDistributions: build.query<RecentDistribution[], void>({
      query: () => 'distributions/recent',
      providesTags: ['RecentDistributions'],
    }),
    getTotalDistributions: build.query<TotalDistributions, void>({
      query: () => 'distributions/total',
      providesTags: ['TotalDistributions'],
    }),
    createDistribution: build.mutation<Distribution, Partial<Distribution>>({
      query: (body) => ({
        url: 'distributions',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        'RecentDistributions',
        'TotalDistributions',
        'SummaryByTownship',
        'SummaryByAidType',
      ],
    }),
  }),
});

export const {
  useGetTownshipsQuery,
  useGetDistributionsSummaryByTownshipQuery,
  useGetDistributionsByAidTypeQuery,
  useGetRecentDistributionsQuery,
  useGetTotalDistributionsQuery,
  useCreateDistributionMutation,
} = api;
