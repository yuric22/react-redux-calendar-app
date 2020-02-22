import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {AddReminder} from '../containers/AddReminder';

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        addReminder: jest.fn(),
        editReminder: jest.fn(),
        closeModalWindow: jest.fn(),
        originalDate: "2020-02-02",
        selectedReminder: null,
    }
    const wrapper = mount(<AddReminder {...props} />)
    return {
        props,
        wrapper,
    }
}

describe('Add Reminder Modal Window', () => {
    describe('when trying to submit the form without setting fields values', () => {
        let addReminderSpy, closeModalSpy;

        beforeEach(() => {
            const { wrapper, props } = setup();
            addReminderSpy = jest.spyOn(props, 'addReminder');
            closeModalSpy = jest.spyOn(props, 'closeModalWindow');
            wrapper.find('form').simulate('submit', {preventDefault: () => {}});
            wrapper.render();
        });

        it('should not call addReminder dispatch', () => {
            expect(addReminderSpy).toHaveBeenCalledTimes(0);
        });

        it('should not call closeModal dispatch', () => {
            expect(closeModalSpy).toHaveBeenCalledTimes(0);
        });
    });

    describe('when submiting the form setting fields values correctly', () => {
        let addReminderSpy;

        beforeEach(() => {
            const { wrapper, props } = setup();
            addReminderSpy = jest.spyOn(props, 'addReminder');

            const labelInput = wrapper.find('input').find({id: 'label'});
            labelInput.instance().value = "My Appointment";
            labelInput.simulate('change');

            const timeInput = wrapper.find('input').find({id: 'time'});
            timeInput.instance().value = '10:00';
            timeInput.simulate('change');

            const cityInput = wrapper.find('input').find({id: 'city'});
            cityInput.instance().value = 'Brasília';
            cityInput.simulate('change');
            wrapper.find('form').simulate('submit', {preventDefault: () => {}});
        });

        it('should call addReminder dispatch correctly', done => {
            setTimeout(() => {
                expect(addReminderSpy).toHaveBeenCalledTimes(1)
                done();
            });
        });
    });
});
