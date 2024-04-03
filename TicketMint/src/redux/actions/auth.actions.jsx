import { createAction} from "@reduxjs/toolkit";


export const current = createAction('CURRENT', (data) => {
    return {
        payload: {
            ...data,
            loggedIn: true,

        }
    }
});

 export const login = createAction('LOGIN', (token) => {
    return {
        payload: {
            token,
            timestamps: Date.now()
        }
    }
});

export const logout = createAction('LOGOUT', (data) => {
    return {
        payload: {
            loggedIn: false,
            timestamps: Date.now()
        }
    }
});

export const getEvents = createAction('EVENTS', (data) => {
    return {
        payload: {
            ...data
        }
    }
});

export const getCategories = createAction('CATEGORIES', (data) => {
    return {
        payload: {
            ...data
        }
    }
});

export const getCities = createAction('CITIES', (data) => {
    return {
        payload: {
            ...data
        }
    }
});


export const getTicketTypes = createAction('TICKET_TYPES', (data) => {
    return {
        payload: {
            ...data
        }
    }

});
  
  
  
export const getNotify = createAction('NOTIFY', (data) => {

    return {
        payload: {
            ...data
        }
    }

});


export const getCurrency = createAction('CURRENCY', (data) => {
    return {
        payload: {
            ...data
        }
    }
});
