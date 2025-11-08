import { describe, it, expect,vi } from 'vitest'
import { render,screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import EmptyTable from '../../src/components/EmptyTable'

//{message,message2,showButton = true, buttonLabel,onAdd}

describe('EmptyTable Component', () => {

    it('Deve exibir Botão Adicionar quando showButton = true', () => {

        const buttonLabel = 'Add'
        render(<EmptyTable message='Message' message2='Message2' showButton={true} buttonLabel={buttonLabel} onAdd={vi.fn()}/>)
        
        const button = screen.getByRole('button', { name: buttonLabel });
        expect(button).toBeInTheDocument();
        

    })

    it('Não deve exibir Botão Adicionar quando showButton = false', () => {

        const buttonLabel = 'Add'
        render(<EmptyTable message='Message' message2='Message2' showButton={false} buttonLabel={buttonLabel} onAdd={vi.fn()}/>)
        
        const button = screen.queryByRole('button');
        expect(button).not.toBeInTheDocument();

    })

    it('Deve exibir corretamente o Label do Botão informado em buttonLabel', () => {

        const buttonLabel = 'Add'
        render(<EmptyTable message='Message' message2='Message2' showButton={true} buttonLabel={buttonLabel} onAdd={vi.fn()}/>)
        
        const button = screen.getByRole('button', { name: buttonLabel });
        expect(button).toHaveTextContent(buttonLabel);
        
    })

    it('Deve chamar onAdd quando clicar no botão', () => {

         const onAdd = vi.fn();

         render(<EmptyTable message='Message' message2='Message2' showButton={true} buttonLabel={'Adicionar'} onAdd={onAdd}/>)

         fireEvent.click(screen.getByText('Adicionar'));
                 
        expect(onAdd).toHaveBeenCalledTimes(1);

    })

    it('Deve exibir corretamente message', () => {
        
        const message = "Mensagem";

        render(<EmptyTable message={message} message2='Message2' showButton={true} buttonLabel={'Adicionar'} onAdd={vi.fn()}/>);

        expect(screen.queryByText(message)).toBeInTheDocument();

    })

    it('Deve exibir corretamente message2', () => {
        
        const message2 = "Mensagem 2";

        render(<EmptyTable message={'Mensagem'} message2={message2} showButton={true} buttonLabel={'Adicionar'} onAdd={vi.fn()}/>);

        expect(screen.queryByText(message2)).toBeInTheDocument();
        
    })



    
})