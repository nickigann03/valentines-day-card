import React from 'react';
import './Popup.css';

const Popup = ({ messageType, closePopUp }) => {
    const handleClose = () => {
        closePopUp();
    };

    return (
        <div className="popup-container">
            {messageType === 'yes' ? (
                <div className="popup">
                    <div className="popup-header">
                        <button className="close-btn" onClick={handleClose}>X</button>
                    </div>
                    <div className="popup-body">
                        <h2>Woohoooooo!</h2>
                        <p>
                            You chose right! Hehehe, MY VALENTINES!<br />
                            Here is the information for your valentine's day date:
                        </p>
                        <p>
                            <strong>Date and Day:</strong> 17 February 2025 (Monday)<br />
                            <strong>Time:</strong> 6:30pm to 10:00pm<br />
                            <strong>Venue:</strong> The Ship Centrestage, PJ
                        </p>
                    </div>
                </div>
            ) : messageType === 'no' ? (
                <div className="popup error-popup">
                    <div className="popup-header">
                        <button className="close-btn" onClick={handleClose}>X</button>
                    </div>
                    <div className="popup-body">
                        <h2>ERROR!</h2>
                        <p>WRONG CHOICE, Please choose correct!</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Popup;
