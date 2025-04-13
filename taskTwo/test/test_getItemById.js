const { expect } = require('chai');
const { createItem, getItemById, extractIdFromStatus } = require('../helpers');

describe('GET /api/1/item/:id - Получение объявления по ID', function() {

  it('Тест 4: Успешное получение объявления', async function() {
    const payload = {
      sellerID: 234567,
      name: "Fetched Item",
      price: 99,
      statistics: { contacts: 1, likes: 2, viewCount: 5 }
    };
    const createResp = await createItem(payload);
    let adId = createResp.data.id;
    if (!adId && createResp.data.status) {
      adId = extractIdFromStatus(createResp.data.status);
    }
    const response = await getItemById(adId, "v1");
    expect(response.status).to.equal(200);
    const data = response.data;
    expect(data[0]).to.include.keys('id', 'sellerId', 'name', 'price', 'statistics');
    expect(data[0].id).to.equal(adId);
  });

  it('Тест 5: Получение несуществующего объявления', async function() {
    const fakeId = "00000000-0000-0000-0000-000000000000";
    try {
      await getItemById(fakeId, "v1");
      throw new Error("Запрос должен завершиться с ошибкой");
    } catch (error) {
      expect(error.response.status).to.equal(404);
      const data = error.response.data;
      expect(data).to.include.keys('result', 'status');
    }
  });

  it('Тест 6: Невалидный формат id', async function() {
    try {
      await getItemById("invalid-id", "v1");
      throw new Error("Запрос должен завершиться с ошибкой");
    } catch (error) {
      expect([400, 404]).to.include(error.response.status);
      const data = error.response.data;
      expect(data).to.include.keys('result', 'status');
    }
  });
});
