
/* eslint-disable */
 // @ts-nocheck 

import prisma from "./db";

interface FetchEventsParams {
  name?: string;
  location?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  ticketStatus?: string;
  ticketType?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}

export async function getEvents({
  name,
  location,
  description,
  startDate,
  endDate,
  ticketStatus,
  ticketType,
  sortBy = "date",
  sortOrder = "asc",
  page = 1,
  limit = 10,
}: FetchEventsParams) {
  const skip = (page - 1) * limit;

  const filters: unknown = {
    ...(name && { name: { contains: name, mode: "insensitive" } }),
    ...(location && { location: { contains: location, mode: "insensitive" } }),
    ...(description && {
      description: { contains: description, mode: "insensitive" },
    }),
    ...(startDate || endDate
      ? {
          date: {
            ...(startDate && { gte: new Date(startDate) }),
            ...(endDate && { lte: new Date(endDate) }),
          },
        }
      : {}),
    ...(ticketStatus || ticketType
      ? {
          tickets: {
            some: {
              ...(ticketStatus && { status: ticketStatus }),
              ...(ticketType && { type: ticketType }),
            },
          },
        }
      : {}),
  };

  const [events, totalCount] = await Promise.all([
    prisma.event.findMany({
      where: filters,
      include: {
        tickets: true,
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.event.count({
      where: filters,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    events,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      limit,
    },
  };
}
