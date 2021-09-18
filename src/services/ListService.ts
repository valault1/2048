import List from '@/models/List';
import ListEntry from '@/models/ListEntry';
import ListGroup from '@/models/ListGroup';
import PopulatedListGroup from '@/models/PopulatedListGroup';
import axios, { AxiosResponse } from 'axios';

export default class ListService {
  apiUrl: string;
  constructor() {
    this.apiUrl = process.env.VUE_APP_API_URL; 
    console.log("using api url " + this.apiUrl);
  }
  

  async updateListEntry(listId: string, entry: ListEntry, index: number) : Promise<AxiosResponse<boolean>> {
    var request = {listId: listId, entry: entry, index: index};
    var response = await axios.post<boolean>(this.apiUrl + '/list/updateListEntry', request);
    return response;
  }

  async getAll() : Promise<AxiosResponse<Array<List>>> {
    var response = await axios.get<Array<List>>(this.apiUrl + '/list/getAll');
    return response;
  }

  async updateListName(listId: string, newName: string) {
    console.log("using apiUrl " + this.apiUrl);
    var request = {listId: listId, name: newName};
    var response = await axios.post<boolean>(this.apiUrl + '/list/updateListName', request);
    return response;
  }

  async createList(listGroupId: string, name: string, userId: string) : Promise<AxiosResponse<string>> {
    var request = {listGroupId: listGroupId, name: name, userId: userId};
    var response = await axios.put<string>(this.apiUrl + '/list/create', request);
    return response;
  }

}