import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Table,Button } from "flowbite-react";
import Pagination from "../Pagination";
import { tableCustomTheme } from "../../theme/TableTheme";

const TableRadios = ({radios,onEdit,onDelete,totalPages,currentPage,onPageChange}) => {
   return (
    <>
    <Table hoverable theme={tableCustomTheme}>
        <Table.Head>
          <Table.HeadCell>Nome</Table.HeadCell>
           <Table.HeadCell className='hidden md:table-cell'>Cidade</Table.HeadCell>
           <Table.HeadCell  className='hidden md:table-cell'>Categorias</Table.HeadCell>
          <Table.HeadCell className='flex justify-end'>Ações</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {radios.map((radio) => (
             <Table.Row className="bg-white" key={radio.id}>
                  <Table.Cell className='text-slate-950'>{radio.name}</Table.Cell>
                   <Table.Cell className='text-slate-950 hidden md:table-cell'>{radio.city.name+' - '+radio.city.state}</Table.Cell>
                   <Table.Cell className='text-slate-950 hidden md:table-cell'>{radio.categories.map((category) => (
                    <div
                    key={category.id}
                    className={`inline-block ml-1 px-2 py-1 rounded-full text-xs border transition text-white bg-green-500`}
                    >
                       {category.name}
                    </div>
                ))}</Table.Cell>
                  <Table.Cell className='flex justify-end'>
                          <div className='flex flex-row gap-2'>
                            <Button size="xs"   onClick={()=>onEdit(radio)}><LuPencil/></Button>
                            <Button size="xs"  color="failure" onClick={()=>onDelete(radio)}><FaRegTrashAlt/></Button>
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

export default TableRadios