import { useState, useEffect } from 'react';
import sendRequest from '../../utilities/send-request';

export default function PatrolDashBoard () {

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        start_time: '',
        end_time: '',
        total_hours: 0
    });

    const [patrols, setPatrols] = useState([]);

    useEffect(() => {
        fetchPatrols();
    }, []);

    const fetchPatrols = async () => {
        try {
            const response = await fetch('/api/patrols');
            const data = await response.json();
            setPatrols(data);
        } catch (error) {
            console.error('Error fetching patrols:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm)
    };

    const handleForm = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'total_hours' ? Number(value): value
        }));
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        try {
            const data = await sendRequest('/api/patrols', 'POST', formData);
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

            <div className="patrols-list">
                <h2>Your Patrols</h2>
            </div>
        </div>
    );
}