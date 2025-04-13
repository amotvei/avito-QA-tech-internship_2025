const { expect } = require('chai');
const { createItem, getStatisticById, extractIdFromStatus } = require('../helpers');

describe('GET /statistic/:id - Получение статистики объявления', function() {

  it('Тест 10: Успешное получение статистики через V1', async function() {
    const payload = {
      sellerID: 456789,
      name: "Stats Item V1",
      price: 200,
      statistics: { contacts: 3, likes: 7, viewCount: 50 }
    };
    const createResp = await createItem(payload);
    let adId = createResp.data.id;
    if (!adId && createResp.data.status) {
      adId = extractIdFromStatus(createResp.data.status);
    }
    const response = await getStatisticById(adId, "v1");
    expect(response.status).to.equal(200);
    const data = response.data;
    expect(data).to.be.an('array');
    if (data.length > 0) {
      expect(data[0]).to.include.keys('likes', 'viewCount', 'contacts');
    }
  });

  it('Тест 11: Успешное получение статистики через V2', async function() {
    const payload = {
      sellerID: 456789,
      name: "Stats Item V2",
      price: 250,
      statistics: { contacts: 4, likes: 8, viewCount: 60 }
    };
    const createResp = await createItem(payload);
    let adId = createResp.data.id;
    if (!adId && createResp.data.status) {
      adId = extractIdFromStatus(createResp.data.status);
    }
    const response = await getStatisticById(adId, "v2");
    expect(response.status).to.equal(200);
    const data = response.data;
    expect(data).to.be.an('array');
    if (data.length > 0) {
      expect(data[0]).to.include.keys('likes', 'viewCount', 'contacts');
    }
  });

  it('Тест 12: Запрос статистики для несуществующего объявления через V1', async function() {
    const fakeId = "00000000-0000-0000-0000-000000000000";
    try {
      await getStatisticById(fakeId, "v1");
      throw new Error("Запрос должен завершиться с ошибкой");
    } catch (error) {
      expect(error.response.status).to.equal(404);
      const data = error.response.data;
      expect(data).to.include.keys('result', 'status');
    }
  });

  it('Тест 13: Невалидный формат ID для статистики через V1', async function() {
    try {
      await getStatisticById("invalid-id", "v1");
      throw new Error("Запрос должен завершиться с ошибкой");
    } catch (error) {
      expect([400, 404]).to.include(error.response.status);
      const data = error.response.data;
      expect(data).to.include.keys('result', 'status');
    }
  });

  it('Тест 14: Запрос статистики для несуществующего объявления через V2', async function() {
    const fakeId = "00000000-0000-0000-0000-000000000000";
    try {
      await getStatisticById(fakeId, "v2");
      throw new Error("Запрос должен завершиться с ошибкой");
    } catch (error) {
      if (!error.response) { throw error; }
      expect(error.response.status).to.equal(404);
      const data = error.response.data;
      expect(data).to.include.keys('result', 'status');
    }
  });

  it('Тест 15: Невалидный формат ID для статистики через V2', async function() { 
    try {
      await getStatisticById("not-uuid", "v2");
      throw new Error("Запрос должен завершиться с ошибкой");
    } catch (error) {
      if (!error.response) { throw error; }
      expect([400, 404]).to.include(error.response.status);
      const data = error.response.data;
      expect(data).to.include.keys('result', 'status');
    }
  });
});
