// Function to validate set object properties
export function validateSetFields(set) {

    if(!set.hasOwnProperty("title") || !set.hasOwnProperty("cardPair") ) {
        return { success: false, message: "Missing required fields: Title and minimum two questions."};
    }

    // TODO: Add validation for visibility and visibleToUsers
    const validators = {
        title: validateTitle,
        cardPair: validateCardPair
    };

    for(const field in set) {

        if(validators[field]) {
            const result = validators[field](set[field], field);

            if(!result.success) {
                return { success: false, message: result.message};
            }
        }
    }

    return { success: true };
}

// Function to validate title
export function validateTitle(title) {
    const pattern = /^[a-zA-Z0-9\s\-\_\,\.\!\?\'\(\)\+\/\&]{3,100}$/;

    if(!title || !title.trim()) {
        return { success: false, message: 'Title is required.'};
    }
    
    if(!pattern.test(title.trim())) {
        return { success: false, message: 'Invalid title.'};
    } 
    
    return { success: true };
}

// Function to validate card pair
export function validateCardPair(cardPair) {
    const pattern = /^[a-zA-Z0-9\s\-\_\,\.\!\?\'\(\)\+\/\&]{3,70}$/;

    if(cardPair.length < 2) {
        return { success: false, message: 'At least 2 questions are required.'};
    }

    const invalidCard = cardPair.some(card => {
        if (!card.hasOwnProperty("question") || !card.hasOwnProperty("answer")) {
            return true;
        }

        if (!pattern.test(card.question.trim())) {
            return true; 
        }

        if (!pattern.test(card.answer.trim())) {
            return true; 
        }

        return false; 
    });

    if (invalidCard) {
        return { success: false, message: "There is an invalid question or answer." };
    }
    
    return { success: true };
}

// Function to validate single card
export function validateCardFields(card) {
    const pattern = /^[a-zA-Z0-9\s\-\_\,\.\!\?\'\(\)\+\/\&]{3,70}$/;

    if(!pattern.test(card.question.trim())) {
        return { success: false, message: `Invalid question '${card.question}'`};
    } 
    
    if(!pattern.test(card.answer.trim())) {
        return { success: false, message: `Invalid answer '${card.answer}'`};
    } 

    return { success: true };
}