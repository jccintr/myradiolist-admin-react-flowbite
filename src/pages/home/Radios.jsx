import {useEffect,
        useState,
        useContext
       } from 'react'
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
import { Button,
         Spinner
       } from 'flowbite-react';
import EmptyTable from '../../components/EmptyTable';
import TableRadios from '../../components/tables/TableRadios';
import RadioModal from '../../components/modals/RadioModal';
import DeleteModal from '../../components/modals/DeleteModal';
import ErrorAlertModal from '../../components/modals/ErrorAlertModal';

const Radios = () => {
  const [radios,setRadios] = useState([]);
  const {token} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingList,setIsLoadingList] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isModalDeleteOpen,setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen,setIsModalEditOpen] = useState(false);
  const [isErrorAlertModalOpen,setIsErrorAlertModalOpen] = useState(false);
  const [modalAlertErrorMessage,setModalAlertErrorMessage] = useState('');
  const [radio,setRadio] = useState({
    id:0,
    name:'',
    shortName:'',
    streamUrl:'',
    imageUrl:'',
    hsl:false,
    cityId:0,
    categories:[]
  });
  const [errorMessage,setErrorMessage] = useState(null);
  const [cities,setCities] = useState([]);
  const [categories,setCategories] = useState([]);
  const [totalPages,setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(()=>{
      getRadios();
    },[]);

   useEffect(()=>{
      getCities();
      getCategories();
     },[]);
  
    const getCities = async () => {
        const response = await api.getAllCities(token);
        if(response.ok){
            const json = await response.json();
            setCities(json);
        }       
     }

     const getCategories = async () => {
         const response = await api.getAllCategories(token);
         if(response.ok){
             const json = await response.json();
             setCategories(json);
         }       
      }

     const getRadios = async (page=0) => {
        setIsLoadingList(true)
        const response = await api.getRadiosPaged(page);
         if(response.ok){
           const json = await response.json();
           setTotalPages(json.totalPages);
           setRadios(json.content);
           setIsLoadingList(false)
         }
       setIsLoadingList(false);
    }

const onChangePage = async (page) => {
 
     const apiPage = page - 1;
     setCurrentPage(page);
     await getRadios(apiPage);

 }
const onAdd = () => {
  setRadio({
    id:0,
    name:'',
    shortName:'',
    streamUrl:'',
    imageUrl:'',
    hsl:false,
    cityId:0,
    categories:[]
  });
  setErrorMessage(null);
  setIsModalOpen(true);
}

const onEdit = (radio) => {
  
  setRadio({
    id:radio.id,
    name:radio.name,
    shortName:radio.shortName,
    streamUrl: radio.streamUrl,
    imageUrl:radio.imageUrl,
    hsl:radio.hsl,
    cityId:radio.city.id,
    categories: JSON.parse(JSON.stringify(radio.categories)),
  });
  setErrorMessage(null);
  setIsModalEditOpen(true);
}

const onDelete = (radio) => {
  setRadio(radio);
  setIsModalDeleteOpen(true);
}

const addRadio = async  () => {
 
   if(radio.name.trim().length===0){
    setErrorMessage('Informe o nome da rádio.');
    return;
   }

   if(radio.shortName.trim().length===0){
    setErrorMessage('Informe o nome curto da rádio.');
    return;
   }

   if(radio.streamUrl.trim().length===0){
    setErrorMessage('Informe a url de transmissão da rádio.');
    return;
   }

   if(radio.imageUrl.trim().length===0){
    setErrorMessage('Informe a url do logo da rádio.');
    return;
   }

   
   if(radio.categories.length===0){
    setErrorMessage('Selecione pelo menos uma categoria.');
    return;
   }
    
   if(radio.cityId==0){
    setErrorMessage('Selecione uma cidade.');
    return;
   }
  
   
   const response = await api.addRadio(token,radio);
    if(response.ok){
      getRadios();
      setIsModalOpen(false);
    } else {
      const json = await response.json();
      setErrorMessage(json.error || 'Erro ao adicionar rádio');
    }

}

const updateRadio = async  () => {
  if(radio.name.trim().length===0){
    setErrorMessage('Informe o nome da rádio.');
    return;
   }

   if(radio.shortName.trim().length===0){
    setErrorMessage('Informe o nome curto da rádio.');
    return;
   }

   if(radio.streamUrl.trim().length===0){
    setErrorMessage('Informe a url de transmissão da rádio.');
    return;
   }

   if(radio.imageUrl.trim().length===0){
    setErrorMessage('Informe a url do logo da rádio.');
    return;
   }

   if(radio.categories.length===0){
    setErrorMessage('Selecione pelo menos uma categoria.');
    return;
   }
   if(radio.cityId==0){
    setErrorMessage('Selecione uma cidade.');
    return;
   }

  
   const response = await api.updateRadio(token,radio.id,radio);
   if(response.ok){
     onChangePage(currentPage);
     setIsModalEditOpen(false);
   } else {
     const json = await response.json();
    setErrorMessage(json.error || 'Erro ao adicionar rádio');
   }

   
}

const deleteRadio = async () => {

       setIsLoading(true);
       const response = await api.deleteRadio(token,radio.id);
      
       if(response.ok){
         getRadios();
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
          <h1 className='text-3xl font-semibold text-blue-800'>Rádios</h1>
          <Button onClick={()=>onAdd()}>Nova Rádio</Button>
        </div>
        
        {isLoadingList&&<Spinner 
                           className='absolute top-1/2 left-1/2' 
                           color='gray' 
                           size="xl" />}
        {!isLoadingList&&radios.length>0&&<TableRadios 
                                             radios={radios} 
                                             onEdit={onEdit} 
                                             onDelete={onDelete} 
                                             totalPages={totalPages} 
                                             currentPage={currentPage} 
                                             onPageChange={onChangePage}
                                             />}
        {!isLoadingList&&radios.length==0&&<EmptyTable 
                                            buttonLabel='Adicionar Rádio' 
                                            message='Rádios não encontradas.' 
                                            message2='' 
                                            onAdd={onAdd}/>}
        <RadioModal 
            categories={categories} 
            cities={cities} 
            errorMessage={errorMessage} 
            isLoading={isLoading} 
            radio={radio} 
            setRadio={setRadio} 
            isOpen={isModalOpen} 
            setIsOpen={setIsModalOpen} 
            title={'Nova Rádio'}  
            onSave={addRadio}
        />
        <RadioModal 
           categories={categories} 
           cities={cities} 
           errorMessage={errorMessage} 
           isLoading={isLoading} 
           radio={radio} 
           setRadio={setRadio} 
           isOpen={isModalEditOpen} 
           setIsOpen={setIsModalEditOpen} 
           title={'Editando Rádio'}  
           onSave={updateRadio}
        />
        <DeleteModal 
           isLoading={isLoading} 
           deleteAction={deleteRadio} 
           isOpen={isModalDeleteOpen} 
           setIsOpen={setIsModalDeleteOpen} 
           title="Deseja deletar esta rádio ?" 
           description={'Esta operação vai excluir a rádio do banco de dados e não poderá ser revertida.'}
        />
        <ErrorAlertModal 
           isOpen={isErrorAlertModalOpen} 
           setIsOpen={setIsErrorAlertModalOpen} 
           errorMessage={modalAlertErrorMessage}
        />
    </div>
  )
  
}

export default Radios