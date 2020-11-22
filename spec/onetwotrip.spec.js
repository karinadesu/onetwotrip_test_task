let CONST = require('../test_files/onetwotrip.constants');
let chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = require("chai").expect;

chai.use(require('chai-json'));
chai.use(chaiHttp);
const { it, describe } = require('mocha');

describe("OneTwoTrip Test Tasks", function () {

    it("Task 1.", function (done) {

        chai.request(CONST.BASE_URL)
            .get('/_bus/geo/suggest')
            .query({ query: CONST.DEPARTURE_VALUE, limit: CONST.LIMIT })
            .end(function (err, res) {

                expect(res.status).to.equal(200);
                expect(res.body.data.length).to.equal(5);
                expect(res).to.be.json;

                for (let i = 0; i < res.body.data.length; i++) {
                    
                    expect(res.body.data[i].name).to.include(CONST.DEPARTURE_VALUE);
                    expect(res.body.data[i]).to.have.all.keys(CONST.DEPARTURE_KEYS_RESPONSE);
                }

                done();
            });
    });

    it("Task 2. Check redirect", function (done) {
        
        chai.request(CONST.BASE_URL)   
            .get('/')
            .redirects(0)
            .end(function (err, res) {
                expect(res.status).to.equal(301);
                expect(res).to.redirectTo(CONST.REDIRECTED_BASE_URL);
                done();
            });
    });
});