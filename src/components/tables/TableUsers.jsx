import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Table,Button } from "flowbite-react";
import Pagination from "../Pagination";

const TableUsers = ({users,onEdit,onDelete,totalPages,currentPage,onPageChange}) => {
   return (
      <>
      <Table hoverable >
          <Table.Head>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Roles</Table.HeadCell>
            <Table.HeadCell className='flex justify-end'>Ações</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {users.map((user) => (
               <Table.Row className="bg-white" key={user.id}>
                    <Table.Cell className='text-slate-950'>{user.name}</Table.Cell>
                    <Table.Cell className='text-slate-950'>{user.email}</Table.Cell>
                    <Table.Cell className='text-slate-950'>{user.roles.map((role,index) => (
                    <button
                    key={index}
                    onClick={() => {}}
                    className={`ml-1 px-2 py-1 rounded-full text-xs border transition text-white bg-green-500`}
                    >
                    {role.authority}
                    </button>
                ))}</Table.Cell>
                    <Table.Cell className='flex justify-end'>
                            <div className='flex flex-row gap-2'>
                              <Button size="xs"   onClick={()=>onEdit(user)}><LuPencil/></Button>
                              <Button size="xs"  color="failure" onClick={()=>onDelete(user)}><FaRegTrashAlt/></Button>
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

export default TableUsers