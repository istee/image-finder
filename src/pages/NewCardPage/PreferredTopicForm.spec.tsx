import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PreferredTopicForm } from './PreferredTopicForm';
import React from 'react';

const onSubmitMock = jest.fn();
const onBackStepMock = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

test('renders the Preferred Topic form', () => {
    render(
        <PreferredTopicForm
            onBackStep={onBackStepMock}
            onSubmit={onSubmitMock}
        />
    );

    expect(screen.getByLabelText(/Preferred Topic/i)).toBeInTheDocument();

    expect(screen.getByText(/Next/i)).toBeInTheDocument();

    expect(screen.getByText(/Back/i)).toBeInTheDocument();
});

test('displays error message if no topic is selected', async () => {
    render(
        <PreferredTopicForm
            onBackStep={onBackStepMock}
            onSubmit={onSubmitMock}
        />
    );

    const nextButton = screen.getByText(/Next/i);

    fireEvent.click(nextButton);

    await waitFor(() => {
        expect(
            screen.getByText(/Preferred Topic is required/i)
        ).toBeInTheDocument();
    });
});

test('calls onBackStep when the "Back" button is clicked', () => {
    render(
        <PreferredTopicForm
            onBackStep={onBackStepMock}
            onSubmit={onSubmitMock}
        />
    );

    const backButton = screen.getByText(/Back/i);

    fireEvent.click(backButton);

    expect(onBackStepMock).toHaveBeenCalled();
});
