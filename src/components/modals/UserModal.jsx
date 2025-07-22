import { Button, Label, TextInput, Spinner,Modal } from 'flowbite-react';

const UserModal = ({isOpen,setIsOpen,title,onSave,user,setUser,isLoading,errorMessage}) => {

   return (
    <Modal  show={isOpen} size="md" position={'center'}  onClose={() => setIsOpen(false)} >

        <Modal.Header>{title}</Modal.Header>

        <Modal.Body>
          
            <div>
              <Label value='Nome' className="font-semibold"/> 
              <TextInput className="mt-1" type='text' value={user.name} placeholder='Digite o nome do usuário' id="name" onChange={(e)=>setUser({...user,name:e.target.value})}/>
            </div>
             <div>
              <Label value='Email' className="font-semibold"/> 
              <TextInput disabled className="mt-1" type='email' value={user.email} placeholder='Digite o email do usuário' id="name" onChange={(e)=>setUser({...user,email:e.target.value})}/>
            </div>
            {errorMessage&&<div className='flex'><span className='mt-4 text-sm text-red-600'>{errorMessage}</span></div>}
       
        </Modal.Body>

        <Modal.Footer>
            <Button disabled={isLoading} onClick={()=>onSave()}>{isLoading ? <Spinner size='sm'/> : 'Salvar'}</Button>
            <Button color="gray" disabled={isLoading} onClick={() => setIsOpen(false)}>Cancelar</Button>
        </Modal.Footer>

      </Modal>
  )

}

export default UserModal