import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = (props) => {
  return (
    <div id='navbar' className='row'>
      <Link to="/definitions">Definitions</Link>
      <Link to="/synonyms">Synonyms</Link>
      <Link to="/recognition"> SPEAK</Link>
      <Link to="/antononyms">Antonyms</Link>
      <Link to="/whatis">What is?</Link>
    </div>
  )
}

export default Navbar
