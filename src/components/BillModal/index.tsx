import { useState } from 'react'
import { Dialog, Tabs, Tab } from '@mui/material'
import type { BillResult } from '../../api/bills'
import BillModalHeader from './BillModalHeader'
import BillDetailPanel from './BillDetailPanel'

type LangTab = 'en' | 'ga'

interface Props {
  bill: BillResult
  onClose: () => void
}

export default function BillModal({ bill, onClose }: Props) {
  const [langTab, setLangTab] = useState<LangTab>('en')
  const { bill: b } = bill

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <BillModalHeader
        billNo={b.billNo}
        billYear={b.billYear}
        billType={b.billType}
        onClose={onClose}
      />

      <Tabs
        value={langTab}
        onChange={(_, v: LangTab) => setLangTab(v)}
        sx={{ px: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="English" value="en" />
        <Tab label="Gaeilge" value="ga" />
      </Tabs>

      {langTab === 'en' ? (
        <BillDetailPanel
          shortTitleLabel="Short title"
          longTitleLabel="Long title"
          shortTitle={b.shortTitleEn}
          longTitle={b.longTitleEn}
        />
      ) : (
        <BillDetailPanel
          shortTitleLabel="Teideal gearr"
          longTitleLabel="Teideal fada"
          shortTitle={b.shortTitleGa}
          longTitle={b.longTitleGa}
        />
      )}
    </Dialog>
  )
}
