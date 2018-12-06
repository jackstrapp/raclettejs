import { RacletteStorage } from "../src/index";

describe("unit test getter and setter on only a single domain", function () {
    let div = document.createElement('div');
    div.id = "main";
    document.body.appendChild(div);
    let sut = new RacletteStorage();
    beforeEach(function (done) {
        console.log("before each start");
        sut = new RacletteStorage();
        sut.loaded.then(_ => {
            console.log("before each done");
        });
        console.log("before each end");
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