import { Modal, Button } from 'flowbite-react';
import { HiExclamationCircle } from 'react-icons/hi';

export default function ErrorAlertModal({ isOpen,setIsOpen, errorMessage }) {
  return (
    <Modal show={isOpen}  onClose={() => setIsOpen(false)} size="md" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600" />
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
            Ocorreu um erro
          </h3>
          <p className="mb-5 text-sm text-gray-500 dark:text-gray-300">
            {errorMessage}
          </p>
          <div className="flex justify-center">
            <Button onClick={() => setIsOpen(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
