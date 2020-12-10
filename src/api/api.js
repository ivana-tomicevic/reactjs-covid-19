import axios from 'axios'

const url = "https://disease.sh/v3/covid-19";

export const fetchCountriesData = async () => {
try {
    return await axios.get(`${url}/countries`);
    
} catch (error) {
    return error;
}
}

export const fetchData = async (countryCode) => {
    
const countryUrl = countryCode && (countryCode !== 'worldwide') ? `${url}/countries/${countryCode}` : `${url}/all`;
try {
    return await axios.get(countryUrl)
} catch (error) {
    return error;
}
}

export const fetchChartData = async () => {
    try {
        return await axios.get(`${url}/historical/all?lastdays=120`)
    } catch (error) {
        return error;
    }
}