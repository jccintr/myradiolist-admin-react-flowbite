import { describe, it, expect,vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Pagination from '../../src/components/Pagination'

describe('Pagination', () => {

    it('Deve exibir apenas uma página quando TotalPages=1', () => {

        render(<Pagination currentPage={1} totalPages={1} onPageChange={()=>{}} />);
  
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.queryByText('...')).not.toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(5); 
        
    })

    it('Deve desabilitar botões de navegação quando TotalPages=1', () => {

         render(<Pagination currentPage={1} totalPages={1} onPageChange={()=>{}} />);

         const firstBtn = screen.getByRole('button', { name: /first-page/i });
         const prevBtn = screen.getByRole('button', { name: /previous-page/i });

         expect(firstBtn).toBeDisabled();
         expect(prevBtn).toBeDisabled();

         const lastBtn = screen.getByRole('button', { name: /last-page/i });
         const nextBtn = screen.getByRole('button', { name: /next-page/i });

         expect(lastBtn).toBeDisabled();
         expect(nextBtn).toBeDisabled();

    })

    it('Deve desabilitar botões Primeira e Anterior quando primeira página', () => {

         render(<Pagination currentPage={1} totalPages={1} onPageChange={()=>{}} />);

         const firstBtn = screen.getByRole('button', { name: /first-page/i });
         const prevBtn = screen.getByRole('button', { name: /previous-page/i });

         expect(firstBtn).toBeDisabled();
         expect(prevBtn).toBeDisabled();
        
    })

     it('Deve desabilitar botões Próxima e Última quando última página', () => {

         render(<Pagination currentPage={10} totalPages={10} onPageChange={()=>{}} />);

         const lastBtn = screen.getByRole('button', { name: /last-page/i });
         const nextBtn = screen.getByRole('button', { name: /next-page/i });

         expect(lastBtn).toBeDisabled();
         expect(nextBtn).toBeDisabled();
        
    })

    it('Deve chamar onChangePage quanto clicar em botão válido', () => {
        
        const onPageChange = vi.fn();
        render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />);
    
        fireEvent.click(screen.getByText('7'));
        
        expect(onPageChange).toHaveBeenCalledWith(7);
        expect(onPageChange).toHaveBeenCalledTimes(1);

    })

    it('Não deve chamar onChangePage quando clicar na página atual', () => {

        const onPageChange = vi.fn();
        render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />);
  
        fireEvent.click(screen.getByText('5'));
  
        expect(onPageChange).not.toHaveBeenCalled();
        
    })

    it('Deve exbir ... quando houver páginas omitidas', () => {

        render(<Pagination currentPage={5} totalPages={20} onPageChange={vi.fn()} />);
  
        const ellipsis = screen.getAllByText('...');
        expect(ellipsis).toHaveLength(2);
    })

    it('Botão de Próxima página deve chamar página atual + 1', () => {
        const onPageChange = vi.fn();
        render(<Pagination currentPage={3} totalPages={10} onPageChange={onPageChange} />);
  
        fireEvent.click(screen.getByRole('button', { name: /next/i }));
  
        expect(onPageChange).toHaveBeenCalledWith(4);

    })

    it('Não deve chamar onChangePage quando clicar em botão inválido', () => {
        const onPageChange = vi.fn();
        render(<Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />);
  
        fireEvent.click(screen.getByRole('button', { name: /next/i }));
        expect(onPageChange).not.toHaveBeenCalled();
    })
    
})