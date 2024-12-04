import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PersonalInfoForm } from './PersonalInfoForm';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('PersonalInfoForm', () => {
    const onSubmitMock = jest.fn();

    beforeEach(() => {
        onSubmitMock.mockClear();
    });

    test('renders form with default values', () => {
        const initialValues = { firstName: 'John', surName: 'Doe' };

        render(
            <PersonalInfoForm
                onSubmit={onSubmitMock}
                personalInfo={initialValues}
            />
        );

        expect(screen.getByPlaceholderText('Enter your firstname')).toHaveValue(
            'John'
        );
        expect(screen.getByPlaceholderText('Enter your surname')).toHaveValue(
            'Doe'
        );
    });

    test('shows validation errors when form is submitted with empty fields', async () => {
        render(<PersonalInfoForm onSubmit={onSubmitMock} />);

        fireEvent.click(screen.getByText('Next'));

        await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
            expect(screen.getByText('Surname is required')).toBeInTheDocument();
        });
    });

    test('submits the form with valid input', async () => {
        const initialValues = { firstName: '', surName: '' };

        render(
            <PersonalInfoForm
                onSubmit={onSubmitMock}
                personalInfo={initialValues}
            />
        );

        userEvent.type(
            screen.getByPlaceholderText('Enter your firstname'),
            'John'
        );
        userEvent.type(
            screen.getByPlaceholderText('Enter your surname'),
            'Doe'
        );

        fireEvent.click(screen.getByText('Next'));

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledWith(
                {
                    firstName: 'John',
                    surName: 'Doe',
                },
                expect.anything(),
                expect.anything()
            );
        });
    });

    test('shows individual validation error when field is left empty and submitted', async () => {
        render(<PersonalInfoForm onSubmit={onSubmitMock} />);

        userEvent.type(
            screen.getByPlaceholderText('Enter your firstname'),
            'John'
        );
        fireEvent.click(screen.getByText('Next'));

        await waitFor(() => {
            expect(
                screen.queryByText('Name is required')
            ).not.toBeInTheDocument();
            expect(screen.getByText('Surname is required')).toBeInTheDocument();
        });
    });
});
