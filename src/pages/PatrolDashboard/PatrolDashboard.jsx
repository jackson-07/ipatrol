import { useState, useEffect } from 'react';

export default function PatrolDashBoard () {

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        start_time: '',
        end_time: '',
        total_hours: ''
    });

    const toggleForm = () => {
        setShowForm(!showForm)
    };

    const handleForm = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/patrols', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create patrol');
            }

            const data = await response.json();
            console.log('Patrol created:', data);

            setFormData({
                start_time: '',
                end_time: '',
                total_hours: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error('Error creating patrol:', error);
            
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={toggleForm}>
                {showForm ? 'Cancel' : 'Create New Patrol'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="start_time">Start Time:</label>
                        <input
                            type="datetime-local"
                            id="start_time"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="end_time">End Time:</label>
                        <input
                            type="datetime-local"
                            id="end_time"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="total_hours">Total Hours:</label>
                        <input
                            type="number"
                            id="total_hours"
                            name="total_hours"
                            value={formData.total_hours}
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <button type="submit">Create Patrol</button>
                </form>
            )}
        </div>
    );
}