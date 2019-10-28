import * as xml2js from 'xml2js';
import axios from 'axios';
import Grid from '@/models/entities/Grid';

export default class GeocodingAPI {
  static async getDEGWorldGridFromPlaceName(placeName: string) {
    const REQUEST_URL = `https://www.geocoding.jp/api/?v=1.1&q=${encodeURI(placeName)}`;

    const response = await axios.get(REQUEST_URL);
    const xmlResult = await xml2js.parseStringPromise(response.data);

    if (!xmlResult.result || xmlResult.result.error) {
      return {};
    }

    const grid: Grid = { lat: xmlResult.result.coordinate[0].lat[0], lng: xmlResult.result.coordinate[0].lng[0] };

    return grid;
  }
}
