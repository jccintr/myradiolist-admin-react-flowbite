import {useEffect,
        useState,
        useContext
       } from 'react'
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
import { Spinner } from 'flowbite-react';
import TableLists from '../../components/tables/TableLists';
import ListModal from '../../components/modals/ListModal';
import ErrorAlertModal from '../../components/modals/ErrorAlertModal';

const Lists = () => {
  const [lists,setLists] = useState([]);
  const {token} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingList,setIsLoadingList] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isErrorAlertModalOpen,setIsErrorAlertModalOpen] = useState(false);
  const [modalAlertErrorMessage,setModalAlertErrorMessage] = useState('');
   const [errorMessage,setErrorMessage] = useState(null);
  const [list,setList] = useState({
    id:0,
    name:'',
    owner:{name:''},
    radios:[]
  });
  const [totalPages,setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
        getLists();
      },[]);
    
    const getLists = async (page) => {
      setIsLoadingList(true);
      const response = await api.getLists(token,page);
      if(response.ok){
         const json = await response.json();
         setTotalPages(json.totalPages);
         setLists(json.content);
        
      }       
      setIsLoadingList(false);
    }
  
   const onChangePage = async (page) => {
   
       const apiPage = page - 1;
       setCurrentPage(page);
       getLists(apiPage);
  
   }
const onView = (list) => {
      setList(list);
      setErrorMessage(null);
      setIsModalOpen(true);
  }

 
  


  return (
    <div className='w-full p-5  mx-auto'>
    <div className='flex w-full flex-row justify-between mb-4'>

      <h1 className='text-3xl font-semibold text-blue-800'>Listas de Rádios</h1>
     
    </div>
    {isLoadingList?<Spinner className='absolute top-1/2 left-1/2' color='gray' size="xl" />:<TableLists lists={lists} onView={onView} totalPages={totalPages} currentPage={currentPage} onPageChange={onChangePage}/>}
    <ListModal errorMessage={errorMessage} isLoading={isLoading} list={list} isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={'Dados da Lista'} />
   
    <ErrorAlertModal isOpen={isErrorAlertModalOpen} setIsOpen={setIsErrorAlertModalOpen} errorMessage={modalAlertErrorMessage}/>
</div>
  )
  
}

export default Lists