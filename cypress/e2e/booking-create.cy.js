describe('API - Cadastro de agendamento', () => {
  it('Agendamento com sucesso', () => {
    const payload = {
      firstname: 'Arthur',
      lastname: 'Plestch',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-08-10',
        checkout: '2026-08-15'
      },
      additionalneeds: 'Cafe da manhã'
    }

    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: payload
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('bookingid')
      expect(response.body.booking.firstname).to.eq(payload.firstname)
      expect(response.body.booking.lastname).to.eq(payload.lastname)
      expect(response.body.booking.totalprice).to.eq(payload.totalprice)
      expect(response.body.booking.depositpaid).to.eq(payload.depositpaid)
      expect(response.body.booking.bookingdates).to.deep.eq(payload.bookingdates)
      expect(response.body.booking.additionalneeds).to.eq(payload.additionalneeds)
    })
  })

  it('Falha ao criar agendamento com payload inválido', () => {
    const invalidPayload = {
      firstname: 'Arthur',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-08-10',
        checkout: '2026-08-15'
      }
    }

    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: invalidPayload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(500)
    })
  })
})
