import axios from 'axios';
import fetch from 'node-fetch';

export class ExternalApiCalls {
  async postData(
    url: string,
    dataToPost: unknown,
    headers?: any,
  ): Promise<any> {
    const axiosConfig = {
      headers: headers || {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    console.log('data to post', dataToPost);
    let result: any;
    try {
      const response = await axios.post(url, dataToPost, axiosConfig);
      result = await response.data;
      console.log('response from Post Data function', result);
    } catch (error) {
      console.log('error', error);
    }

    return result;
  }

  async fetchData(url: string): Promise<any> {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Error occured in Fetch data service call');
    }
  }

  async fetchCall(url: string, options: any) {
    console.log('data to post', url, options);
    let result: any;
    try {
      const response = await fetch(url, options);
      console.log('response from fetch api function', response);
      result = await response.json();
      console.log('result from fetch api function', result);
    } catch (error) {
      console.log('error', error);
    }

    return result;
  }
}
