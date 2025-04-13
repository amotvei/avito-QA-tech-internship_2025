const { expect } = require('chai');
const { createItem, getItemsBySeller } = require('../helpers');

describe('GET /api/1/:sellerID/item - Получение объявлений по продавцу', function() {

  it('Тест 7: Получение объявлений для существующего продавца', async function() {
    const sellerID = 345678;
    const payload = {
      sellerID: sellerID,
      name: "Seller's Ad",
      price: 150,
      statistics: { contacts: 2, likes: 5, viewCount: 20 }
    };
    await createItem(payload);
    const response = await getItemsBySeller(sellerID);
    expect(response.status).to.equal(200);
    const data = response.data;
    expect(data).to.be.an('array');
    if (data.length > 0) {
      expect(data[0]).to.include.keys('id', 'sellerId', 'name', 'price', 'statistics');
    }
  });

  it('Тест 8: Получение объявлений для продавца, у которого их нет', async function() {
    const sellerID = 888888;
    const response = await getItemsBySeller(sellerID);
    expect(response.status).to.equal(200);
    const data = response.data;
    expect(data).to.be.an('array');
    expect(data.length).to.equal(0);
  });

  it('Тест 9: Невалидный формат sellerID', async function() {
    try {
      await getItemsBySeller("abc");
      throw new Error("Запрос должен завершиться с ошибкой");
    } catch (error) {
      expect(error.response.status).to.equal(400);
      const data = error.response.data;
      expect(data).to.include.keys('result', 'status');
    }
  });
});
