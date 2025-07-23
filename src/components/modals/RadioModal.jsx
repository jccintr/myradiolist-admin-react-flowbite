import {useState,useEffect} from 'react';
import { Button, Label, TextInput, Spinner,Modal,Checkbox } from 'flowbite-react';
import SelectInput from '../inputs/SelectInput';

const RadioModal = ({isOpen,setIsOpen,title,onSave,radio,setRadio,isLoading,errorMessage,cities,categories}) => {
     const [selectedCity,setSelectedCity] = useState(radio.cityId);
    
    
    
    
      useEffect(()=>{
        setRadio({...radio,cityId:selectedCity})
      },[selectedCity]);
    
    const toggleCategory = (category) => {
        let newCategories = radio.categories;
        const categoryIndex = newCategories.findIndex(cat => cat.id === category.id);
    
        if (categoryIndex !== -1) { // Categoria existe, então remove

            newCategories.splice(categoryIndex, 1);
          
        } else {  // Categoria não existe, então adiciona

            newCategories.push(category);
            
        }
        setRadio({...radio,categories:newCategories})
    }
     
  return (
    <Modal  show={isOpen} size="2xl" position={'center'}  onClose={() => setIsOpen(false)} >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
            <div>
              <Label value='Nome' className="font-semibold"/> 
              <TextInput className="mt-1" type='text' value={radio.name} placeholder='Digite o nome da rádio' id="name" onChange={(e)=>setRadio({...radio,name:e.target.value})}/>
            </div>
            <div>
              <Label value='Nome curto' className="font-semibold"/> 
              <TextInput className="mt-1" type='text' value={radio.shortName} placeholder='Digite o nome curto da rádio' id="shortName" onChange={(e)=>setRadio({...radio,shortName:e.target.value})}/>
            </div>
            <div>
              <Label value='Stream URL' className="font-semibold"/> 
              <TextInput className="mt-1" type='text' value={radio.streamUrl} placeholder='Digite a url da transmissão' id="streamUrl" onChange={(e)=>setRadio({...radio,streamUrl:e.target.value})}/>
            </div>
            <div>
              <Label value='Imagem URL' className="font-semibold"/> 
              <TextInput className="mt-1" type='text' value={radio.imageUrl} placeholder='Digite a url da imagem' id="imagemUrl" onChange={(e)=>setRadio({...radio,imageUrl:e.target.value})}/>
            </div>
            <div>
               <Label  value='Cidade' className="font-semibold"/>
               <SelectInput  data={cities} placeholder={'Selecione uma cidade'} onChange={setSelectedCity} selected={radio.cityId}/>
            </div>
            <div className='mt-2'>
              <Checkbox id="hsl" checked={radio.hsl} onChange={(e)=>setRadio({...radio,hsl:!radio.hsl})} />
              <Label value='Transmissão HSL' className="ml-2 font-semibold" htmlFor='hsl'/> 
            </div>
            <div className='mt-2'>
                <Label value='Categorias' className="font-semibold" /> 
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                
                {categories.map((category) => (
                    <button
                    key={category.id}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm border transition 
            ${radio.categories.some(cat => cat.id === category.id)
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'}
          `}
                    >
                    {category.name}
                    </button>
                ))}
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

export default RadioModal