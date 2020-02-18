const reminders = (state = [], action) => {
    switch (action.type){
        case 'ADD_REMINDER':
            return [
                ...state,
                {
                    ...action.reminder
                }
        ];
        case 'EDIT_REMINDER':
            return state.map(reminder =>
                (reminder.id === action.reminder.id) ?
                    {
                        ...reminder,
                        ...action.reminder,
                    } :
                    reminder
            );
        default:
            return state;
    }
}

export default reminders;