import React, { useEffect, useState } from 'react';
import './Emp_Dialogues.css';
import Header from "../../components/Navbar/Navbar";
import { fetchDialogueSessions } from '../../EmpApiServices';

const DialoguesPage = () => {
    const [dialogues, setDialogues] = useState([]);
    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    useEffect(() => {
        const employeeId = localStorage.getItem("employeeId");
        const loadDialogues = async (id) => {
            try {
                const data = await fetchDialogueSessions(id);
                setDialogues(data);
            } catch (error) {
                console.error('Error loading dialogues:', error);
            }
        };
        if (employeeId) {
            loadDialogues(employeeId); 
        }
    }, []);
    const handleFeedbackClick = () => {
        setShowFeedbackPopup(true);
    };

    const handleFeedbackClose = () => {
        setShowFeedbackPopup(false);
    };

    const handleFeedbackSubmit = () => {
        console.log('Feedback submitted:', feedbackMessage);
        setFeedbackMessage('');
        setShowFeedbackPopup(false);
    };

   

    const profileImage = "/assets/images/profile.jpg";

    return (
        <>
            <Header
                siteName={"Dialogues Section"}
                profileImage={profileImage}
                showLinks={["emp_dialogues"]}
            />
            <div className="dialogues-page-container">
                <div className="emp-log-header">
                    <button className="emp-feedback-btn" onClick={handleFeedbackClick}>
                        Feedback
                    </button>
                </div>
                <div className='container-page-dailog'>
                <div className="emp-dialogues-container">
                    <div className="emp-dialogue-list">
                        {dialogues.map((session) => (
                            <div key={session.id} className="emp-dialogue-item">
                                <p className='dailog-data'><strong>MeetingType:</strong>{session.meetingType}</p>
                                <p className='dailog-data'><strong>Review Date:</strong> {session.reviewDate}</p>
                                <p className='dailog-data'><strong>Comments & Notes:</strong> {session.commentsAndNotes}</p>
                                <p className='dailog-data'><strong>Next Meeting Date:</strong> {session.nextMeetingDate}</p>
                                <a href={session.meetingURL} target="_blank" rel="noopener noreferrer" className="meeting-link">
                                    Join Meeting
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
                {showFeedbackPopup && (
                    <div className="emp-feedback-popup">
                        <div className="emp-popup-content">
                            <h2>Feedback</h2>
                            <textarea
                                value={feedbackMessage}
                                onChange={(e) => setFeedbackMessage(e.target.value)}
                                placeholder="Write your message here..."
                            />
                            <button onClick={handleFeedbackSubmit}>Submit</button>
                            <button onClick={handleFeedbackClose}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DialoguesPage;
