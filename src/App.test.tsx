import { screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { useBills } from './api/bills'
import App from './App'
import { renderWithProviders } from './test/test-utils'

vi.mock('./api/bills', () => ({
  useBills: vi.fn(),
}))

const mockedUseBills = vi.mocked(useBills)

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the bills page', () => {
    mockedUseBills.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as ReturnType<typeof useBills>)

    renderWithProviders(<App />)

    expect(screen.getByText('Bills')).toBeInTheDocument()
    expect(screen.getByText('Oireachtas Legislation')).toBeInTheDocument()
  })
})
