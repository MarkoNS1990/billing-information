import { type BillResult, type BillSponsor } from '../../api/bills'

export function resolveSponsor(sponsors: BillSponsor[]): string {
  if (!sponsors?.length) return '—'
  const primary = sponsors.find((s) => s.sponsor.isPrimary) ?? sponsors[0]
  const { by, as: asRole } = primary.sponsor
  return by?.showAs ?? asRole?.showAs ?? '—'
}

export function getBillId(bill: BillResult['bill']): string {
  return `${bill.billNo}/${bill.billYear}`
}
