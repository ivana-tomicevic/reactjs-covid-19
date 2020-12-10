import React from 'react'
import numeral from 'numeral'
import "./Table.css"

const Table = ({ countries }) => (
   <div className="container">
 <table className="table" >
         <tbody>
           {countries.map(({country, cases}) => (
               <tr key={country}>
                   <td>{country}</td>
           <td><strong>{numeral(cases).format()}</strong></td>
               </tr>
           ))}
     </tbody>
   </table>
   </div>
    )


export default Table
