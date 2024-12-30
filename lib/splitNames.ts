export function splitFullName(name: string): {
  firstName: string;
  secondName: string;
} {
  const nameParts = name?.split(' ');
  const firstName = nameParts[0]; // First part is the first name
  const secondName = nameParts[1] || ''; // Second part is the second name, defaulting to an empty string if missing

  return { firstName, secondName };
}
