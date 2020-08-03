export function humanize(str) {
  return str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/[-\s]+/g, ' ')
    .replace(/^[a-z]/, match => match.toUpperCase());
}

export const taskTypes = [
  { value: 'dev-task', label: 'Development task' },
  { value: 'daily-task', label: 'Daily task' },
  { value: 'routine', label: 'Routine' },
  { value: 'incidentals', label: 'Incidentals' },
  { value: 'projects', label: 'Projects' },
  { value: 'problems', label: 'Problems' },
  { value: 'researching', label: 'Researching' },
  { value: 'testing', label: 'Testing' },
];
