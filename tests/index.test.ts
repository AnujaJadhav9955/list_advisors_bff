const app = require('../index')
const request = require('supertest')

describe('Server', () => {

    it('Should listen to HTTP requests', (done) => {
        request(app)
            .post('/graphql')
            .send({
                query: ` {
                  Advisors {
                    name,
                    id,
                    jobTitle,
                    badge,
                    desciption,
                    status,
                    review,
                    languages,
                    image    
                  }
                }`,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body && typeof res.body === 'object').toBe(true)
                expect(res.body).toHaveProperty('data')
                expect(res.body.data).toHaveProperty('Advisors')
                expect(res.body.data.Advisors[0]).toHaveProperty('name')
                return done()
            })
    })
})
