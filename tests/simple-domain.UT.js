
require('string.prototype.startswith');

var Raclette = require("../index");


describe("unit test getter and setter on only a single domain", function () {
    let sut;
    beforeEach(function (done) {
        sut = new Raclette({ sharePageUrl: "http://localhost:8080/" });
        sut.loaded.then(_ => {
            done();
        });
    });
    afterEach(function () {
        sut.destroy();
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

    it("test clear", (done) => {
        sut.setItem("myKey", "my Value")
            .then(_ => {
                return sut.getItem("myKey")
            })
            .then(retrievedValue => {
                expect(retrievedValue).toBe("my Value");
                return sut.clear();
            })
            .then(() => {
                return sut.getItem("myKey")
            })
            .then((retrievedValue) => {
                expect(retrievedValue).toBe(null);
                done();
            });
    });

    it("test calling before initialization done should throw an exception", () => {
        sut.destroy();

        sut = new Raclette({ sharePageUrl: "http://localhost:8080/" });
        expect(_ => sut.setItem("myKey", "my Value")).toThrow();
    });
    it("test calling after destroy done should throw an exception", () => {
        sut.destroy();        
        expect(_ => sut.setItem("myKey", "my Value")).toThrow();
    });
});