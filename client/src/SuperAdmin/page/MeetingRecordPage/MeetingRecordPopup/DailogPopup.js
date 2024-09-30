import React, { useState ,useEffect} from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  DialogTitle,
} from "@mui/material";
import IconMapper from "../../../../components/IconMapper/IconMapper";
import { MeetingShedulValidation } from "../../../../Utils/validation";
import { addMeetingRecord ,updateMeetingRecod} from "../../../ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DailogPopup.css";

const DailogPopup = ({open , onClose ,dailog,fetchData}) => {
  const [formData, setFormData] = useState({
    meetingType: "",
    employeeId: "",
    reviewDate: "",
    commentsAndNotes: "",
    nextMeetingDate: "",
    meetingURL: "",
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (dailog) {
      setFormData({
        employeeId: dailog.employeeId || "",
        meetingType: dailog.meetingType || "",
        reviewDate: dailog.reviewDate || "",
        commentsAndNotes: dailog.commentsAndNotes || "",
        nextMeetingDate: dailog.nextMeetingDate || "",
        meetingURL: dailog.meetingURL || "",
       
      });
    } else {
      setFormData({
        employeeId: "",
        meetingType: "",
        reviewDate: "",
        commentsAndNotes:'',
        nextMeetingDate: "",
        meetingURL: "",
       
      });
    }
  }, [dailog, open]); 



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await MeetingShedulValidation.validate(formData, { abortEarly: false });
      setErrors({});
  
      const formDataToSend = new FormData();
      formDataToSend.append("employeeId", formData.employeeId);
      formDataToSend.append("meetingType", formData.meetingType);
      formDataToSend.append("reviewDate", formData.reviewDate);
      formDataToSend.append("commentsAndNotes", formData.commentsAndNotes);
      formDataToSend.append("nextMeetingDate", formData.nextMeetingDate);
      formDataToSend.append("meetingURL", formData.meetingURL);
  
      if (dailog) {
         await updateMeetingRecod(dailog.sessionId, formDataToSend);
        toast.success("Meeting record updated successfully!");
      } else {
        await addMeetingRecord(formDataToSend);
        toast.success("Meeting record added successfully!");
        
      }
  
      onClose(); 
      await fetchData();

    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        toast.error("Please fill in the required fields.");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  
  
  return (
    <div className="meeting-record-page" open={open} onClose={onClose}>

      <div className="meeting-container">
      <DialogTitle>{dailog ? "Edit Asset" : "Add Asset"}</DialogTitle>

        <div className="meeting-left-section">
          <IconMapper
            iconName={"MeetingIcon"}
            className="meeting-record-icon"
          />
        </div>
        <div className="meeting-right-section">
          <form onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              margin="normal"
              error={Boolean(errors.meetingType)}
            >
              <InputLabel id="meetingType-label">Meeting Type</InputLabel>
              <Select
                labelId="meetingType-label"
                label="Meeting Type"
                id="meetingType"
                name="meetingType"
                value={formData.meetingType}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Select Meeting Type</em>
                </MenuItem>
                <MenuItem value="1-2-1 Meeting">1-2-1 Meeting</MenuItem>
                <MenuItem value="Appraisal">Appraisal</MenuItem>
                <MenuItem value="Feedback">Feedback</MenuItem>
                <MenuItem value="Grievance">Grievance</MenuItem>
                <MenuItem value="Disciplinary">Disciplinary</MenuItem>
              </Select>
              {errors.meetingType && (
                <FormHelperText>{errors.meetingType}</FormHelperText>
              )}
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              error={Boolean(errors.employeeId)}
              helperText={errors.employeeId}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Review Date"
              name="reviewDate"
              type="date"
              value={formData.reviewDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.reviewDate)}
              helperText={errors.reviewDate}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Comments and Notes"
              name="commentsAndNotes"
              value={formData.commentsAndNotes}
              onChange={handleChange}
              multiline
              rows={4}
              error={Boolean(errors.commentsAndNotes)}
              helperText={errors.commentsAndNotes}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Next Meeting Scheduled Date"
              name="nextMeetingDate"
              type="date"
              value={formData.nextMeetingDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.nextMeetingDate)}
              helperText={errors.nextMeetingDate}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Meeting Url"
              name="meetingURL"
              value={formData.meetingURL}
              onChange={handleChange}
              error={Boolean(errors.meetingURL)}
              helperText={errors.meetingURL}
            />

            <div className="form-button-employee">
              <button
                type="button"
                onClick={onClose}
                className="cancel-button-employee"
              >
                Cancel
              </button>
              <button type="submit" className="save-button-employee" >
                 Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default DailogPopup;
