import Logo from '../assets/Logo.jpg'
import { useNavigate } from 'react-router-dom';
const WelcomePage = () => {
    const navigate = useNavigate()
    return (
        <div className="text-center">
            <img src={Logo} className='mx-auto mb-5' alt="" />
            <h1 className="text-4xl">Welcome To Pokemon Game </h1>
            <button className="mt-5 cursor-pointer bg-[#feca1b] p-3 rounded-md font-medium" onClick={() => navigate('/round')}>Get Started</button>
        </div>
    )
}

export default WelcomePage;