import { Box, Container } from '@mui/material'
import BillsTable from '../components/BillsTable'

export default function BillingInformationPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <BillsTable />
      </Container>
    </Box>
  )
}
