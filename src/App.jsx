import React, { useState, useEffect } from 'react';
import './App.css';
import Popup from './Popup';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [messageType, setMessageType] = useState(null);

    const generateHearts = () => {
        const numberOfHearts = 5; // Increase the number of hearts inside the envelope
        const envelope = document.querySelector('.envelope');
        
        for (let i = 0; i < numberOfHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-inside');
            envelope.appendChild(heart);

            // Randomize position of hearts inside the envelope
            const xPos = Math.random() * 80 + 10;  // Random x position inside the envelope
            const yPos = Math.random() * 80 + 10;  // Random y position inside the envelope

            heart.style.left = `${xPos}%`;
            heart.style.top = `${yPos}%`;

            setTimeout(() => {
                heart.remove();  // Remove heart after 1.5s (since the envelope is opening quickly)
            }, 1500); 
        }
    };

    const generateFloatingHearts = () => {
        const numberOfHearts = 20; // Increase the number of hearts for floating effect
        const envelope = document.querySelector('.envelope-wrapper');
        
        for (let i = 0; i < numberOfHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('flying-heart');
            envelope.appendChild(heart);

            // Random starting positions
            const xPos = Math.random() * window.innerWidth;
            const yPos = window.innerHeight;

            heart.style.left = `${xPos}px`;
            heart.style.top = `${yPos}px`;

            // Apply the floating animation
            heart.style.animation = `floatUp ${Math.random() * 2 + 3}s ease-in forwards`; // Randomize speed

            // Remove the heart after the animation completes
            setTimeout(() => {
                heart.remove();
            }, 10000); // Hearts will float for 4 seconds
        }
    };

    const playEnvelopeSound = () => {
        const audio = new Audio('envelope-sound.mp3'); 
        audio.play();
        setTimeout(() => {
            audio.pause(); 
        }, 2000);
    };

    const playYesSound = () => {
        const audio = new Audio('yay-sound.mp3'); 
        audio.play();
    };

    const playNoSound = () => {
        const audio = new Audio('no-sound.mp3'); 
        audio.play();
    };

    const handleEnvelopeClick = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
            generateHearts();
            generateFloatingHearts();
            playEnvelopeSound();
        }
    };

    const handleYesClick = () => {
        setMessageType('yes');
        setShowPopUp(true);
        playYesSound();
    };

    const handleNoClick = () => {
        setMessageType('no');
        setShowPopUp(true);
        playNoSound();

        setTimeout(() => {
            setShowPopUp(false);
        }, 5000);
    };

    const closePopUp = () => {
        setShowPopUp(false);
    };

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setShowButtons(true);
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            setShowButtons(false);
        }
    }, [isOpen]);

    return (
        <div className="container">
            <div
                className={`envelope-wrapper ${isOpen ? 'flap' : ''}`}
                onClick={handleEnvelopeClick}
            >
                <div className="envelope">
                    <div className="letter">
                        <div className="text">
                            <strong>My Dearest Cassandra,</strong>
                            <p>
                                You are the love of my life and I am so grateful to have you by my side.
                                I love you so much & I can't wait to spend the rest of my life with you.
                            </p>
                            <strong>Will you be my Valentine? ❤️</strong>
                        </div>
                    </div>
                    {showButtons && (
                        <div className="buttons">
                            <button className="btn" onClick={handleYesClick}>
                                Yes
                            </button>
                            <button className="btn" onClick={handleNoClick}>
                                No
                            </button>
                        </div>
                    )}
                    <div className="heart"></div>
                </div>
            </div>

            {/* Show pop-up based on the button clicked */}
            {showPopUp && (
                <Popup messageType={messageType} closePopUp={closePopUp} />
            )}
        </div>
    );
};

export default App;
