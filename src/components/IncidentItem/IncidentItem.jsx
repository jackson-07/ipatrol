import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';

export default function IncidentItem({ incident }) {
    return (
        <li className="border p-4 rounded-lg shadow bg-gray-100 flex justify-between items-center">
            <div>
                <p><strong>Patrol:</strong> {incident.patrol}</p>
                <p><strong>Time:</strong> {incident.incident_time}</p>
                <p><strong>Description:</strong> {incident.description}</p>
                <p><strong>Actions Taken:</strong> {incident.actions_taken}</p>
            </div>
            <div className="flex space-x-2">
                <EditButton />
                <DeleteButton />
            </div>
        </li>
    );
}