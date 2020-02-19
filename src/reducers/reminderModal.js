const initialState = {opened: false, date: null, selectedReminder: null};

const reminderModal = (state = initialState, action) => {
    switch (action.type){
        case 'SHOW_REMINDER_MODAL_WINDOW':
            return {
                opened: action.opened,
                date: action.date,
            }
        case 'SHOW_EDIT_REMINDER_MODAL_WINDOW':
            return {
                opened: action.opened,
                selectedReminder: action.selectedReminder,
            }
        case 'CLOSE_REMINDER_MODAL_WINDOW':
            return initialState;
        default:
            return state;
    }
}

export default reminderModal;