import { useQuery } from '@tanstack/react-query'

const BASE_URL = 'https://api.oireachtas.ie/v1'

export interface BillSponsor {
  sponsor: {
    isPrimary: boolean
    as: { showAs: string | null; uri: string | null }
    by: { showAs: string | null; uri: string | null }
  }
}

export interface BillResult {
  bill: {
    billNo: string
    billYear: number
    billType: string
    shortTitleEn: string
    shortTitleGa: string
    longTitleEn: string
    longTitleGa: string
    source: string
    method: string
    lastUpdated: string
    status: string
    statusURI: string
    originHouse: {
      showAs: string
      chamber_id: string
    }
    sponsors: BillSponsor[]
    act?: {
      actNo: string
      actYear: number
      dateSigned: string
    }
    mostRecentStage?: {
      event: {
        chamber?: { showAs: string }
        showAs: string
        stageURI: string
        progressStage: number
        stageCompleted: boolean
      }
    }
  }
}

export interface BillsResponse {
  head: {
    counts: {
      billCount: number
      resultCount: number
    }
  }
  results: BillResult[]
}

export interface FetchBillsParams {
  limit?: number
  skip?: number
  bill_status?: string
  bill_source?: string
  date_start?: string
  date_end?: string
  bill_no?: string
  bill_year?: number
  act_no?: string
  act_year?: number
  chamber_id?: string
  member_id?: string
  lang?: 'en' | 'ga'
}

async function fetchBills(params: FetchBillsParams = {}): Promise<BillsResponse> {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value))
    }
  }

  if (!searchParams.has('limit')) {
    searchParams.set('limit', '50')
  }

  const response = await fetch(`${BASE_URL}/legislation?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch bills: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<BillsResponse>
}

export function useBills(params: FetchBillsParams = {}) {
  return useQuery({
    queryKey: ['bills', params],
    queryFn: () => fetchBills(params),
  })
}
