import axios from 'axios';

require('dotenv').config();

export async function getAllConfigs(uuid: string) {

  const BASE_URL = process.env.HIDDIFY_PANEL_BASE_URL;
  const PROXY_PATH = 'XYjFkikNpjLkq';
  const url = `${BASE_URL}/${PROXY_PATH}/${uuid}/api/v2/user/all-configs/`;


  try {
    const response = await axios.get(url);

    return await response.data;

  } catch (e) {
    console.error(e);

  }
}
export async function getAllInfo(uuid: string) {

  const BASE_URL = process.env.HIDDIFY_PANEL_BASE_URL;
  const PROXY_PATH = 'XYjFkikNpjLkq';
  const url = `${BASE_URL}/${PROXY_PATH}/${uuid}/api/v2/user/me/`;

  try {
    const response = await axios.get(url);

    return await response.data;

  } catch (e) {
    console.error(e);

  }
}