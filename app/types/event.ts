export interface EventType {
  id: number | string;
  name: string;
  date: string | Date;
  location: string;
  description: string;
  categoryId?: number;
  category?: unknown;
  imageUrl: string | null;
  organizerId: number;
  organizer?: unknown;
  tickets?: unknown;
  createdAt: string | Date;
  updatedAt: string | Date;
}
