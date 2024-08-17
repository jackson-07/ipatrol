import React, { useState } from 'react';

export default function CreatePatrolForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        start_time: '',
        end_time: '',
        location: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const startTime = new Date(formData.start_time);
        const endTime = new Date(formData.end_time);
        const totalHours = (endTime - startTime) / (1000 * 60 * 60);

        const submitData = {
            ...formData,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            total_hours: totalHours
        };
        onSubmit(submitData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-violet-600">Create New Patrol</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                        type="datetime-local"
                        id="start_time"
                        name="start_time"
                        value={formData.start_time}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                    />
                </div>
                <div>
                    <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">End Time</label>
                    <input
                        type="datetime-local"
                        id="end_time"
                        name="end_time"
                        value={formData.end_time}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button type="submit" className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
                        Create Patrol
                    </button>
                    <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}