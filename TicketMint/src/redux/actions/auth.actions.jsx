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


