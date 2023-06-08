import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://54ea-2a04-cec0-11f7-2fa0-55fd-92a7-60f6-c436.ngrok-free.app';

const APIService = axios.create({
    baseURL: baseURL
});

APIService.defaults.headers.common['Content-Type'] = "application/json";

const getData = async () => {
    try {
        const userData = JSON.parse(await AsyncStorage.getItem('userData'))
        if (userData && userData.token) {
            APIService.defaults.headers.common['Authorization'] = userData.token;
        }
    } catch(e) {}
}
getData()


APIService.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        let message = "Une erreur est survenue.";

        // Erreurs venant du controller
        if (error.response.data.error) {
            message = error.response.data.error;
        }

        // Erreurs de validation
        if (error.response.data.details) {
            message = error.response.data.details[0]?.message
        }

        throw {
            message: message
        };
    }
)

export default APIService;

export { APIService };