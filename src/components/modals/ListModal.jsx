import { Button, Label, TextInput, Spinner,Modal } from 'flowbite-react';

const ListModal = ({isOpen,setIsOpen,list,isLoading}) => {
   return (
    <Modal  show={isOpen} size="md" position={'center'}  onClose={() => setIsOpen(false)} >

        <Modal.Header>{'Visualizando Lista'}</Modal.Header>

        <Modal.Body>
          
            <div>
              <Label value='Nome' className="font-semibold"/> 
              <TextInput disabled className="mt-1" type='text' value={list.name} placeholder='Digite o nome da lista' id="listName" onChange={(e)=>{}}/>
            </div>
            <div>
              <Label value='Proprietário' className="font-semibold"/> 
              <TextInput disabled className="mt-1" type='text' value={list.owner.name} placeholder='Digite o nome do proprietário da lista' id="listOwner" onChange={(e)=>{}}/>
            </div>

            {list.radios.length>0&&<>
             <div className='mt-2'>
                <Label value='Rádios' className="font-semibold" /> 
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                
                {list.radios.map((listItem) => (
                    <div
                    key={listItem.id}
                   
                    className={`px-3 py-1 rounded-full text-sm border transition bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200`}
                    >
                    {listItem.radio.name}
                    </div>
                ))}
            </div></>}
            
        
       
        </Modal.Body>

        <Modal.Footer>
            <Button disabled={isLoading} onClick={() => setIsOpen(false)}>{isLoading ? <Spinner size='sm'/> : 'Fechar'}</Button>
        </Modal.Footer>

      </Modal>
  )
}

export default ListModal