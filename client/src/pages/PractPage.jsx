import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PractPage = () => {
  const [buss, setBuss] = useState([])   
  const [filter, setFilter] = useState('')
  const [query, setQuery] = useState('')

  const onChangeFilter = (e) => { 
    setFilter(e.target.value)
  }

  const onClick = () => {
    setQuery(filter)
  }

  const filteredBus = buss.filter(bus => 
    bus.name?.toLowerCase().includes(query.toLowerCase()) ||
    bus.location?.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    async function fetchBus() {
      const  {data}  = await axios.get("https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers")
      setBuss(data.items)   
    }
    fetchBus()
  }, [])

  return (
    <div>
      <h2>Market buss</h2>
      <h3>Search bus by name or location</h3>
    {Array.isArray(filteredBus) && filteredBus.length === 0 && <p>ничего не найдено</p>}
      <input 
        type="text" 
        onChange={onChangeFilter} 
        value={filter} 
      />
      <button type='button' onClick={onClick}>Search</button>

      {filteredBus.map(bus => (
        <ul key={bus.id}>
          <li><img src={bus.gallery?.[0]?.thumb} alt={bus.name} height={25} width={25}/></li>
          <li>Name: {bus.name}</li>
          <li>Price: {bus.price}</li>
        </ul>
      ))}
    </div>
  )
}

export default PractPage
