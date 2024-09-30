// import React, { useState } from "react";
// import "./Documentpopup.css";

// const DocumentPopup = ({ open, onClose, onUpload }) => {
//     const [documentTitle, setDocumentTitle] = useState("");
//     const [selectedFile, setSelectedFile] = useState(null);

//     if (!open) return null;

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUpload = () => {
//         if (documentTitle && selectedFile) {
//             onUpload(documentTitle, selectedFile);
//             onClose();
//         } else {
//             alert("Please provide a document title and select a file to upload.");
//         }
//     };

//     return (
//         <div className="doc-popup-overlay">
//             <div className="doc-popup-content">
//                 <div className="doc-popup-header">
//                     <h2>Upload Document</h2>
//                     <button className="doc-close-button" onClick={onClose}>
//                         &times;
//                     </button>
//                 </div>
//                 <div className="doc-popup-body">
//                     <div className="doc-form-group">
//                         <label>Document Title:</label>
//                         <input
//                             type="text"
//                             value={documentTitle}
//                             onChange={(e) => setDocumentTitle(e.target.value)}
//                             placeholder="Enter document name"
//                         />
//                     </div>
//                     <div className="doc-form-group">
//                         <label>Upload Document:</label>
//                         <input
//                             type="file"
//                             onChange={handleFileChange}
//                             accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
//                         />
//                     </div>
//                 </div>
//                 <div className="doc-form-actions">
//                     <button type="button" className="doc-upload-button" onClick={handleUpload}>
//                         Upload
//                     </button>
//                     <button type="button" className="doc-close-button" onClick={onClose}>
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DocumentPopup;




































































import React, { useState } from "react";
import "./Documentpopup.css";

const DocumentPopup = ({ open, onClose, onUpload }) => {
    const [documentTitle, setDocumentTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    if (!open) return null;

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (documentTitle && selectedFile) {
            onUpload(documentTitle, selectedFile);
            onClose();
        } else {
            alert("Please provide a document title and select a file to upload.");
        }
    };

    return (
        <div className="doc-popup-overlay">
            <div className="doc-popup-content">
                <div className="doc-popup-header">
                    <h2>Upload Document</h2>
                    <button className="doc-close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="doc-popup-body">
                    <div className="doc-form-group">
                        <label>Document Title:</label>
                        <input
                            type="text"
                            value={documentTitle}
                            onChange={(e) => setDocumentTitle(e.target.value)}
                            placeholder="Enter document name"
                        />
                    </div>
                    <div className="doc-form-group">
                        <label>Upload Document:</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                        />
                    </div>
                </div>
                <div className="doc-form-actions">
                    <button type="button" className="doc-upload-button" onClick={handleUpload}>
                        Upload
                    </button>
                    <button type="button" className="doc-close-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentPopup;
