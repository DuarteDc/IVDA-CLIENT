import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export const AlertModal = ({ title, isOpen, onOpen, onOpenChange, callback, children, size = "xl", showControls = true }) => {

    return (
        <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="overflow-visible"
            placement="auto"
            size={size}
            
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="overflow-visible flex items-center flex-col gap-1">{title}</ModalHeader>
                        <ModalBody className="overflow-visible">
                            {children}
                        </ModalBody>
                        {
                            showControls && (
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button color="primary" onPress={() => { onClose(); callback() }}>
                                        Aceptar
                                    </Button>
                                </ModalFooter>
                            )
                        }
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
