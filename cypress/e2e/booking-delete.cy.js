describe('API - Deletar agendamento', () => {
  it('Criar e excluir agendamento com autenticação', () => {
    const payload = {
      firstname: 'Ana',
      lastname: 'Costa',
      totalprice: 200,
      depositpaid: false,
      bookingdates: {
        checkin: '2026-09-01',
        checkout: '2026-09-03'
      },
      additionalneeds: 'TV'
    }

    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      body: {
        username: 'admin',
        password: 'password123'
      }
    }).then((authResponse) => {
      expect(authResponse.status).to.eq(200)
      const token = authResponse.body.token

      cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        body: payload
      }).then((createResponse) => {
        const bookingId = createResponse.body.bookingid

        cy.request({
          method: 'DELETE',
          url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
          headers: {
            Cookie: `token=${token}`
          },
          failOnStatusCode: false
        }).then((deleteResponse) => {
          expect([201, 204]).to.include(deleteResponse.status)

          cy.request({
            method: 'GET',
            url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
            failOnStatusCode: false
          }).then((getResponse) => {
            expect(getResponse.status).to.eq(404)
          })
        })
      })
    })
  })
})
