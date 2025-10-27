import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LakipGameMainContainer.css';
import giftVideo from '../../assets/gift.mp4';
import umbrellaVideo from '../../assets/umbrella.mp4';
import bombVideo from '../../assets/bomb.mp4';

// Note: Add fan.mp4 and notebook.mp4 to assets folder when available
import fanVideo from '../../assets/fan.mp4';
import notebookVideo from '../../assets/notebook.mp4';

interface Gift {
    id: number;
    isRevealed: boolean;
    isWin: boolean;
    revealVideo: string;
    prizeName?: string;
}

export default function LakipGameMainContainer() {
    const navigate = useNavigate();
    const [gifts, setGifts] = useState<Gift[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [result, setResult] = useState<'win' | 'lose' | null>(null);
    const [wonPrize, setWonPrize] = useState<string | null>(null);
    const [wonPrizeVideo, setWonPrizeVideo] = useState<string | null>(null);

    // Initialize game
    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        // Create 12 gifts
        const newGifts: Gift[] = [];

        // Randomly select 3 positions for winning gifts
        const winningPositions = new Set<number>();
        while (winningPositions.size < 3) {
            winningPositions.add(Math.floor(Math.random() * 12));
        }

        // Define winning items with their videos and names
        const winningItems = [
            { video: umbrellaVideo, name: 'Umbrella' },
            { video: notebookVideo, name: 'Notebook' },
            { video: fanVideo, name: 'Fan' }
        ];

        let winIndex = 0;
        for (let i = 0; i < 12; i++) {
            const isWin = winningPositions.has(i);
            const prize = isWin ? winningItems[winIndex++ % winningItems.length] : null;
            newGifts.push({
                id: i,
                isRevealed: false,
                isWin: isWin,
                revealVideo: isWin ? prize!.video : bombVideo,
                prizeName: isWin ? prize!.name : undefined
            });
        }

        setGifts(newGifts);
        setGameOver(false);
        setResult(null);
        setWonPrize(null);
        setWonPrizeVideo(null);
    };

    const handleGiftClick = (giftId: number) => {
        if (gameOver) return;

        const clickedGift = gifts.find(g => g.id === giftId);
        if (!clickedGift || clickedGift.isRevealed) return;

        // Reveal the clicked gift first
        const updatedGifts = gifts.map(gift =>
            gift.id === giftId ? { ...gift, isRevealed: true } : gift
        );
        setGifts(updatedGifts);
        setGameOver(true);
        setResult(clickedGift.isWin ? 'win' : 'lose');

        if (clickedGift.isWin) {
            setWonPrize(clickedGift.prizeName || null);
            setWonPrizeVideo(clickedGift.revealVideo);
        }

        // Reveal all other gifts after a short delay
        setTimeout(() => {
            const allRevealed = gifts.map(gift => ({ ...gift, isRevealed: true }));
            setGifts(allRevealed);
        }, 1000);
    };

    const resetGame = () => {
        initializeGame();
    };

    const handleBack = () => {
        navigate('/lakip/main-page');
    };

    return (
        <div className="lakip-game-container">
            <button onClick={handleBack} className="back-button">
                ← Back
            </button>

            <div className="game-header">
                <h1>🎁 Gift Selection Game</h1>
                <p>Choose a gift! 3 out of 12 contain winning prizes!</p>
            </div>

            <div className="gifts-grid">
                {gifts.map((gift) => (
                    <div
                        key={gift.id}
                        className={`gift-box ${gift.isRevealed ? 'revealed' : ''}`}
                        onClick={() => handleGiftClick(gift.id)}
                    >
                        {!gift.isRevealed ? (
                            <video
                                src={giftVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="gift-video"
                            />
                        ) : (
                            <div className="reveal-container">
                                <video
                                    src={gift.revealVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="reveal-video"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {gameOver && (
                <div className="game-result">
                    <div className="result-modal">
                        {result === 'win' && wonPrizeVideo && (
                            <div className="modal-prize-video">
                                <video
                                    src={wonPrizeVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="prize-video-display"
                                />
                            </div>
                        )}
                        <h2>{result === 'win' ? '🎉 Congratulations!' : '💥 Better Luck Next Time!'}</h2>
                        <p>
                            {result === 'win'
                                ? `You won a ${wonPrize}!`
                                : 'You got a bomb! Try again!'}
                        </p>
                        <button onClick={resetGame} className="play-again-btn">
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
