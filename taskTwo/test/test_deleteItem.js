const { expect } = require('chai');
const { createItem, deleteItem, extractIdFromStatus } = require('../helpers');

describe('DELETE /api/2/item/:id - Удаление объявления', function() {

  it('Тест 16: Успешное удаление существующего объявления', async function() {
    const payload = {
      sellerID: 567890,
      name: "Ad To Delete",
      price: 123,
      statistics: { contacts: 1, likes: 1, viewCount: 5 }
    };
    const createResp = await createItem(payload);
    let adId = createResp.data.id;
    if (!adId && createResp.data.status) {
      adId = extractIdFromStatus(createResp.data.status);
    }
    const deleteResp = await deleteItem(adId);
    expect(deleteResp.status).to.equal(200);
    expect(deleteResp.data).to.be.empty;
  });

  it('Тест 17: Удаление несуществующего объявления', async function() {
    const fakeId = "00000000-0000-0000-0000-000000000099";
    try {
      await deleteItem(fakeId);
      throw new Error("Запрос должен завершиться с ошибкой");
    } catch (error) {
      expect(error.response.status).to.equal(404);
      const data = error.response.data;
      expect(data).to.include.keys('result', 'status');
    }
  });

  it('Тест 18: Удаление с невалидным ID', async function() {
    try {
      await deleteItem("abc");
      throw new Error("Запрос должен завершиться с ошибкой");
    } catch (error) {
      expect(error.response.status).to.equal(400);
      const data = error.response.data;
      expect(data).to.include.keys('result', 'status');
    }
  });
});
