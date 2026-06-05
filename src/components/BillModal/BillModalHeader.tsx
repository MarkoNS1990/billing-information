import { Box, Typography, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  billNo: string
  billYear: number
  billType: string
  onClose: () => void
}

export default function BillModalHeader({ billNo, billYear, billType, onClose }: Props) {
  return (
    <Box sx={{ position: 'relative', px: 3, pt: 3, pb: 1 }}>
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ display: 'block', lineHeight: 1.6 }}
      >
        {billNo}/{billYear} · {billType}
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
  )
}
