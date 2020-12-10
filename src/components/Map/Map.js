import React from 'react'
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet'
import './Map.css'
import MapInfo from './MapInfo/MapInfo'

 const Map = ({ countries, casesType, center, zoom}) => (
    
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
            <TileLayer 
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
         {countries.map((country) => (
       <MapInfo key={country.country} country={country} casesType={casesType}/>
       ))}
            </LeafletMap>
        </div>
    )

export default Map



