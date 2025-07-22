import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Table,Button } from "flowbite-react";
import Pagination from "../Pagination";


const TableCategories = ({categories,onEdit,onDelete,totalPages,currentPage,onPageChange}) => {
  return (
    <>
    <Table hoverable >
        <Table.Head>
          <Table.HeadCell>Nome</Table.HeadCell>
          <Table.HeadCell className='flex justify-end'>Ações</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {categories.map((category) => (
             <Table.Row className="bg-white" key={category.id}>
                  <Table.Cell className='text-slate-950'>{category.name}</Table.Cell>
                  <Table.Cell className='flex justify-end'>
                          <div className='flex flex-row gap-2'>
                            <Button size="xs"   onClick={()=>onEdit(category)}><LuPencil/></Button>
                            <Button size="xs"  color="failure" onClick={()=>onDelete(category)}><FaRegTrashAlt/></Button>
                          </div>
                  </Table.Cell>
             </Table.Row>
           ))}
        </Table.Body>
    </Table>
    <div className="flex overflow-x-auto sm:justify-center mt-1">
        <Pagination
          currentPage={currentPage} 
          totalPages={totalPages}
          onPageChange={onPageChange} 
        />
     </div>
  </>
  )
}

export default TableCategories