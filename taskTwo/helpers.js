const axios = require('axios');

const BASE_URL_V1 = "https://qa-internship.avito.com/api/1";
const BASE_URL_V2 = "https://qa-internship.avito.com/api/2";

async function createItem(payload) {
  const url = `${BASE_URL_V1}/item`;
  return await axios.post(url, payload, { headers: { 'Content-Type': 'application/json' } });
}

async function getItemById(itemId, version = "v1") {
  if (version !== "v1") {
    throw new Error("Only version v1 is supported for getItemById");
  }
  const url = `${BASE_URL_V1}/item/${itemId}`;
  return await axios.get(url);
}

async function getItemsBySeller(sellerId) {
  const url = `${BASE_URL_V1}/${sellerId}/item`;
  return await axios.get(url);
}

async function getStatisticById(itemId, version = "v1") {
  let url = "";
  if (version === "v1") {
    url = `${BASE_URL_V1}/statistic/${itemId}`;
  } else if (version === "v2") {
    url = `${BASE_URL_V2}/statistic/${itemId}`;
  } else {
    throw new Error("Unsupported version");
  }
  return await axios.get(url);
}

async function deleteItem(itemId) {
  const url = `${BASE_URL_V2}/item/${itemId}`;
  return await axios.delete(url);
}


function extractIdFromStatus(statusStr) {
  const parts = statusStr.split(" - ");
  return parts.length > 1 ? parts[1].trim() : null;
}

module.exports = {
  createItem,
  getItemById,
  getItemsBySeller,
  getStatisticById,
  deleteItem,
  extractIdFromStatus,
  BASE_URL_V1,
  BASE_URL_V2
};
