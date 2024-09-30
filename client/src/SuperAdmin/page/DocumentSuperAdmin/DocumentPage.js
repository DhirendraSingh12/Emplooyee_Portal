import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../components/SuperAdminNavbar/SuperAdminNavbar";
import "./DocumentPage.css"; 

const DocumentPage = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [ setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`/api/emoployeedocuments`);
        const data = await response.json();
        console.log(data); 
        if (response.ok) {
          setDocuments(data.documents);
          const foundDocument = data.documents.find((doc) => doc._id === id);
          setDocument(foundDocument);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
  
    fetchDocuments();
  }, [id, setDocuments]);
  

  const handleApprove = () => {
    console.log("Document Approved:", id);
  };

  const handleReject = () => {
    console.log("Document Rejected:", id);
  };

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header
        siteName={"Document Details"}
        userName={"Jaideep"}
        profileImage={"/assets/images/profile.jpg"}
        showLinks={["document"]}
      />
      <div className="document-page-container">
        <h2>{document.documentName}</h2>
        <p>Employee Name: {document.name}</p>
        <p>Employee ID: {document.employeeId}</p>
        <p>Upload Date: {new Date(document.uploadDate).toLocaleDateString()}</p>
        <p>Status: {document.state}</p>

        <div className="document-file">
 
          <iframe
            src={document.documentFile}
            title={document.documentName}
            width="100%"
            height="600px"
          />
      
      </div>
        <div className="document-actions">
          <Button variant="contained" color="primary" onClick={handleApprove}>
            Approve
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReject}
            style={{ marginLeft: "10px" }}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
