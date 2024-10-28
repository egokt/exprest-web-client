export class EndpointClient {
    url: string;

    constructor({
        url,
    } : {
        url: string,
    }) {
        this.url = url;
    }
}
