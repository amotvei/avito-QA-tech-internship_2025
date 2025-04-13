const { expect } = require('chai');
const { createItem } = require('../helpers');

describe('POST /api/1/item - Создание объявления', function() {
  
  it('Тест 1: Успешное создание объявления', async function() {
    const payload = {
      sellerID: 123456,
      name: "Test Item",
      price: 100,
      statistics: { contacts: 5, likes: 3, viewCount: 10 }
    };
    const response = await createItem(payload);
    expect(response.status).to.equal(200);
    const data = response.data;
    expect(data).to.have.any.keys('id', 'status');
  });

  it('Тест 2: Создание объявления с невалидным sellerID', async function() {
    const payload = {
      sellerID: "abc123", 
      name: "Test Invalid",
      price: 1000,
      statistics: { contacts: 5, likes: 3, viewCount: 10 }
    };
    try {
      await createItem(payload);
      throw new Error("Запрос должен завершиться с ошибкой");
    } catch (error) {
      expect(error.response.status).to.equal(400);
      const data = error.response.data;
      expect(data).to.include.keys('result', 'status');
    }
  });

  it('Тест 3: Создание объявления без обязательных полей', async function() {
    const payload = {
      sellerID: 123456
    };
    try {
      await createItem(payload);
      throw new Error("Запрос должен завершиться с ошибкой");
    } catch (error) {
      if (!error.response) { throw error; } // поменял
      expect(error.response.status).to.equal(400);
      const data = error.response.data;
      expect(data).to.include.keys('result', 'status');
    }
  });
});
