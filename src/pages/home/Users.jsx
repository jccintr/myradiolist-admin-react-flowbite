import { Spinner } from 'flowbite-react';
import {useState,useEffect,useContext} from 'react'
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
import TableUsers from '../../components/tables/TableUsers';
import UserModal from '../../components/modals/UserModal';
import UserDeleteModal from '../../components/modals/UserDeleteModal';
import EmptyTable from '../../components/EmptyTable';

const Users = () => {
  const [users,setUsers] = useState([]);
  const {token} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingList,setIsLoadingList] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isModalDeleteOpen,setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen,setIsModalEditOpen] = useState(false);
  const [user,setUser] = useState({id:0,name:'',email:''});
  const [errorMessage,setErrorMessage] = useState(null);
  const [totalPages,setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
        getUsers();
      },[]);
    
    const getUsers = async (page) => {
      setIsLoadingList(true);
      const response = await api.getUsers(token,page);
      if(response.ok){
         const json = await response.json();
         setTotalPages(json.totalPages);
         setUsers(json.content);
        
      }       
      setIsLoadingList(false);
    }

     const onChangePage = async (page) => {
 
     const apiPage = page - 1;
     setCurrentPage(page);
     getUsers(apiPage);

 }

    const onAdd = () => {
      setCity({id:0,name:'',email:''});
      setErrorMessage(null);
      setIsModalOpen(true);
  }
  
  const onEdit = (user) => {
      setUser(user);
      setErrorMessage(null);
      setIsModalEditOpen(true);
  }
  
  const onDelete = (user) => {
    setUser(user);
    setIsModalDeleteOpen(true);
  }

   const addUser = async  () => {
      /*
      if(city.name.trim().length===0){
        setErrorMessage('Nome da cidade inválido.');
        return;
       }
  
       if(city.state.trim().length===0){
        setErrorMessage('Estado inválido.');
        return;
       }
        
       setIsLoading(true);
        const response = await api.addCity(token,city.name,city.state);
        if(response.ok){
           getAll();
           setIsLoading(false);
           setIsModalOpen(false);
        }
        setIsLoading(false);
        */
    }
    
    const updateUser = async  () => {
    
      if(user.name.trim().length===0){
        setErrorMessage('Nome do usuário inválido.');
        return;
       }
           
       setIsLoading(true);
        const response = await api.updateUser(token,user.id,user.name);
        if(response.ok){
           onChangePage(currentPage);
           setIsLoading(false);
           setIsModalEditOpen(false);
        }
        setIsLoading(false);
        
    }
    
    const deleteUser = async () => {
      
     setIsLoading(true);
      const response = await api.deleteUser(token,user.id);
      if(response.ok){
        getUsers();
        setIsLoading(false);
        setIsModalDeleteOpen(false);
        return;
      }
      setIsModalDeleteOpen(false);
    
      return;
      
    }
   
    return (
    <div className='w-full p-5  mx-auto'>
    <div className='flex w-full flex-row justify-between mb-4'>
      <h1 className='text-3xl font-semibold text-blue-800'>Usuários</h1>
      
    </div>
    {isLoadingList&&<Spinner 
               className='absolute top-1/2 left-1/2' 
               color='gray' 
               size="xl" />}
    {!isLoadingList&&users.length>0&&<TableUsers 
               users={users} 
               onEdit={onEdit} 
               onDelete={onDelete} 
               totalPages={totalPages} 
               currentPage={currentPage} 
               onPageChange={onChangePage}/>}
    {!isLoadingList&&users.length==0&&<EmptyTable 
              buttonLabel='' 
              message='Usuários não encontrados.' 
              message2=''
              showButton={false} 
              onAdd={()=>{}}/>}
    <UserModal errorMessage={errorMessage} isLoading={isLoading} user={user} setUser={setUser} isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={'Novo Usuário'} onSave={addUser}/>
    <UserModal errorMessage={errorMessage} isLoading={isLoading} user={user} setUser={setUser} isOpen={isModalEditOpen} setIsOpen={setIsModalEditOpen} title={'Editando Usuário'} onSave={updateUser}/>
    <UserDeleteModal confirmText={user.email} isLoading={isLoading} deleteAction={deleteUser} isOpen={isModalDeleteOpen} setIsOpen={setIsModalDeleteOpen} title="Deseja deletar este usuário ?" description={'Esta ação excluirá o usuário e todas as suas listas de rádios do banco de dados e não poderá ser revertida.'}/>
</div>
  )

 
}

export default Users