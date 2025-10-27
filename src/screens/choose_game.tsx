import { useNavigate } from 'react-router-dom'
import './choose_game.css'
// Import videos 
import GiftVideo from '../assets/gift.mp4'
// Import logos
import LakipLogo from '../assets/lakip.png'
import Button from '@/components/button/button.tsx'
import BGImage from '../assets/9c1a30a1-14c1-4326-a173-1e8fd93e440f.png'
const choose_game = () => {
    const navigate = useNavigate()

    const handleLakipGameClick = () => {
        navigate('/lakip-game')
    }

    return (
        <div className="game-selection-container  ">
            <p className=' fixed bottom-0 mb-2 text-[#fbbf24]'>Developed by: DICT R10 - eGov Programmers</p>
            <img src={BGImage} className=' pointer-events-none mt-28 w-full object-contain absolute z-0 bottom-0 opacity-30' alt="" />

            <div className="main-content-grid">
                {/* Left Column - Logo */}
                <div className="logo-column">
                    <img src={LakipLogo} alt="Lakip Logo" className="header-logo" />
                </div>

                {/* Right Column - Game Selection */}
                <div className="game-column">
                    <h1 className="selection-title uppercase font-bold">Dula-a amung LAKIP Game para sa mga nindot na premyo!</h1>

                    <div className="game-buttons-container">
                        <div className="game-option flex flex-col gap-2">
                            <button
                                className="game-button game-three"
                                onClick={handleLakipGameClick}
                            >
                                <video className="video-background hover:scale-[1.05] ease-out duration-500" autoPlay muted loop>
                                    <source src={GiftVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <span className="button-text">Lakip Game</span>
                            </button>

                            <Button onClick={handleLakipGameClick} text="Tara! Lakip" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default choose_game