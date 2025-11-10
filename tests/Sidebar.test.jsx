import { describe, it, expect,vi,beforeEach } from 'vitest';
import { render,screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route,useLocation, } from 'react-router-dom';
import '@testing-library/jest-dom';
import SideBar from '../src/components/Sidebar';
import AuthContext from '../src/context/AuthContext';

// Mock do AuthContext
const mockSetLoggedUser = vi.fn();
const mockNavigate = vi.fn();

// Mock do useNavigate do react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: vi.fn(),
  };
});

const renderWithRouterAndContext = (
  ui,
  { initialEntries = ['/?page=radios'], loggedUser = { name: 'João Silva' } } = {}
) => {
  const setLoggedUser = vi.fn();
  return render(
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      <MemoryRouter initialEntries={initialEntries}>
        {ui}
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('Sidebar', () => {

    beforeEach(() => {
    vi.clearAllMocks();
    // Mock padrão do useLocation
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/',
      search: '?page=radios',
      hash: '',
      state: null,
      key: 'default',
    });
  });
    
    it('Deve renderizar o sidebar com logo, título e nome do usuário', () => {
    renderWithRouterAndContext(<SideBar />, { loggedUser: { name: 'Maria Oliveira' } });

    expect(screen.getByAltText('logo')).toHaveAttribute('src', 'my-radio-list-logo.png');
    expect(screen.getByText('Módulo de Administração')).toBeInTheDocument();
    expect(screen.getByText('Maria Oliveira')).toBeInTheDocument();

  });

it('Deve chamar setLoggedUser(null) quando clicar em "Sair"', () => {
    const setLoggedUser = vi.fn();
    render(
      <AuthContext.Provider value={{ loggedUser: { name: 'Maria' }, setLoggedUser }}>
        <MemoryRouter>
          <SideBar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutButton = screen.getByText('Sair');
    fireEvent.click(logoutButton);

    expect(setLoggedUser).toHaveBeenCalledWith(null);
   
  });


  it('Deve destacar o item ativo com base no parâmetro "page" da URL', () => {
    const { rerender } = renderWithRouterAndContext(<SideBar />, {
      initialEntries: ['/?page=categories'],
    });

    vi.mocked(useLocation).mockReturnValue({
      search: '?page=categories',
    } );

    rerender(
      <AuthContext.Provider value={{ loggedUser: { name: 'Teste' }, setLoggedUser: vi.fn() }}>
        <MemoryRouter initialEntries={['/?page=categories']}>
          <SideBar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const categoriesItem = screen.getByTestId('categories');
    expect(categoriesItem).toHaveClass('bg-gray-200'); // active class do Flowbite

    const radiosItem =screen.getByTestId('radios');
    expect(radiosItem).not.toHaveClass('bg-gray-200');
  });

  it('deve navegar para a página correta ao clicar em um item do menu', () => {
    
    renderWithRouterAndContext(<SideBar />, { initialEntries: ['/'] });

    const citiesLink = screen.getByText('Cidades').closest('a');
    expect(citiesLink).toHaveAttribute('href', '/?page=cities');

    const usersLink = screen.getByText('Usuários').closest('a');
    expect(usersLink).toHaveAttribute('href', '/?page=users');
  });

})