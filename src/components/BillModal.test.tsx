import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockBillResult } from '../test/fixtures/bills'
import { renderWithProviders } from '../test/test-utils'
import BillModal from './BillModal'

describe('BillModal', () => {
  it('renders English bill details by default', () => {
    renderWithProviders(
      <BillModal bill={mockBillResult} onClose={vi.fn()} />,
    )

    expect(screen.getByText('42/2024 · Public')).toBeInTheDocument()
    expect(screen.getByText('Bill Details')).toBeInTheDocument()
    expect(screen.getByText('Sample Bill')).toBeInTheDocument()
    expect(
      screen.getByText('An Act to provide for sample purposes.'),
    ).toBeInTheDocument()
  })

  it('shows Irish content when the Gaeilge tab is selected', () => {
    renderWithProviders(
      <BillModal bill={mockBillResult} onClose={vi.fn()} />,
    )

    fireEvent.click(screen.getByRole('tab', { name: 'Gaeilge' }))

    expect(screen.getByText('Bille Samplach')).toBeInTheDocument()
    expect(
      screen.getByText('Acht chun críocha samplacha a sholáthar.'),
    ).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn()

    renderWithProviders(
      <BillModal bill={mockBillResult} onClose={onClose} />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }))

    expect(onClose).toHaveBeenCalledOnce()
  })
})
