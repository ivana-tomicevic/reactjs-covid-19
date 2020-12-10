import './App.css';
import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import { Cards } from './components/Cards/Cards'
import  Map  from './components/Map/Map'
import Table from './components/Table/Table'
import Chart from './components/Chart/Chart'
import { fetchCountriesData, fetchData } from './api/api'
import { sortData } from "./util";
import "leaflet/dist/leaflet.css"


function App() {
const [countries, setCountries] = useState([]);
const [country, setCountry] = useState('worldwide');
const [countryInfo, setCountryInfo] = useState({});
const [tableData, setTableData] = useState([]);
const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 }); 
const [mapZoom, setMapZoom] = useState(3)
const [mapCountries, setMapCountries] = useState([]); 
const [casesType, setCasesType] = useState("cases");

useEffect(() => {
    const fetch = async () => {
      await fetchData()
      .then(({ data }) => {
    setCountryInfo(data);
      })
    };
    fetch();
}, []);

useEffect(() => {
  const getCountriesData = async () => {
    await fetchCountriesData()
    .then(({ data }) => {
      const countries = data.map((country) => ( {
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      setCountries(countries);
      let sortedData = sortData(data);
      setTableData(sortedData);
      setMapCountries(data);
    });
  };
  getCountriesData();
}, [])

const onCountryChange = async (event) => {
const countryCode = event.target.value;
 await fetchData(countryCode)
 .then(({ data }) => {
setCountry(countryCode);
setCountryInfo(data);
const center = countryCode === "worldwide" ?
 { lat: 34.80746, lng: -40.4796 } :
 { lat: data.countryInfo.lat, lng: data.countryInfo.long };
setMapCenter(center);
countryCode === "worldwide" ? setMapZoom(3) : setMapZoom(4);

 })
};

  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
      <h1>COVID-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
          <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      <div className="app__stats">
          <Cards 
          isRed
          active={casesType === "cases"} 
          onClick={() => setCasesType("cases")} 
          title="Coronavirus Cases" 
          cases={countryInfo.todayCases} 
          total={countryInfo.cases}/>
          <Cards 
          active={casesType === "recovered"} 
          onClick={() => setCasesType("recovered")} 
          title="Recovered" 
          cases={countryInfo.todayRecovered} 
          total={countryInfo.recovered}/>
          <Cards  
            isRed
            active={casesType === "deaths"} 
            onClick={() => setCasesType("deaths")}
            title="Deaths" cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths}/>
      </div>
      <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType={casesType}/>
    </div>
            <Card className="app__right">
              <CardContent>
                <div className="app__information">
                  <h3>Live cases</h3>
                  <Table countries={tableData} />
                    <h3>Worldwide new {casesType}</h3>
                  <Chart casesType={casesType}/>
                  </div>
              </CardContent>
            </Card>
    </div>
    
  );
}

export default App;
