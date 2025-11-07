// tests/pages/Login.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Login from '../../src/pages/Login'
import AuthContext from '../../src/context/AuthContext'

// --- Mocks globais (funções) ---
let mockSetToken = vi.fn()
let mockSetLoggedUser = vi.fn()
let mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

// Mock **único** da API
const mockLoginResponse = { status: 200, json: () => Promise.resolve({ accessToken: 'fake-token' }) }
const mockValidateResponse = { ok: true, json: () => Promise.resolve({ name: 'Admin' }) }

vi.mock('../../src/api/api', () => ({
  default: {
    login: vi.fn(() => Promise.resolve(mockLoginResponse)),
    validateToken: vi.fn(() => Promise.resolve(mockValidateResponse)),
  },
}))

// helper para renderizar com o Provider do contexto
const renderLogin = () =>
  render(
    <AuthContext.Provider value={{ setToken: mockSetToken, setLoggedUser: mockSetLoggedUser }}>
      <Login />
    </AuthContext.Provider>
  )

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSetToken = vi.fn()
    mockSetLoggedUser = vi.fn()
    mockNavigate = vi.fn()
  })

  it('deve exibir o título Módulo de Administração', () => {
    renderLogin()
    expect(screen.getByText('Módulo de Administração')).toBeInTheDocument()
  })

  it('deve mostrar erro se email estiver vazio', async () => {
    renderLogin()
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(await screen.findByText('Informe o email por favor.')).toBeInTheDocument()
  })

  it('deve mostrar erro se senha estiver vazia', async () => {
    renderLogin()
    await userEvent.type(screen.getByPlaceholderText('Digite o seu email'), 'user@test.com')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(await screen.findByText('Informe a senha por favor.')).toBeInTheDocument()
  })

  it('deve mostrar erro de serviço indisponível', async () => {
    const { default: api } = await import('../../src/api/api')
    api.login.mockRejectedValueOnce(new Error('Network error'))

    renderLogin()

    await userEvent.type(screen.getByPlaceholderText('Digite o seu email'), 'x@x.com')
    await userEvent.type(screen.getByPlaceholderText('Digite a sua senha'), '123')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Serviço indisponível. Tente novamente mais tarde.')).toBeInTheDocument()
  })

  it('deve fazer login com sucesso e redirecionar', async () => {
    const { default: api } = await import('../../src/api/api')

    api.login.mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ accessToken: 'fake-token' }),
    })

    api.validateToken.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ name: 'Admin' }),
    })

    renderLogin()

    await userEvent.type(screen.getByPlaceholderText('Digite o seu email'), 'admin@test.com')
    await userEvent.type(screen.getByPlaceholderText('Digite a sua senha'), '123456')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/?page=radios'))
    expect(mockSetToken).toHaveBeenCalledWith('fake-token')
    expect(mockSetLoggedUser).toHaveBeenCalledWith({ name: 'Admin' })
  })

it('deve mostrar erro quando email e/ou senha forem inválidos', async () => {
  const { default: api } = await import('../../src/api/api')

  api.login.mockResolvedValueOnce({
    status: 401,
    json: () => Promise.resolve({ message: 'invalid credentials' })
  })

  renderLogin()

  await userEvent.type(screen.getByPlaceholderText('Digite o seu email'), 'user@test.com')
  await userEvent.type(screen.getByPlaceholderText('Digite a sua senha'), 'wrongpass')
  await userEvent.click(screen.getByRole('button', { name: /entrar/i }))

  expect(
    await screen.findByText('Email e ou senha inválidos.')
  ).toBeInTheDocument()
})


  
})
