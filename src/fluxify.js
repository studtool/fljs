export default class Fluxify {
    constructor() {
        this.storeInstances = [];
    }

    setObserver(observer) {
        this.observer = observer;
    }
}
