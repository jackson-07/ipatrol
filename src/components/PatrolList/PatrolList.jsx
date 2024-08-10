import PatrolItem from '../PatrolItem/PatrolItem';

export default function PatrolList({ patrols, onDelete, onEdit, title }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-violet-600">{title}</h2>
            {patrols.length === 0 ? (
                <p>No {title.toLowerCase()}.</p>
            ) : (
                <ul className="space-y-4">
                    {patrols.map((patrol) => (
                        <PatrolItem 
                            key={patrol._id} 
                            patrol={patrol} 
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}