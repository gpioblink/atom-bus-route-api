export default class GeocodingAPI {
    static async getDEGWorldGrid(placeName: string) {
        const REQUEST_URL = `https://www.geocoding.jp/api/?v=1.1&q=${placeName}`;
        console.log(`GET: ${REQUEST_URL}`);

        
    }
}