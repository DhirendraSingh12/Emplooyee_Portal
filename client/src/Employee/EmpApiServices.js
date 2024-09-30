import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("API URL: ", process.env.REACT_APP_API_URL);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || "Internal server error occurred";
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

export const loginEmployee = async (employeeId, password) => {
  try {
    const response = await API.post("/employees/login", {
      employeeId,
      password,
    });
    const { jwtToken } = response.data;
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);
      toast.success("Login successful");
      return { jwtToken };
    }
  } catch (error) {
    throw error.response?.data?.error || "Invalid Employee ID or Password";
  }
};

//dailog seccion
export const fetchDialogueSessions = async (employeeId) => {
  try {
    const response = await API.get(`/employees/dialoguesessions/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dialogue sessions:", error);
    throw error;
  }
};

//chate employee
export const fetchGreetMessage = async () => {
  try {
    const response = await API.get("/chatbot/greet");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Send user query and get response from chatbot
export const sendUserMessage = async (query) => {
  try {
    const response = await API.post("/chatbot/query", { query });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//perks
export const fetchPerksDatas = async () => {
  try {
    const response = await API.get("/employees/perks"); 
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

//leave request
export const submitLeaveRequest = async (leaveRequestData, jwtToken) => {
  try {
    const response = await API.post("/employees/leave/submit", leaveRequestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`, // Use JWT token in Authorization header
      },
    });
    toast.success("Leave request submitted successfully");
    return response.data;
  } catch (error) {
    console.error("Error submitting leave request:", error);
    toast.error("Failed to submit leave request");
    throw error;
  }
};



export const DocumentUpload = async (formDataToSend) => {
  try {
    const response = await API.post(`/employees/documents/upload`, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    toast.success("Document uploaded successfully");
    return response.data;
  } catch (error) {
    console.error("Error uploading document:", error);
    toast.error("Failed to upload document");
    throw error;
  }
};


export const submitTimesheets = async (payload, jwtToken) => {
  try {
    const response = await API.post("/employees/timesheets/submit", payload, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in submitTimesheets:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

//policies
export const fetchPoliciesDatas = async () => {
  try {
    const response = await API.get("/superadmin/allpolicies"); 
    return response.data; 
  } catch (error) {
    throw error; 
  }
};


//Submit Expense


export const fetchExpenses = async () => {
  try {
    const response = await API.get("/superadmin/allexpenses", {
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};
export const submitExpenseRequest = async (expenseRequestData, jwtToken) => {
  try {
    const response = await API.post("/employees/expenses/submit", expenseRequestData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwtToken}`, // Use JWT token in Authorization header
      },
    });
    toast.success("Expense request submitted successfully");
    return response.data;
  } catch (error) {
    console.error("Error submitting expense request:", error);
    toast.error("Failed to submit expense request");
    throw error;
  }
};