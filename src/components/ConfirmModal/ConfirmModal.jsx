export default function ConfirmModal({ isOpen, onConfirm, onCancel, message}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end space-x-2">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}