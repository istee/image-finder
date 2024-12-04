import { PredefinedTopic } from 'models/PredefinedTopic';
import { TopicCard } from 'models/TopicCard';
import { v4 as uuid } from 'uuid';

export const mockedData: TopicCard[] = [
    {
        id: uuid(),
        firstName: 'John',
        surName: 'Doe',
        topic: PredefinedTopic.Cars,
        image: 'https://images.unsplash.com/photo-1488134684157-fea2d81a5ec4?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: uuid(),
        firstName: 'Jane',
        surName: 'Doe',
        topic: PredefinedTopic.Technology,
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: uuid(),
        firstName: 'James',
        surName: 'Smith',
        topic: PredefinedTopic.Wildlife,
        image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];
