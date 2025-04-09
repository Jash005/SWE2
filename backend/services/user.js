// Function to validate user object properties
export function validateUserFields(user, isNew) {
    if(isNew && (!user.hasOwnProperty("username") || !user.hasOwnProperty("password") || !user.hasOwnProperty("displayName") ) ) {
        return { success: false, message: "Missing required fields: Username, Password and Display Name."};
    }
    if(!isNew && user.hasOwnProperty("username")) {
        return { success: false, message: "Username can't be changed."};
    }

    const validators = {
        username: validateUsername,
        password: validatePassword,
        displayName: validateDisplayName
    };

    for(const field in user) {
        if(validators[field]) {
            const result = validators[field](user[field]);

            if(!result.success) {
                return { success: false, message: result.message};
            }
        }
    }

    return { success: true };
}

// Function to validate username
export function validateUsername(username) {
    const pattern = /^[a-zA-Z0-9]{4,10}$/;

    if(!username || !username.trim()) {
        return { success: false, message: 'Username is required.'};
    }
    
    if(!pattern.test(username.trim())) {
        return { success: false, message: 'Invalid username.'};
    } 
    
    return { success: true };
}
 
// Function to validate password
export function validatePassword(password) {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;

    if(!password || !password.trim()) {
        return { success: false, message: 'Password is required.'};
    }
    
    if(!pattern.test(password)) {
        return { success: false, message: 'Invalid password.'};
    } 
        
    return { success: true };
}

// Function to validate display name
export function validateDisplayName(displayName) {
    const pattern = /^[a-zA-Z0-9\s]{4,30}$/;
    
    if(!displayName || !displayName.trim()) {
        return { success: false, message: 'Display name is required.'};
    }
    
    if(!pattern.test(displayName.trim())) {
        return { success: false, message: 'Invalid display name.'};
    } 
    
    return { success: true };
}
