import axios from "axios";
import {  useEffect } from "react"; 
import { login,current } from "../redux/actions/auth.actions";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


const baseURL = "localhost:8080/api";
export const ClientProvider = () => {
 const token = useSelector((state) => state.authReducer.token.token);
 const dispatchC = useDispatch();
 const location = useLocation();


  useEffect(() => {
      const fetchClient = async () => {
          try {
              const response = await axios.get(`${baseURL}clients/current`, { 
                headers: {
                  'Authorization': `Bearer ${token}`,
                  // 'Accept': 'application/xml'
                }
              });
              dispatchC(current(response.data))
          } catch (error) {
              console.error('Error fetching client:', error);
          }
      };

      fetchClient();
  }, [location]); 

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
      const response = await axios.post(`${baseURL}auth/register`, data);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, message: error.message };
    }
  };


  export const loanApply = async (data, token) => {
    try {
      const response = await axios.post(`${baseURL}loan/request`, data, { 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, message: error.message };
    }
  };


  export const cardApply = async (data, token) => {
    try {
      const response = await axios.post(`${baseURL}cards/current/apply`, data, { 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, message: error.message };
    }
  };


  export const getNewAccount = async (token) => {
    try {
 
      const response = await axios.post(`${baseURL}accounts/current/account`, {}, { 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, message: error.message };
    }
  };


  export const postTransfer = async (data, token) => {
    try {
      const response = await axios.post(`${baseURL}transactions/transfer`, data, { 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    }catch (error) {
      console.error('Error during registration:', error);
      return { success: false, message: error.message };
    }
  };


  export const changeAvatar = async (img, token) => {
    try {
        const response = await axios.put(`${baseURL}clients/avatar`, {img}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error during image upload:', error);
        return { success: false, message: error.message };
    }
  }


  export const changePassword = async (data, token) => {
    try {
        const response = await axios.put(`${baseURL}clients/newpassword`, {data}, {
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
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error during password change:', error);
        return { success: false, message: error.message };
    }
  }