import { Box, Tabs, Tab, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

interface Props {
  tableTab: number
  onTabChange: (tab: number) => void
  favouriteCount: number
  seenBillTypes: Set<string>
  billTypeFilter: string
  onBillTypeFilterChange: (filter: string) => void
  isXs: boolean
}

export default function BillsTableControls({
  tableTab,
  onTabChange,
  favouriteCount,
  seenBillTypes,
  billTypeFilter,
  onBillTypeFilterChange,
  isXs,
}: Props) {
  return (
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
        onChange={(_, v: number) => onTabChange(v)}
        variant={isXs ? 'fullWidth' : 'standard'}
        sx={{ mb: '-1px', width: { xs: '100%', sm: 'auto' } }}
      >
        <Tab label="All Bills" />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              Favourites
              {favouriteCount > 0 && (
                <Chip
                  label={favouriteCount}
                  size="small"
                  color="error"
                  sx={{
                    height: 20,
                    '& .MuiChip-label': { px: 0.75, fontSize: '0.6875rem', fontWeight: 700 },
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
            onChange={(e) => onBillTypeFilterChange(e.target.value)}
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
  )
}
