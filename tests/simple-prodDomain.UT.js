var Raclette = require("../src/index");

describe("unit test getter and setter with production default domain", function () {

    let sut = new Raclette();

    beforeEach(function (done) {
        sut.loaded.then(_ => {
            done();
        });
    });

    it("shouldn't fail to set a variable", function (done) {
        sut.setItem("myKey", "my Value").then(done);
    });

    it("shouldn't fail to retrieve an item", (done) => {
        sut.setItem("myKey", "my Value")
            .then(_ => {
                return sut.getItem("myKey")
            })
            .then(retrievedValue => {
                expect(retrievedValue).toBe("my Value");
                done();
            });
    });
});