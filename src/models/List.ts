import ListEntry from './ListEntry';

export default interface List {
  id: string;
  name: string;
  userId: string;
  entries: ListEntry[];
}