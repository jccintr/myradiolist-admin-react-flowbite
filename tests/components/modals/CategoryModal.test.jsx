import { describe, it, expect,vi } from 'vitest'
import { render,screen,fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CategoryModal from '../../../src/components/modals/CategoryModal'

describe('CategoryModal', () => {

    it('Deve exibir o modal quando isOpen = true', () => {

        const category = {id:1, name:"Esportes"};

        render(<CategoryModal isOpen={true} setIsOpen={vi.fn()} title="Editando Categoria" onSave={vi.fn()} category={category} setCategory={vi.fn()} isLoading={false} errorMessage="Mensagem" />);

        expect(screen.getByRole('dialog')).toBeInTheDocument();

    })

    it('Não deve exibir o modal quando isOpen = false', () => {

        const category = {id:1, name:"Esportes"};

        render(<CategoryModal isOpen={false} setIsOpen={vi.fn()} title="Editando Categoria" onSave={vi.fn()} category={category} setCategory={vi.fn()} isLoading={false} errorMessage="Mensagem" />);

         const dialog = screen.queryByRole('dialog');

        expect(dialog).not.toBeInTheDocument();
        
    })

    it('Deve exibir corretamente o titulo passado em title', () => {

        const category = {id:1, name:"Esportes"};
        const title = 'Editando Categoria';

        render(<CategoryModal isOpen={true} setIsOpen={vi.fn()} title={title} onSave={vi.fn()} category={category} setCategory={vi.fn()} isLoading={false} errorMessage="Mensagem" />);

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
        
    })

     it('Deve chamar setIsOpen(false) e fechar o modal quando clicar no botão cancelar', () => {

        const setIsOpen = vi.fn();
        const category = {id:1, name:"Esportes"};

        render(<CategoryModal isOpen={true} setIsOpen={setIsOpen} title={"Editando Categoria"} onSave={vi.fn()} category={category} setCategory={vi.fn()} isLoading={false} errorMessage="Mensagem" />);
       
        const cancelButton = screen.getByRole('button', { name: 'Cancelar' });
        fireEvent.click(cancelButton);
        expect(setIsOpen).toHaveBeenCalledWith(false);
        
    })

    
    it('Deve chamar e exibir spinner quando clicar no botão salvar', () => {

        const onSave = vi.fn();
        const category = {id:1, name:"Esportes"};
        const { rerender } = render(
            <CategoryModal
            isOpen={true}
            setIsOpen={() => {}}
            title="Teste"
            onSave={onSave}
            category={category}
            setCategory={() => {}}
            isLoading={false}
            />
        );

        const saveButton = screen.getByRole('button', { name: 'Salvar' });

        fireEvent.click(saveButton);

        expect(onSave).toHaveBeenCalled();

        rerender(
            <CategoryModal
            isOpen={true}
            setIsOpen={() => {}}
            title="Teste"
            onSave={onSave}
            category={category}
            setCategory={() => {}}
            isLoading={true}
            />
        );

        expect(saveButton).toBeDisabled();
        const spinner = screen.getByRole('status', { name: 'spinner' });
        expect(spinner).toBeInTheDocument();
    })

    it('Deve chamar setIsOpen(false) e fechar o modal quando clicar no botão Close (x)', () => {

        const setIsOpen = vi.fn();
        const category = {id:1, name:"Esportes"};

        render(<CategoryModal isOpen={true} setIsOpen={setIsOpen} title={"Editando Categoria"} onSave={vi.fn()} category={category} setCategory={vi.fn()} isLoading={false} errorMessage="Mensagem" />);
       
        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);
        expect(setIsOpen).toHaveBeenCalledWith(false);
        
    })

    it('Deve exibir mensagem de erro quando errorMessage não for nula', () => {

        const category = {id:1, name:"Esportes"};
        const errorMessage = "Nome é obrigatório";

        render(<CategoryModal isOpen={true} setIsOpen={true} title={"Editando Categoria"} onSave={vi.fn()} category={category} setCategory={vi.fn()} isLoading={false} errorMessage={errorMessage} />);
       
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    })

     it('Não deve exibir mensagem de erro quando errorMessage  for nula', () => {

        const category = {id:1, name:"Esportes"};
        const errorMessage = "Nome é obrigatório";

        render(<CategoryModal isOpen={true} setIsOpen={true} title={"Editando Categoria"} onSave={vi.fn()} category={category} setCategory={vi.fn()} isLoading={false} errorMessage={null} />);
       
       expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    })

    it('Name input deve exibir corretamente o nome da categoria passada em Category', () => {

        const category = {id:1, name:"Esportes"};

        render(<CategoryModal isOpen={true} setIsOpen={true} title={"Editando Categoria"} onSave={vi.fn()} category={category} setCategory={vi.fn()} isLoading={false} errorMessage="Mensagem" />);
       
        const input = screen.getByPlaceholderText('Digite o nome da categoria');
        expect(input).toHaveValue(category.name);

    })

    it('Name input deve atualizar corretamente o nome da categoria quando alterada', () => {

        const setCategory = vi.fn();
        const category = {id:1, name:"Esportes"};
        const newName = "Rock";
        render(<CategoryModal isOpen={true} setIsOpen={true} title={"Editando Categoria"} onSave={vi.fn()} category={category} setCategory={setCategory} isLoading={false} errorMessage="Mensagem" />);
     
        const input = screen.getByPlaceholderText('Digite o nome da categoria');
        fireEvent.change(input, { target: { value: newName } });

        expect(setCategory).toHaveBeenCalledWith({...category,name:newName});
    })


    
})