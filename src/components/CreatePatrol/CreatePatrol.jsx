import React, { useState } from 'react';

export default function CreatePatrolForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        start_time: '',
        end_time: '',
        total_hours: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            start_time: new Date(formData.start_time).toISOString(),
            end_time: new Date(formData.end_time).toISOString(),
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
                    <label htmlFor="total_hours" className="block text-sm font-medium text-gray-700">Total Hours</label>
                    <input
                        type="number"
                        id="total_hours"
                        name="total_hours"
                        value={formData.total_hours}
                        onChange={handleChange}
                        step="0.01"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
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
