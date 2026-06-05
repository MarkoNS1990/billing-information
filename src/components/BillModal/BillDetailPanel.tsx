import { Box, Typography, DialogContent } from '@mui/material'
import { stripHtmlTags } from '../../utils/stripHtmlTags'

interface Props {
  shortTitleLabel: string
  longTitleLabel: string
  shortTitle: string
  longTitle: string
}

export default function BillDetailPanel({ shortTitleLabel, longTitleLabel, shortTitle, longTitle }: Props) {
  return (
    <DialogContent>
      <Box sx={{ display: 'grid', gap: 0.5 }}>
        <Typography variant="overline" color="text.secondary">
          {shortTitleLabel}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {shortTitle || '—'}
        </Typography>
        {longTitle && (
          <>
            <Typography variant="overline" color="text.secondary" sx={{ mt: 2 }}>
              {longTitleLabel}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7, whiteSpace: 'pre-line' }}
            >
              {stripHtmlTags(longTitle)}
            </Typography>
          </>
        )}
      </Box>
    </DialogContent>
  )
}
