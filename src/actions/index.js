let nextReminderId = 0;
export const addReminder = reminder => ({
    type: 'ADD_REMINDER',
    reminder: {
        id: nextReminderId++,
        ...reminder,
    }
});

export const editReminder = reminder => ({
    type: 'EDIT_REMINDER',
    reminder,
});

export const showModalWindow = (date) => ({
    type: 'SHOW_REMINDER_MODAL_WINDOW',
    opened: true,
    date
});

export const closeModalWindow = () => ({
    type: 'CLOSE_REMINDER_MODAL_WINDOW',
    opened: false
});

export const ReminderWindowMode = {
    OPENED: 'OPENED',
    CLOSED: 'CLOSED',
};