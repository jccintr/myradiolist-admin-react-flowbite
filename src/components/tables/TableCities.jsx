import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Table,Button } from "flowbite-react";
import Pagination from "../Pagination";
import { tableCustomTheme } from "../../theme/TableTheme";

const TableCities = ({cities,onEdit,onDelete,totalPages,currentPage,onPageChange}) => {
  return (
    <>
    <Table hoverable theme={tableCustomTheme}>
        <Table.Head>
          <Table.HeadCell>Nome</Table.HeadCell>
           <Table.HeadCell>Estado</Table.HeadCell>
          <Table.HeadCell className='flex justify-end'>Ações</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {cities.map((city) => (
             <Table.Row className="bg-white" key={city.id}>
                 <Table.Cell className='text-slate-950'>{city.name}</Table.Cell>
                   <Table.Cell className='text-slate-950'>{city.state}</Table.Cell>
                  <Table.Cell className='flex justify-end'>
                          <div className='flex flex-row gap-2'>
                            <Button size="xs"   onClick={()=>onEdit(city)}><LuPencil/></Button>
                            <Button size="xs"  color="failure" onClick={()=>onDelete(city)}><FaRegTrashAlt/></Button>
                          </div>
                  </Table.Cell>
             </Table.Row>
           ))}
        </Table.Body>
    </Table>
     <div className="flex overflow-x-auto justify-center mt-1">
            <Pagination
              currentPage={currentPage} 
              totalPages={totalPages}
              onPageChange={onPageChange} 
            />
      </div>
    </>
  )
}

export default TableCities