class Fluxify {
    constructor() {
        this.storeInstances = [];
    }

    setObserver(observer) {
        this.observer = observer;
    }
}

module.exports = new Fluxify;
