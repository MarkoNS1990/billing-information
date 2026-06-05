import { type MouseEvent } from 'react'
import {
  Paper,
  Box,
  CircularProgress,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material'
import { type BillResult } from '../../api/bills'
import BillsTableRow from './BillsTableRow'
import { getBillId } from './utils'

interface Props {
  isLoading: boolean
  isError: boolean
  error: Error | null
  displayedRows: BillResult[]
  tableTab: number
  isXs: boolean
  isSm: boolean
  favourites: Map<string, BillResult>
  onFavourite: (result: BillResult, e: MouseEvent) => void
  onSelect: (result: BillResult) => void
}

export default function BillsTableContent({
  isLoading,
  isError,
  error,
  displayedRows,
  tableTab,
  isXs,
  isSm,
  favourites,
  onFavourite,
  onSelect,
}: Props) {
  return (
    <Paper variant="outlined">
      {isLoading && tableTab === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={28} />
        </Box>
      ) : isError ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography color="error">{error?.message}</Typography>
        </Box>
      ) : displayedRows.length === 0 ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography color="text.secondary">
            {tableTab === 1
              ? 'No favourited bills yet. Click the heart icon on any bill to save it here.'
              : 'No bills found.'}
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>Bill No.</TableCell>
                {!isSm && <TableCell>Bill Type</TableCell>}
                <TableCell>Status</TableCell>
                {!isXs && <TableCell>Sponsor</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRows.map((result) => (
                <BillsTableRow
                  key={getBillId(result.bill)}
                  result={result}
                  isFav={favourites.has(getBillId(result.bill))}
                  onFavourite={onFavourite}
                  onSelect={onSelect}
                  isXs={isXs}
                  isSm={isSm}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  )
}
