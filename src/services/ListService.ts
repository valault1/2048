import settings from '@/localSettings.json'
import List from '@/models/List';
import ListEntry from '@/models/ListEntry';
import ListGroup from '@/models/ListGroup';
import PopulatedListGroup from '@/models/PopulatedListGroup';
import axios, { AxiosResponse } from 'axios';

export default class ListService {
  apiUrl = settings.apiUrl; 
  userId = settings.userId;

  async updateListEntry(listId: string, entry: ListEntry, index: number) : Promise<AxiosResponse<boolean>> {
    var request = {listId: listId, entry: entry, index: index};
    var response = await axios.post<boolean>(this.apiUrl + '/list/updateListEntry', request);
    return response;
  }

  async getAll() : Promise<AxiosResponse<Array<List>>> {
    var response = await axios.get<Array<List>>(this.apiUrl + '/list/getAll');
    return response;
  }

}