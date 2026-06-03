import { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Chip,
  Button,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useBills, type BillResult, type BillSponsor } from '../api/bills'
import BillModal from './BillModal'

const PAGE_SIZE = 20

function resolveSponsor(sponsors: BillSponsor[]): string {
  if (!sponsors?.length) return '—'
  const primary = sponsors.find((s) => s.sponsor.isPrimary) ?? sponsors[0]
  const { by, as: asRole } = primary.sponsor
  return by?.showAs ?? asRole?.showAs ?? '—'
}

function getBillId(bill: BillResult['bill']): string {
  return `${bill.billNo}/${bill.billYear}`
}

export default function BillsTable() {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))  // < 600px
  const isSm = useMediaQuery(theme.breakpoints.down('md'))  // < 900px

  const [tableTab, setTableTab] = useState(0)
  const [page, setPage] = useState(0)
  const [billTypeFilter, setBillTypeFilter] = useState('')
  const [selectedBill, setSelectedBill] = useState<BillResult | null>(null)
  const [favourites, setFavourites] = useState<Map<string, BillResult>>(new Map())
  const [seenBillTypes, setSeenBillTypes] = useState<Set<string>>(new Set())

  const { data, isLoading, isError, error } = useBills({
    limit: PAGE_SIZE,
    skip: page * PAGE_SIZE,
  })

  useEffect(() => {
    if (!data) return
    const incoming = data.results.map((r) => r.bill.billType).filter(Boolean)
    setSeenBillTypes((prev) => {
      if (incoming.every((t) => prev.has(t))) return prev
      const next = new Set(prev)
      incoming.forEach((t) => next.add(t))
      return next
    })
  }, [data])

  const handleFavourite = useCallback(
    (result: BillResult, e: React.MouseEvent) => {
      e.stopPropagation()
      const id = getBillId(result.bill)
      setFavourites((prev) => {
        const next = new Map(prev)
        if (next.has(id)) {
          next.delete(id)
          console.log(`[Server] PATCH /api/bills/${id}/favourite`, { favourited: false })
        } else {
          next.set(id, result)
          console.log(`[Server] PATCH /api/bills/${id}/favourite`, { favourited: true })
        }
        return next
      })
    },
    [],
  )

  const favouritesList = [...favourites.values()]
  const allRows = data?.results ?? []
  const filteredRows = billTypeFilter
    ? allRows.filter((r) => r.bill.billType === billTypeFilter)
    : allRows
  const displayedRows = tableTab === 1 ? favouritesList : filteredRows

  const totalResults = data?.head.counts.resultCount ?? 0
  const totalPages = Math.ceil(totalResults / PAGE_SIZE)
  const startItem = page * PAGE_SIZE + 1
  const endItem = Math.min((page + 1) * PAGE_SIZE, totalResults)

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      {/* Header */}
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
        {tableTab === 0 && totalResults > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {totalResults.toLocaleString()} bills
          </Typography>
        )}
      </Box>

      {/* Tabs + Filter */}
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          gap: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          value={tableTab}
          onChange={(_, v: number) => setTableTab(v)}
          variant={isXs ? 'fullWidth' : 'standard'}
          sx={{ mb: '-1px', width: { xs: '100%', sm: 'auto' } }}
        >
          <Tab label="All Bills" />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Favourites
                {favourites.size > 0 && (
                  <Chip
                    label={favourites.size}
                    size="small"
                    color="error"
                    sx={{
                      height: 20,
                      '& .MuiChip-label': {
                        px: 0.75,
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                      },
                    }}
                  />
                )}
              </Box>
            }
          />
        </Tabs>

        {tableTab === 0 && seenBillTypes.size > 0 && (
          <FormControl size="small" sx={{ minWidth: 160, mb: 1, width: { xs: '100%', sm: 'auto' } }}>
            <InputLabel id="bill-type-label">Bill type</InputLabel>
            <Select
              labelId="bill-type-label"
              value={billTypeFilter}
              label="Bill type"
              onChange={(e) => {
                setBillTypeFilter(e.target.value)
                setPage(0)
              }}
            >
              <MenuItem value="">All types</MenuItem>
              {[...seenBillTypes].sort().map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Table */}
      <Paper variant="outlined">
        {isLoading && tableTab === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={28} />
          </Box>
        ) : isError ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography color="error">{(error as Error).message}</Typography>
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
                {displayedRows.map((result) => {
                  const { bill } = result
                  const id = getBillId(bill)
                  const isFav = favourites.has(id)
                  return (
                    <TableRow
                      key={id}
                      hover
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setSelectedBill(result)}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedBill(result)}
                      aria-label={`View details for ${bill.shortTitleEn}`}
                    >
                      <TableCell padding="checkbox">
                        <IconButton
                          size="small"
                          onClick={(e) => handleFavourite(result, e)}
                          aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
                          aria-pressed={isFav}
                          sx={{ color: isFav ? 'error.main' : 'action.disabled' }}
                        >
                          {isFav
                            ? <FavoriteIcon fontSize="small" />
                            : <FavoriteBorderIcon fontSize="small" />}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}
                        >
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
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Pagination */}
      {tableTab === 0 && totalPages > 1 && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
          >
            ← Prev
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {startItem}–{endItem} of {totalResults.toLocaleString()}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages - 1}
          >
            Next →
          </Button>
        </Box>
      )}

      {selectedBill && (
        <BillModal bill={selectedBill} onClose={() => setSelectedBill(null)} />
      )}
    </Box>
  )
}
