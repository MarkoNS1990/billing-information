import { Box, Button, Typography } from '@mui/material'

interface Props {
  page: number
  totalPages: number
  startItem: number
  endItem: number
  totalResults: number
  onPrev: () => void
  onNext: () => void
}

export default function BillsTablePagination({
  page,
  totalPages,
  startItem,
  endItem,
  totalResults,
  onPrev,
  onNext,
}: Props) {
  if (totalPages <= 1) return null

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Button variant="outlined" size="small" onClick={onPrev} disabled={page === 0}>
        ← Prev
      </Button>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
        {startItem}–{endItem} of {totalResults.toLocaleString()}
      </Typography>
      <Button variant="outlined" size="small" onClick={onNext} disabled={page >= totalPages - 1}>
        Next →
      </Button>
    </Box>
  )
}
