// /frontend/admin-panel/src/api/checadaAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/checadas';

export const getChecadas = () => axios.get(API_URL);

// No necesitamos POST aquí, ese lo hace el lector RFID.