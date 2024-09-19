import { TiHeart } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

const navLinks = [
    'Pro',
    'Teams',
    'Pricing',
    'Documentation',
]
const Navbar = () => {
    const navigate = useNavigate()
    return (
        <header className="border-b">
            <div className="max-w-full mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <TiHeart className="h-8 w-8 cursor-pointer" onClick={()=> navigate('/')}/>
                    <nav className="hidden md:flex space-x-4">
                        {navLinks.map((link, index) => (
                            <a key={index} href="#" className="text-sm font-medium cursor-pointer hover:text-gray-600 text-gray-900">{link}</a>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign Up</a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign In</a>
                </div>
            </div>
        </header>
    )
}

export default Navbar