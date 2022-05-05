// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('request');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const deasync = require('deasync');

export class SynchronousApiCalls {
  async postCall(data: any): Promise<any> {
    console.log('data.url', data.url);

    console.log('data received in', data);

    const options = {
      method: 'POST',
      url: data.url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.key}`,
      },
      body: data.body,
    };

    let ret = null;
    request(options, function (err: any, result: any) {
      ret = { err: err, result: result };
    });

    while (ret == null) {
      deasync.runLoopOnce();
    }

    console.log(
      'response synchronous post call',
      JSON.parse(ret.err || ret.result.body),
    );
    return JSON.parse(ret.err || ret.result.body);
  }

  async getCall(data: any): Promise<any> {
    const options = {
      method: 'GET',
      url: `${data.url}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.key}`,
      },
    };

    console.log('options', options);

    let ret = null;
    request(options, function (err: any, result: any) {
      ret = { err: err, result: result };
    });

    while (ret == null) {
      deasync.runLoopOnce();
    }

    console.log('response from verify', JSON.parse(ret.err || ret.result.body));
    return JSON.parse(ret.err || ret.result.body);
  }
}

/*
 - Post
data.url
data.key
data.post_body == full body from the strigify

 - get
 data.url
 data.key

*/
