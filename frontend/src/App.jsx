import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    sex: "male",
    smoker: "0",
    bmi: "",
    exerciseHours: "",
  });

  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://your-backend-url.com/predict",
        formData
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg')",
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full opacity-90">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Death Date Predictor 🏴‍☠️
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="birthYear"
            placeholder="Birth Year"
            value={formData.birthYear}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="birthMonth"
            placeholder="Birth Month"
            value={formData.birthMonth}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="birthDay"
            placeholder="Birth Day"
            value={formData.birthDay}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            name="smoker"
            value={formData.smoker}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="0">Non-Smoker</option>
            <option value="1">Smoker</option>
          </select>
          <input
            type="number"
            name="bmi"
            placeholder="BMI (e.g., 24.5)"
            value={formData.bmi}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="exerciseHours"
            placeholder="Exercise (hrs/week)"
            value={formData.exerciseHours}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Predict Death Date
          </button>
        </form>

        {prediction && (
          <p className="mt-4 text-center text-lg font-semibold text-gray-700">
            {prediction}
          </p>
        )}
      </div>

      <footer className="absolute bottom-4 text-white text-sm">
        Developed by <span className="font-bold">Sambo Selvaraj</span>
      </footer>
    </div>
  );
}

export default App;
