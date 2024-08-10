import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';

export default function PatrolItem({ patrol, onDelete }) {
    return (
        <li className="border p-4 rounded-lg shadow bg-gray-100 flex justify-between items-center">
            <div>
                <p><strong>Start Time:</strong> {new Date(patrol.start_time).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(patrol.end_time).toLocaleString()}</p>
                <p><strong>Total Hours:</strong> {patrol.total_hours}</p>
            </div>
            <div className="flex space-x-2">
                <EditButton />
                <DeleteButton onClick={() => onDelete(patrol._id)} />
            </div>
        </li>
    );
}