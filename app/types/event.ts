export interface EventType {
  event: {
    id: number | string;
    name: string;
    date: string;
    location: string;
    description: string;
    category: string;
    imageUrl: string;
    organizerId: number;
    organizer: unknown;
    tickets: unknown;
    createdAt: string;
    updatedAt: string;
  };
}
