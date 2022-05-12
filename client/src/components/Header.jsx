import{FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import{Link} from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
        <div classname='logo'>
            <Link to='/'>Event</Link>
        </div>
        <ul>
            <li>
                <Link to='/Register'>
                    <FaUser /> Register
                </Link>
            </li>
            <li>
                <Link to='/Login'>
                    <FaUser /> Login
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header