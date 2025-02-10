import React from 'react'

interface EditButtonProps {
    onEdit: () => void;
}

export default function EditButton({onEdit}: EditButtonProps) {
    return (
        <button 
            onClick={onEdit} 
            className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
        >
            Edit
        </button>
    )
}
