import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || "Internal server error occurred";
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);



//Super Admin Add Edit and Delete select all delete
export const getAllEmployees = async () => {
  try {
    const response = await API.get("/superadmin/allemployees");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchEmployeeById = async (employeeId) => {
  try {
    const response = await API.get(`/superadmin/getemployees/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchEmployeeById:", error.response ? error.response.data : error.message);
    throw error;
  }
};
export const addBulkEmployees = async (fileData) => {
  try {
    const response = await API.post("/superadmin/bulkemployee", fileData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const addEmployee = async (employeeData) => {
  try {
    const response = await API.post("/superadmin/addemployee", employeeData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Employee added successfully");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editEmployee = async (employeeId,employeeData) => {
    try {
      
      const response = await API.put(`/superadmin/editemployees/${employeeId}`, employeeData); 
      console.log("API Response:", response.employeeData);
      // toast.success(response.data.message);
      return response.data;
    } catch (error) {
      
    }
  };
  
export const deleteUser = async (employeeId) => {
  try {
    const response = await API.delete(`/superadmin/deleteemployees/${employeeId}`); // Correct interpolation
    console.log(response.data.message);
    toast.success('User deleted successfully');
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

  export const deleteSelectedUsers = async (ids) => {
    try {
      const deletePromises = ids.map((employeeId) => API.delete(`/superadmin/deleteemployees/${employeeId}`));
      const responses = await Promise.all(deletePromises);
      responses.forEach((response) => {
        toast.success(response.data.message); 
      });
      return responses;
    } catch (error) {
      throw error;
    }
  };



  //Super Admin Login Services
  export const loginSuperAdmin = async (credentials) => {
    try {
      const response = await API.post("/superadmin/login", credentials);
      const { jwtToken } = response.data;
      if (jwtToken) {
        toast.success('Login successful');
        return { jwtToken }; 
      }
    } catch (error) {
      throw error; 
    }
  };


  //AddAssets Services api service

  export const addAsset = async (formDataToSend) => {
    try {
      const response = await API.post("/superadmin/addassets", formDataToSend, {
      });
      return response.data; 
    } catch (error) {
      throw error; 
    }
  };

  export const fetchAllAssets = async () => {
    try {
      const response = await API.get('/superadmin/allassets');
      return response.data; 
    } catch (error) {
      throw new Error("Error fetching assets: " + error.message);
    }
  };
  export const updateAsset = async (assetId, assetData) => {
    try {
      const response = await API.put(`/superadmin/editassets/${assetId}`, assetData,{
      }); 
      return response.data;
    } catch (error) {
      toast.error("Failed to update asset.");
      throw error;
    }
  };
  export const deleteassets = async (assetId) => {
    try {
      const response = await API.delete(`/superadmin/deleteassets/${assetId}`); 
      toast.success('Asset deleted successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting asset");
      throw error;
    }
  };
  

  export const deleteAllassets = async (assetId) => {
    try {
      const response = await API.delete(`/superadmin/deleteassets/${assetId}`);
      toast.success('asstes deleted successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
      throw error;
    }
  };

  //Metting Recod dailog all apis 

  export const addMeetingRecord = async (formData) => {
    try {
      const response = await API.post(`/superadmin/createsession`, formData,{
      });
      return response.data;
    } catch (error) {
      throw error; 
    }
  };

  export const fetchMeettingRecod = async () => {
    try {
      const response = await API.get('/superadmin/allsession');
      return response.data; 
    } catch (error) {
      throw new Error("Error fetching assets: " + error.message);
    }
  };

  export const updateMeetingRecod = async (sessionId, data) => {
    try {
      const response = await API.put(`/superadmin/editsession/${sessionId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const deleteaDailog = async (sessionId) => {
    try {
      const response = await API.delete(`/superadmin/deletesession/${sessionId}`); 
      console.log(response.data.message);
      toast.success('Dailog deleted successfully');
      return response.data;
    } catch (error) {
      console.error("Error deleting asset:", error);
      toast.error(error.response?.data?.message || "Error deleting asset");
      throw error;
    }
  };
 //Perks Services

 export const addPerk = async (formData) => {
  try {
    const response = await API.post('/superadmin/addperks', formData);
    return response.data;
  } catch (error) {
    // Log the error for debugging
    console.error('Error adding perk:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const fetchAllPerksData = async () => {
  try {
    const response = await API.get('superadmin/allperks');
    return response.data; 
  } catch (error) {
    throw new Error("Error fetching assets: " + error.message);
  }
};

export const deletePerk = async (perkId) => {
  try {
    const response = await API.delete(`/superadmin/deletePerk/${perkId}`);
    toast.success('Perks deleted successfully');
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

  //  Documents Services 
  export const createSession = async (formData) => {
    try {
      const response = await API.post(
        '/superadmin/adddocuments',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data; 
    } catch (error) {
      throw error; 
    }
  };

  export const fetchEmployeeDocuments = async () => {
    try {
      const response = await API.get('/superadmin/alldocuments'); // Correct the endpoint URL if needed
      return response.data; // Return the data received from the server
    } catch (error) {
      throw error; // Re-throw the error for handling in the component
    }
  };






//Time Sheet API Services 



export const  fetchalltimeoff = async () => {
  try {
    const response = await API.get('/superadmin/alltimeoff');
    return response.data; 
  } catch (error) {
    throw new Error("Error fetching assets: " + error.message);
  }
};


 export const getAllTimesheets = async () => {
  try {
      const response = await API.get("/superadmin/alltimesheets");
      return response.data; // Adjust this based on the structure of your API response
  } catch (error) {
      console.error("Error fetching timesheets:", error);
      throw error; // Rethrow the error for handling in the component
  }
};
export const getTimesheetById = async (employeeId) => {
  const response = await API.get(`/superadmin/timesheets/${employeeId}`); // Adjust endpoint as needed
  return response.data; // Adjust if needed
};

//Fetch Expenses

export const fetchAllExpenseData = async () => {
  try {
    const response = await API.get('/superadmin/allexpenses');
    return response.data; 
  } catch (error) {
    throw new Error("Error fetching assets: " + error.message);
  }
};

