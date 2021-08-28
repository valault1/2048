import settings from '@/localSettings.json'
import ListGroup from '@/models/ListGroup';
import PopulatedListGroup from '@/models/PopulatedListGroup';
import axios, { AxiosResponse } from 'axios';

export default class ListGroupService {
  apiUrl = settings.apiUrl; 
  userId = settings.userId;

  async getPopulatedListGroupsByUser(userId: string) : Promise<AxiosResponse<Array<PopulatedListGroup>>> {
    var response = await axios.get<Array<PopulatedListGroup>>(this.apiUrl + '/listGroup/getPopulatedListGroupsbyUser/' + userId);
    return response;
  }

}