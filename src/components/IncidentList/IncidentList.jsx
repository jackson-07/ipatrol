import IncidentItem from '../IncidentItem/IncidentItem';

export default function IncidentList({ incidents, title, onDelete }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-violet-600">{title}</h2>
            {incidents.length === 0 ? (
                <p>No Incidents.</p>
            ) : (
                <ul className="space-y-4">
                    {incidents.map((incident) => (
                        <IncidentItem 
                            key={incident._id} 
                            incident={incident} 
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}