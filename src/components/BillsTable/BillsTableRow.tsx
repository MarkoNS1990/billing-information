import { type MouseEvent } from 'react'
import { TableRow, TableCell, IconButton, Chip, Typography, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { type BillResult } from '../../api/bills'
import { getBillId, resolveSponsor } from './utils'

interface Props {
  result: BillResult
  isFav: boolean
  onFavourite: (result: BillResult, e: MouseEvent) => void
  onSelect: (result: BillResult) => void
  isXs: boolean
  isSm: boolean
}

export default function BillsTableRow({ result, isFav, onFavourite, onSelect, isXs, isSm }: Props) {
  const { bill } = result
  const id = getBillId(bill)

  return (
    <TableRow
      hover
      sx={{ cursor: 'pointer' }}
      onClick={() => onSelect(result)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(result)}
      aria-label={`View details for ${bill.shortTitleEn}`}
    >
      <TableCell padding="checkbox">
        <IconButton
          size="small"
          onClick={(e) => onFavourite(result, e)}
          aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFav}
          sx={{ color: isFav ? 'error.main' : 'action.disabled' }}
        >
          {isFav ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {id}
        </Typography>
      </TableCell>
      {!isSm && (
        <TableCell>
          <Typography variant="body2">{bill.billType}</Typography>
        </TableCell>
      )}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={bill.status} size="small" variant="outlined" />
          {bill.mostRecentStage && !isXs && (
            <Typography variant="caption" color="text.secondary" noWrap>
              {bill.mostRecentStage.event.showAs}
            </Typography>
          )}
        </Box>
      </TableCell>
      {!isXs && (
        <TableCell sx={{ maxWidth: 220 }}>
          <Typography variant="body2" noWrap title={resolveSponsor(bill.sponsors)}>
            {resolveSponsor(bill.sponsors)}
          </Typography>
        </TableCell>
      )}
    </TableRow>
  )
}
