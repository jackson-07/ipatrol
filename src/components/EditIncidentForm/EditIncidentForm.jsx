import React, { useState, useEffect } from 'react';

export default function EditPatrolForm({ patrols, incident, onSubmit, onCancel }) {

    const [formData, setFormData] = useState({
        patrol: incident.patrol,
        incident_time: incident.incident_time,
        description: incident.description,
        actions_taken: incident.actions_taken,
    });

    useEffect(() => {
        setFormData({
            patrol: incident.patrol,
            incident_time: incident.incident_time,
            description: incident.description,
            actions_taken: incident.actions_taken,
        });
    }, [incident]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            ...formData,
        };
        onSubmit({ ...incident, ...submitData });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-violet-600">Edit Incident</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="patrol" className="block text-sm font-medium text-gray-700">Patrol</label>
                    <select
                        id="patrol"
                        name="patrol"
                        value={formData.patrol}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500">
                        <option value="">Select a patrol</option>
                        {patrols.length > 0 ? (
                            patrols.map((patrol) => (
                                <option key={patrol._id} value={patrol._id}>
                                    {new Date(patrol.start_time).toLocaleString()} - {new Date(patrol.end_time).toLocaleString()}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No patrols available</option>
                        )}
                    </select>
                </div>
                <div>
                    <label htmlFor="incident_time" className="block text-sm font-medium text-gray-700">Incident Time</label>
                    <input
                        type="time"
                        id="incident_time"
                        name="incident_time"
                        value={formData.incident_time}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        type="number"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        step="0.01"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                    />
                </div>
                <label htmlFor="actions_taken" className="block text-sm font-medium text-gray-700">Actions Taken</label>
                <textarea
                    id="actions_taken"
                    name="actions_taken"
                    value={formData.actions_taken}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500">
                </textarea>
                <div className="flex justify-end space-x-2">
                    <button type="submit" className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
                        Update Incident
                    </button>
                    <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}