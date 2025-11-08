import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor,within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import TableCities from '../../../src/components/tables/TableCities'


// {cities,onEdit,onDelete,totalPages,currentPage,onPageChange}
describe('Table Cities', () => {
    
   it('should render a table of Cities when array cities has items', () => {
      const cities = [
        {id:1,name:'Campos do Jordão',state:'SP'},
        {id:2,name:'Taubaté',state:'SP'},
        {id:4,name:'Pindamonhangaba',state:'SP'}
      ] 

      render(<TableCities cities={cities} onEdit={()=>{}} onDelete={()=>{}} totalPeges={1} currentPage={1} onPageChange={()=>{}}/>)

      const table = screen.getByRole('table');
      expect(within(table).getByText(cities[0].name)).toBeInTheDocument();
      cities.forEach(city=>{

        const tdName = screen.getByRole('cell',{name: city.name});
        expect(tdName).toBeInTheDocument();
       
     
      })
     
   })

   it('should render a table without rows when cities length equals zero', () => {

     render(<TableCities cities={[]} onEdit={()=>{}} onDelete={()=>{}} totalPeges={1} currentPage={1} onPageChange={()=>{}}/>);

     const tbody = screen.getByRole('table').querySelector('tbody');
     const bodyRows = within(tbody).queryAllByRole('row');

     expect(bodyRows).toHaveLength(0);

   })

})