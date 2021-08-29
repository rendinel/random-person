import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')

  const getPerson = async () => {
    // we fetch the data
    const response = await fetch(url)
    const data = await response.json()
    //we open the first voice inside the results obj from the api,this is the api structure
    const person = data.results[0]
    // we deconstruct the beacause they are inside the results without being nested inside something else
    const { phone, email } = person
    //we deconstruct them like this because they are nested inside picture we have large
    const { large: image } = person.picture
    //password is inside the login obj,this are 2 method to deconstruct from an obj
    const {
      login: { password },
    } = person
    //first and last are inside the name obj,this are 2 method to deconstruct from an obj
    const { first, last } = person.name
    //dob is inside person
    const {
      dob: { age },
    } = person
    //street is inside location that is inside person
    const {
      street: { number, name },
    } = person.location
    //we create a new objm from the property we grabbed from the api , when key and value have the same name i can write the name just one time instead of image:image
    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }
    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
  }

  useEffect(() => {
    getPerson()
  }, [])

  //if i'm hovering over the button i will get the datalabel of the button i'm over
  //then i will show on the title and on the value the value i'm getting from the api instead of hardcoding them
  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
    }
  }
  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(person && person.image) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <p className='user-title'>my {title}</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            {/* with the datalabel we are going to change what we are displaying once we mouseover the element */}
            <button
              className='icon'
              data-label='name'
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className='icon'
              data-label='email'
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className='icon' data-label='age' onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className='icon'
              data-label='street'
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className='icon'
              data-label='phone'
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className='icon'
              data-label='password'
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button onClick={getPerson} className='btn' type='button'>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
