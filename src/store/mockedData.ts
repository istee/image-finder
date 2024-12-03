import { PredefinedTopic } from 'models/PredefinedTopic';
import { TopicCard } from 'models/TopicCard';
import { v4 as uuid } from 'uuid';

export const mockedData: TopicCard[] = [
  {
    id: uuid(),
    firstName: 'John',
    surName: 'Doe',
    topic: PredefinedTopic.Cars,
    image: 'https://unsplash.com/photos/road-with-assorted-cars-m2TKgpU3cvc',
  },
  {
    id: uuid(),
    firstName: 'Jane',
    surName: 'Doe',
    topic: PredefinedTopic.Technology,
    image:
      'https://unsplash.com/photos/turned-on-gray-laptop-computer-XJXWbfSo2f0',
  },
  {
    id: uuid(),
    firstName: 'James',
    surName: 'Smith',
    topic: PredefinedTopic.Wildlife,
    image:
      'https://unsplash.com/photos/group-of-zebra-walking-on-wheat-field-Jgiv1rSIpVM',
  },
];
