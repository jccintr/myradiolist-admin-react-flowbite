
import { FaEye } from "react-icons/fa";
import { Table,Button } from "flowbite-react";
import Pagination from "../Pagination";
import { tableCustomTheme } from "../../theme/TableTheme";

const TableLists = ({lists,onView,totalPages,currentPage,onPageChange}) => {
  return (
     <>
     <Table hoverable theme={tableCustomTheme} >
         <Table.Head>
           <Table.HeadCell>Nome</Table.HeadCell>
           <Table.HeadCell className='hidden md:table-cell'>Proprietário</Table.HeadCell>
           <Table.HeadCell>Rádios</Table.HeadCell>
           <Table.HeadCell className='flex justify-end'>Ações</Table.HeadCell>
         </Table.Head>
         <Table.Body className="divide-y">
         {lists.map((list) => (
              <Table.Row className="bg-white" key={list.id}>
                   <Table.Cell className='text-slate-950'>{list.name}</Table.Cell>
                   <Table.Cell className='text-slate-950 hidden md:table-cell'>{list.owner.name}</Table.Cell>
                   <Table.Cell className='text-slate-950'>{list.radios.length}</Table.Cell>
                   <Table.Cell className='flex justify-end'>
                           <div className='flex flex-row gap-2'>

                             {list.radios.length>0&&<Button size="xs" onClick={()=>onView(list)}><FaEye/></Button>}
                            
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

export default TableLists