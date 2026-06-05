import { useState, useEffect, useCallback } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useBills, type BillResult } from '../../api/bills'
import BillModal from '../BillModal'
import BillsTableHeader from './BillsTableHeader'
import BillsTableControls from './BillsTableControls'
import BillsTableContent from './BillsTableContent'
import BillsTablePagination from './BillsTablePagination'
import { getBillId } from './utils'

const PAGE_SIZE = 20

export default function BillsTable() {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const isSm = useMediaQuery(theme.breakpoints.down('md'))

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

  const handleFavourite = useCallback((result: BillResult, e: React.MouseEvent) => {
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
  }, [])

  const handleBillTypeFilterChange = (filter: string) => {
    setBillTypeFilter(filter)
    setPage(0)
  }

  const allRows = data?.results ?? []
  const filteredRows = billTypeFilter
    ? allRows.filter((r) => r.bill.billType === billTypeFilter)
    : allRows
  const displayedRows = tableTab === 1 ? [...favourites.values()] : filteredRows

  const totalResults = data?.head.counts.resultCount ?? 0
  const totalPages = Math.ceil(totalResults / PAGE_SIZE)
  const startItem = page * PAGE_SIZE + 1
  const endItem = Math.min((page + 1) * PAGE_SIZE, totalResults)

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <BillsTableHeader totalResults={totalResults} showCount={tableTab === 0} />

      <BillsTableControls
        tableTab={tableTab}
        onTabChange={setTableTab}
        favouriteCount={favourites.size}
        seenBillTypes={seenBillTypes}
        billTypeFilter={billTypeFilter}
        onBillTypeFilterChange={handleBillTypeFilterChange}
        isXs={isXs}
      />

      <BillsTableContent
        isLoading={isLoading}
        isError={isError}
        error={error as Error | null}
        displayedRows={displayedRows}
        tableTab={tableTab}
        isXs={isXs}
        isSm={isSm}
        favourites={favourites}
        onFavourite={handleFavourite}
        onSelect={(result) => setSelectedBill(result)}
      />

      {tableTab === 0 && (
        <BillsTablePagination
          page={page}
          totalPages={totalPages}
          startItem={startItem}
          endItem={endItem}
          totalResults={totalResults}
          onPrev={() => setPage((p) => p - 1)}
          onNext={() => setPage((p) => p + 1)}
        />
      )}

      {selectedBill && (
        <BillModal bill={selectedBill} onClose={() => setSelectedBill(null)} />
      )}
    </Box>
  )
}
