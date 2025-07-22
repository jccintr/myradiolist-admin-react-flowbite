import { Button,Spinner } from 'flowbite-react';
import {useState,useEffect,useContext} from 'react'
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
import TableCities from '../../components/tables/TableCities';
import CityModal from '../../components/modals/CityModal';
import DeleteModal from '../../components/modals/DeleteModal';
import ErrorAlertModal from '../../components/modals/ErrorAlertModal';

const Cities = () => {
  const [cities,setCities] = useState([]);
  const {token} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingList,setIsLoadingList] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isModalDeleteOpen,setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen,setIsModalEditOpen] = useState(false);
  const [isErrorAlertModalOpen,setIsErrorAlertModalOpen] = useState(false);
  const [modalAlertErrorMessage,setModalAlertErrorMessage] = useState('');
  const [city,setCity] = useState({id:0,name:'',state:''});
  const [errorMessage,setErrorMessage] = useState(null);
  const [totalPages,setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
      getCities();
    },[]);
  
  const getCities = async (page) => {
    setIsLoadingList(true);
    const response = await api.getCitiesPaged(token,page);
    if(response.ok){
       const json = await response.json();
       setTotalPages(json.totalPages);
       setCities(json.content);
      
    }       
    setIsLoadingList(false);
  }

 const onChangePage = async (page) => {
 
     const apiPage = page - 1;
     setCurrentPage(page);
     getCities(apiPage);

 }
  
  const onAdd = () => {
      setCity({id:0,name:'',state:''});
      setErrorMessage(null);
      setIsModalOpen(true);
  }
  
  const onEdit = (city) => {
      setCity(city);
      setErrorMessage(null);
      setIsModalEditOpen(true);
  }
  
  const onDelete = (city) => {
    setCity(city);
    setIsModalDeleteOpen(true);
  }
  
  const addCity = async  () => {
    
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
         getCities();
         setIsLoading(false);
         setIsModalOpen(false);
      }
      setIsLoading(false);
  }
  
  const updateCity = async  () => {
  
    if(city.name.trim().length===0){
      setErrorMessage('Nome da cidade inválido.');
      return;
     }

     if(city.state.trim().length===0){
      setErrorMessage('Estado inválido.');
      return;
     }
  
     setIsLoading(true);
      const response = await api.updateCity(token,city.id,city.name,city.state);
      if(response.ok){
         getCities();
         onChangePage(currentPage);
         setIsLoading(false);
         setIsModalEditOpen(false);
      }
      setIsLoading(false);
  }
  
  const deleteCity = async () => {
   setIsLoading(true);
    const response = await api.deleteCity(token,city.id);
    if(response.ok){
      getAll();
      setIsLoading(false);
      setIsModalDeleteOpen(false);
      return;
    }
    setIsModalDeleteOpen(false);
    const result = await response.json();
    const error = result.error;
    setIsLoading(false);
    setIsErrorAlertModalOpen(true);
    setModalAlertErrorMessage(error);
    return;
  }
  

 return (
    <div className='w-full p-5  mx-auto'>
    <div className='flex w-full flex-row justify-between mb-4'>
      <h1 className='text-3xl font-semibold text-blue-800'>Cidades</h1>
      <Button onClick={()=>onAdd()}>Nova Cidade</Button>
    </div>
    {isLoadingList?<Spinner className='absolute top-1/2 left-1/2' color='gray' size="xl" />:<TableCities cities={cities} onEdit={onEdit} onDelete={onDelete} totalPages={totalPages} currentPage={currentPage} onPageChange={onChangePage}/>}
    <CityModal errorMessage={errorMessage} isLoading={isLoading} city={city} setCity={setCity} isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={'Nova Cidade'} onSave={addCity} />
    <CityModal errorMessage={errorMessage} isLoading={isLoading} city={city} setCity={setCity} isOpen={isModalEditOpen} setIsOpen={setIsModalEditOpen} title={'Editando Cidade'} onSave={updateCity}/>
    <DeleteModal isLoading={isLoading} deleteAction={deleteCity} isOpen={isModalDeleteOpen} setIsOpen={setIsModalDeleteOpen} title="Deseja deletar esta cidade ?" description={'Esta ação excluirá a cidade do banco de dados e não poderá ser revertida.'}/>
    <ErrorAlertModal isOpen={isErrorAlertModalOpen} setIsOpen={setIsErrorAlertModalOpen} errorMessage={modalAlertErrorMessage}/>
</div>
  )



}

export default Cities