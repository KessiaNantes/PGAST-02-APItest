// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação 
const app = require('../../app');

// Testes
describe('Tranfer Controller', () => {
  describe('POST /transfer', () => {
    
    it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
      const resposta = await request(app)
          .post('/transfer')
          .send({
            from: "rafael",
            to: "kessia",
            amount: 100
          });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
    });
    it('Quando informo os dados corretos recebo 201', async () => {
      const resposta = await request(app)
        .post('/tranfer')
        .send({
          from: "kessia",
            to: "rafael",
            amount: 50
        });
    });
});

  describe('GET /transfers', () => {

    it('Quando desejo verificar a lista de transferências recebo 200', async () => {
      const resposta = await request(app)
        .get('/transfers')
    })
  });
});
