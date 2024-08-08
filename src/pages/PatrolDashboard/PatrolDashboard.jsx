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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-black-600">Dashboard</h1>
            <button 
                onClick={toggleForm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                {showForm ? 'Cancel' : 'Create New Patrol'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="start_time" className="block text-gray-700 text-sm font-bold mb-2">Start Time:</label>
                        <input
                            type="datetime-local"
                            id="start_time"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleForm}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="end_time" className="block text-gray-700 text-sm font-bold mb-2">End Time:</label>
                        <input
                            type="datetime-local"
                            id="end_time"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleForm}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="total_hours" className="block text-gray-700 text-sm font-bold mb-2">Total Hours:</label>
                        <input
                            type="number"
                            id="total_hours"
                            name="total_hours"
                            value={formData.total_hours}
                            onChange={handleForm}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Create Patrol
                    </button>
                </form>
            )}

            <div className="patrols-list mt-8">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Your Patrols</h2>
                
            </div>
        </div>
    );
}