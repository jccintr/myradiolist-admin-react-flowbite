import React,{useState,useEffect} from 'react';
import { Button, Label, TextInput, Spinner,Modal } from 'flowbite-react';
import SelectEstado from '../inputs/SelectEstado';


const CityModal = ({isOpen,setIsOpen,title,onSave,city,setCity,isLoading,errorMessage}) => {
    const [selectedState,setSelectedState] = useState(city.state);
     
      useEffect(()=>{
        setCity({...city,state:selectedState})
      },[selectedState]);
    
     
  return (
    <Modal  show={isOpen} size="md" position={'center'}  onClose={() => setIsOpen(false)} >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
            <div>
              <Label value='Nome' className="font-semibold"/> 
              <TextInput className="mt-1" type='text' value={city.name} placeholder='Digite o nome da cidade' id="name" onChange={(e)=>setCity({...city,name:e.target.value})}/>
            </div>
            <div>
               <Label  value='Estado' className="font-semibold"/>
               <SelectEstado onChange={setSelectedState} selected={city.state}/>
            </div>
            {errorMessage&&<div className='flex'><span className='mt-4 text-sm text-red-600'>{errorMessage}</span></div>}
        </Modal.Body>
        <Modal.Footer>
            <Button  disabled={isLoading} onClick={()=>onSave()}>{isLoading ? <Spinner size='sm'/> : 'Salvar'}</Button>
            <Button color="gray" disabled={isLoading} onClick={() => setIsOpen(false)}>Cancelar</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CityModal