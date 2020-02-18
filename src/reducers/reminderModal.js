const initialState = {opened: false, date: null};

const reminderModal = (state = initialState, action) => {
    switch (action.type){
        case 'SHOW_REMINDER_MODAL_WINDOW':
            return {
                opened: action.opened,
                date: action.date,
            }
        case 'CLOSE_REMINDER_MODAL_WINDOW':
            return initialState;
        default:
            return state;
    }
}

export default reminderModal;