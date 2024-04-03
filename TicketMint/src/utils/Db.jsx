import axios from "axios";
import {  useEffect } from "react"; 
import { login,current, getEvents, getCategories, getCities } from "../redux/actions/auth.actions";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DataArrayRounded } from "@mui/icons-material";


const baseURL = "http://localhost:8080/api/";
export const ClientProvider = () => {
  const token = useSelector((state) => state.authReducer.token.token);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
      const fetchClient = async () => {
          try {
              const response = await axios.get(`${baseURL}client/current`, { 
                headers: {
                  'Authorization': `Bearer ${token}`,
                }
              });
              dispatch(current(response.data))
          } catch (error) {
              console.error('Error fetching client:', error);
          }
      };

      fetchClient();
  }, [location]); 

};


export const EventProvider = () => {
  const token = useSelector((state) => state.authReducer.token.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${baseURL}events/all`, { 
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
            dispatch(getEvents(response.data))
        } catch (error) {
            console.error('Error fetching client:', error);
        }
    };fetchEvents();},[])
};

export const CategortiesProvider = () => {
  const token = useSelector((state) => state.authReducer.token.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${baseURL}events/category`, { 
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
            dispatch(getCategories(response.data))
        } catch (error) {
            console.error('Error fetching client:', error);
        }
    };fetchCategories();},[])
};

export const CitiesProvider = () => {
  const token = useSelector((state) => state.authReducer.token.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCities = async () => {
        try {
            const response = await axios.get(`${baseURL}events/city`, { 
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
            dispatch(getCities(response.data))
        } catch (error) {
            console.error('Error fetching client:', error);
        }
    };fetchCities();},[])
};


export const postLogin = async (data, dispatch) => {
  try {
    const response = await axios.post(`${baseURL}auth/login`, data)
    dispatch(login(response.data));
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

  export const postRegister = async (data) => {
    try {
      const response = await axios.post(`${baseURL}auth/register/user`, data);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, message: error.message };
    }
  };

  export const postAgency = async (data) => {
    try {
      const response = await axios.post(`${baseURL}auth/register/agency`, data);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, message: error.message };
    }
  };

  export const postAlert = async (data, token) => {
    try {
      const response = await axios.post(`${baseURL}events/newalert`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error during alert creation:', error);
      return { success: false, message: error.message };
    }
  }

  export const walletCharger = async (amount, token) => {
    try {
        const response = await axios.put(`${baseURL}client/wallet/deposit`, {amount}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error during image upload:', error);
        return { success: false, message: error.message };
    }
  }
  
  export const changeAvatar = async (img, token) => {
    try {
        const response = await axios.put(`${baseURL}client/current/profilePic`, {img}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error during image upload:', error);
        return { success: false, message: error.message };
    }
  }


  export const changeData = async (data, token) => {
    try {
        const response = await axios.put(`${baseURL}client/current`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during password change:', error);
        return { success: false, message: error.message };
    }
  }


  export const deleteCard = async (id, token) => {
    try {
        const response = await axios.delete(`${baseURL}cards/current/cards/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during password change:', error);
        return { success: false, message: error.message };
    }
  }

  export const createEvent = async (data, token) => {
    try {
        const response = await axios.post(`${baseURL}events/create/event`, data, {
            headers: {
              'Authorization': `Bearer ${token}`}
        });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error during event creation:', error);
        return { success: false, message: error.message };
    } }

    export const createTicket = async (eventId, token,data) => {
      try {
          const response = await axios.post(`${baseURL}tickets/create/${eventId}`, data, {
              headers: {
                'Authorization': `Bearer ${token}`}
          });
          // console.log(response.data);
          return response.data;
      }
      catch (error) {
          console.error('Error during ticket creation:', error);
          return { success: false, message: error.message };
      } }