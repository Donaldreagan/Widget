import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Salesbycountry() {
    const [product, setproduct] = useState([0]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalPercentage, setTotalPercentage] = useState(0);

    const fetchapi = async () => {
        const ulr = "https://660136f487c91a11641a4f38.mockapi.io/data/id";
        await fetch(ulr)
            .then(response => response.json())
            .then(data => setproduct(data))
            .then(()=>console.log(product))
    }
    useEffect(()=>{
        fetchapi();
    },[])

    const calculateTotal = () => {
        const salesTotal = product.reduce((acc, { sales }) => acc + sales, 0);
        const percentageTotal = product.reduce((acc, { percentage }) => acc + Number(percentage), 0);
        setTotalSales(salesTotal);
        setTotalPercentage(percentageTotal);
    };
    useEffect(()=>{
        calculateTotal();
    },[product])
  return (
    <div>
  <div className="sales-by-countries-container widget-size">
  <table className="sales-by-countries-table widget-table">
      <thead className="sales-by-countries-thead">
        <tr className='heading--sales'>
          <th>COUNTRY</th>
          <th>SALES($)</th>
          <th>PERCENTAGE</th>
        </tr>
      </thead>
      <tbody className="sales-by-countries-tbody">
        {product.map((item,index) => (
          <tr key={index}>
            <td className='img-td'> <img className='country-flag' src={item.url} alt="" /> {item.country}</td>
            <td style={{ color: item.sales > 100000 ? 'green' : 'red' }} >{item?item.sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):23443}</td>
            <td style={{ color: item.percentage > 10 ? 'green' : 'red' }}>{item.percentage}%</td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td>{totalSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $</td>
          <td>{totalPercentage}%</td>
        </tr>
      </tbody>
    </table>
    </div>
    </div>
  )
}