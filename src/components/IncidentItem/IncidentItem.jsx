import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';

export default function IncidentItem({ incident, onDelete, onEdit }) {
    return (
        <li className="border p-4 rounded-lg shadow bg-gray-100 flex justify-between items-center">
            <div>
                {incident.patrol && <p><strong>Patrol:</strong> {incident.patrol}</p>}
                {incident.incident_time && <p><strong>Incident Time:</strong> {incident.incident_time}</p>}
                {incident.description && <p><strong>Description:</strong> {incident.description}</p>}
                {incident.actions_taken && <p><strong>Actions Taken:</strong> {incident.actions_taken}</p>}
            </div>
            <div className="flex space-x-2">
                <EditButton onClick={() => onEdit(incident)}/>
                <DeleteButton onClick={() => onDelete(incident._id)}/>
            </div>
        </li>
    );
}