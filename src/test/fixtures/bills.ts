import type { BillResult } from '../../api/bills'

export const mockBillResult: BillResult = {
  bill: {
    billNo: '42',
    billYear: 2024,
    billType: 'Public',
    shortTitleEn: 'Sample Bill',
    shortTitleGa: 'Bille Samplach',
    longTitleEn: 'An Act to provide for sample purposes.',
    longTitleGa: 'Acht chun críocha samplacha a sholáthar.',
    source: 'Government',
    method: 'Bills',
    lastUpdated: '2024-01-01',
    status: 'Current',
    statusURI: 'http://example.com/status',
    originHouse: { showAs: 'Dáil', chamber_id: 'dail' },
    sponsors: [
      {
        sponsor: {
          isPrimary: true,
          as: { showAs: 'Minister for Finance', uri: null },
          by: { showAs: 'Jack Chambers', uri: null },
        },
      },
    ],
    mostRecentStage: {
      event: {
        showAs: 'Second Stage',
        stageURI: 'http://example.com/stage',
        progressStage: 2,
        stageCompleted: false,
      },
    },
  },
}
