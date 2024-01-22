export const userRoles = ["super_admin", "admin", "student"];
export const adminPermissions = [
  "user",
  "course",
  "subscription",
  "course_video",
  "exam",
  "book",
  "order_status",
  "order",
] as const;

export const userFilterableFields = [
  "searchTerm",
  "name",
  "email",
  "contact_no",
];

export const userSearchableFields = ["name", "email", "contact_no"];
