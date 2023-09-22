import { format } from 'date-fns';

export const formatDate = (date: Date | string) =>
    format(typeof date === 'string' ? new Date(date) : date, 'MM/dd/yyyy');
