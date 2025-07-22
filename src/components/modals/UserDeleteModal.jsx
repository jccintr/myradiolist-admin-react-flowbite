
import { Button, Label,Spinner,Modal,TextInput } from 'flowbite-react';
import { useState } from 'react';

const UserDeleteModal = ({isOpen,setIsOpen,title,description,deleteAction,isLoading,confirmText}) => {
    const [digitedConfirmText,setDigitedConfirmText] = useState('');

  return (
     <Modal  show={isOpen} size="md" position={'center'}  onClose={() => setIsOpen(false)} >
            <Modal.Body>
               <div className='flex flex-col'>
                 <Label className='text-slate-950 text-lg font-semibold mb-2'>{title}</Label>
                 <Label className='text-gray-500'>{description}</Label>
               </div>
               <div>
                <div className="mb-2 mt-2 block">
                    <Label className='text-black font-semibold text-xs' htmlFor="small">Para confirmar, digite "{confirmText}" abaixo:</Label>
                    </div>
                    <TextInput id="small" type="text" sizing="sm" onChange={(e)=>setDigitedConfirmText(e.target.value)}/>
                </div>
            </Modal.Body>
    
            <Modal.Footer>
                <Button color='failure' disabled={isLoading||confirmText!=digitedConfirmText} onClick={()=>deleteAction()}>{isLoading ? <Spinner size='sm'/> : 'DELETAR'}</Button>
                <Button color="gray" disabled={isLoading} onClick={() => setIsOpen(false)}>Cancelar</Button>
            </Modal.Footer>
    
          </Modal>
  )
}

export default UserDeleteModal