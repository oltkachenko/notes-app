import { ReactNode } from 'react';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white pt-12 p-6 rounded-lg shadow-lg w-10/12 lg:w-5/12 relative ">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 w-12 h-12"
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
}
