import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Typography,
  IconButton,
  Box,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { BillResult } from '../api/bills'
import { stripHtmlTags } from '../utils/stripHtmlTags'

type LangTab = 'en' | 'ga'

interface BillModalProps {
  bill: BillResult
  onClose: () => void
}

export default function BillModal({ bill, onClose }: BillModalProps) {
  const [langTab, setLangTab] = useState<LangTab>('en')
  const { bill: b } = bill

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ position: 'relative', px: 3, pt: 3, pb: 1 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', lineHeight: 1.6 }}
        >
          {b.billNo}/{b.billYear} · {b.billType}
        </Typography>
        <DialogTitle sx={{ p: 0, pr: 5, fontWeight: 700, letterSpacing: '-0.02em' }}>
          Bill Details
        </DialogTitle>
        <IconButton
          onClick={onClose}
          aria-label="Close modal"
          size="small"
          sx={{ position: 'absolute', right: 12, top: 12 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Tabs
        value={langTab}
        onChange={(_, v: LangTab) => setLangTab(v)}
        sx={{ px: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="English" value="en" />
        <Tab label="Gaeilge" value="ga" />
      </Tabs>

      <DialogContent>
        {langTab === 'en' ? (
          <Box sx={{ display: 'grid', gap: 0.5 }}>
            <Typography variant="overline" color="text.secondary">
              Short title
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {b.shortTitleEn || '—'}
            </Typography>
            {b.longTitleEn && (
              <>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Long title
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {stripHtmlTags(b.longTitleEn)}
                </Typography>
              </>
            )}
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gap: 0.5 }}>
            <Typography variant="overline" color="text.secondary">
              Teideal gearr
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {b.shortTitleGa || '—'}
            </Typography>
            {b.longTitleGa && (
              <>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Teideal fada
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {stripHtmlTags(b.longTitleGa)}
                </Typography>
              </>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}
