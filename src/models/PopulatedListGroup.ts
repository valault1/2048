import List from './List';

export default interface ListGroup {
    id: string;
    name: string;
    userId: string;
    lists: List[]
  }