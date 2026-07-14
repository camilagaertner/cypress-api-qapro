describe('API - Atualizar agendamento', () => {
  it('deve atualizar um agendamento criado com autenticação', () => {
    const createPayload = {
      firstname: 'Bruno',
      lastname: 'Lima',
      totalprice: 120,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-10-01',
        checkout: '2026-10-05'
      },
      additionalneeds: 'Wi-Fi'
    }

    const updatePayload = {
      firstname: 'Bruno',
      lastname: 'Lima',
      totalprice: 180,
      depositpaid: false,
      bookingdates: {
        checkin: '2026-10-02',
        checkout: '2026-10-06'
      },
      additionalneeds: 'Ar-condicionado'
    }

    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: createPayload
    }).then((createResponse) => {
      const bookingId = createResponse.body.bookingid

      cy.request({
        method: 'PUT',
        url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        auth: {
          username: 'admin',
          password: 'password123'
        },
        body: updatePayload
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.firstname).to.eq(updatePayload.firstname)
        expect(response.body.lastname).to.eq(updatePayload.lastname)
        expect(response.body.totalprice).to.eq(updatePayload.totalprice)
        expect(response.body.depositpaid).to.eq(updatePayload.depositpaid)
        expect(response.body.bookingdates).to.deep.eq(updatePayload.bookingdates)
        expect(response.body.additionalneeds).to.eq(updatePayload.additionalneeds)
      })
    })
  })
})
