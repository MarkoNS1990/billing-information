export type BillingStatus = 'not-started' | 'in-progress' | 'complete'

export interface BillingInformation {
  fullName: string
  email: string
  companyName?: string
  addressLine1: string
  addressLine2?: string
  city: string
  postalCode: string
  country: string
  vatNumber?: string
  status: BillingStatus
}
