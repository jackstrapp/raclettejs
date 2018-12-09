import { RacletteStorage } from "../src/index";

describe("unit test getter and setter on only a single domain", function () {

    let sut = new RacletteStorage({ sharePageUrl: "http://localhost:8080/" });
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
});