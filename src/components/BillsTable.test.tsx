import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { useBills } from '../api/bills'
import { mockBillResult } from '../test/fixtures/bills'
import { renderWithProviders } from '../test/test-utils'
import BillsTable from './BillsTable'

vi.mock('../api/bills', () => ({
  useBills: vi.fn(),
}))

const mockedUseBills = vi.mocked(useBills)

describe('BillsTable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders a loading state while bills are fetched', () => {
    mockedUseBills.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as ReturnType<typeof useBills>)

    renderWithProviders(<BillsTable />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders fetched bills in the table', () => {
    mockedUseBills.mockReturnValue({
      data: {
        head: { counts: { billCount: 1, resultCount: 1 } },
        results: [mockBillResult],
      },
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useBills>)

    renderWithProviders(<BillsTable />)

    expect(screen.getByText('1 bills')).toBeInTheDocument()
    expect(screen.getByText('42/2024')).toBeInTheDocument()
    expect(screen.getByText('Jack Chambers')).toBeInTheDocument()
    expect(screen.getByText('Current')).toBeInTheDocument()
  })

  it('shows an empty favourites message on the favourites tab', () => {
    mockedUseBills.mockReturnValue({
      data: {
        head: { counts: { billCount: 1, resultCount: 1 } },
        results: [mockBillResult],
      },
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useBills>)

    renderWithProviders(<BillsTable />)

    fireEvent.click(screen.getByRole('tab', { name: /favourites/i }))

    expect(
      screen.getByText(
        'No favourited bills yet. Click the heart icon on any bill to save it here.',
      ),
    ).toBeInTheDocument()
  })

  it('adds a bill to favourites and shows it on the favourites tab', () => {
    mockedUseBills.mockReturnValue({
      data: {
        head: { counts: { billCount: 1, resultCount: 1 } },
        results: [mockBillResult],
      },
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useBills>)

    renderWithProviders(<BillsTable />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Add to favourites' }),
    )
    fireEvent.click(screen.getByRole('tab', { name: /favourites/i }))

    expect(screen.getByText('42/2024')).toBeInTheDocument()
    expect(
      screen.queryByText(
        'No favourited bills yet. Click the heart icon on any bill to save it here.',
      ),
    ).not.toBeInTheDocument()
  })
})
