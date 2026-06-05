import { Box, Typography } from '@mui/material'

interface Props {
  totalResults: number
  showCount: boolean
}

export default function BillsTableHeader({ totalResults, showCount }: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2 }}>
      <Box>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', lineHeight: 1.6 }}
        >
          Oireachtas Legislation
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.03em' }}>
          Bills
        </Typography>
      </Box>
      {showCount && totalResults > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {totalResults.toLocaleString()} bills
        </Typography>
      )}
    </Box>
  )
}
