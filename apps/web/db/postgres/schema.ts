import { pgTable, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    fullName: varchar('full_name', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const visitorLinks = pgTable('visitor_links', {
    visitorId: varchar('visitor_id', { length: 255 }).primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    linkedAt: timestamp('linked_at').defaultNow().notNull(),
});
