describe('API - Atualizar agendamento', () => {
  it('Atualizar agendamento criado com autenticação', () => {
    const createPayload = {
      firstname: 'Camila',
      lastname: 'Gaertner',
      totalprice: 120,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-10-01',
        checkout: '2026-10-05'
      },
      additionalneeds: 'Wi-Fi'
    }

    const updatePayload = {
      firstname: 'Camila',
      lastname: 'Gaertner',
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
      url: 'https://restful-booker.herokuapp.com/auth',
      body: {
        username: 'admin',
        password: 'password123'
      }
    }).then((authResponse) => {
      const token = authResponse.body.token

      cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        body: createPayload
      }).then((createResponse) => {
        const bookingId = createResponse.body.bookingid

        cy.request({
          method: 'PUT',
          url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
          headers: {
            Cookie: `token=${token}`
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

  it('Falhar ao atualizar um agendamento inexistente', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      body: {
        username: 'admin',
        password: 'password123'
      }
    }).then((authResponse) => {
      const token = authResponse.body.token

      cy.request({
        method: 'PUT',
        url: 'https://restful-booker.herokuapp.com/booking/999999',
        headers: {
          Cookie: `token=${token}`
        },
        body: {
          firstname: 'Camila',
          lastname: 'Gaertner',
          totalprice: 180,
          depositpaid: false,
          bookingdates: {
            checkin: '2026-10-02',
            checkout: '2026-10-06'
          },
          additionalneeds: 'Ar-condicionado'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(405)
      })
    })
  })
})
