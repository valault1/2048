import ListGroup from '@/models/ListGroup';
import PopulatedListGroup from '@/models/PopulatedListGroup';
import axios, { AxiosResponse } from 'axios';

export default class ListGroupService {
  apiUrl: string;
  constructor() {
    this.apiUrl = process.env.VUE_APP_API_URL; 
    console.log("using api url " + this.apiUrl);
  }

  async getPopulatedListGroupsByUser(userId: string) : Promise<AxiosResponse<Array<PopulatedListGroup>>> {
    var response = await axios.get<Array<PopulatedListGroup>>(this.apiUrl + '/listGroup/getPopulatedListGroupsbyUser/' + userId);
    return response;
  }

}