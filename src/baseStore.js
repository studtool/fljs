import Fluxify from './fluxify';

export default class BaseStore {
    constructor(state = {}) {
        this.initialState = {...state};
        this.state = {...state};
        this.handledActions = this.getHandledActions();
        this.subscribedComponents = [];
        Fluxify.storeInstances.push(this);
    }

    getState() {
        return this.state;
    }

    getInitialState() {
        return this.initialState;
    }

    /**
     * метод для создания state в компоненте
     * Если state в компоненте может включать в себя поля из разных сторов
     * с помощью этого метода можно соединить state
     * из разных сторов в один объект,
     * и присвоить этот объект в state компонента
     * @param {Array} stores - array сторов
     * @return {object}
     */
    buildStateFrom(stores) {
        return Object.assign(...stores);
    }

    /**
     * компонент начинает следить за именение state в сторе
     * @param {component} component - React component
     */
    subscribeToRecieveState(component) {
        this.subscribedComponents.push(component);
    }

    /**
     *  компонент перестает следить за имзенением state этого стора
     * @param {component} component - React component
     */
    unsubscribe(component) {
        this.subscribedComponents = this.subscribedComponents.filter(
            curComp => {
                return curComp !== component;
            }
        );
    }

    /**
     * метод для передачи state из стора в компоненты, подписавшиеся на
     * изменение state этого стора
     * @param {object} state - пропсы компоненты
     */
    deliverState({state} = {}) {
        // console.log(this.subscribedComponents);
        // console.log('new one', state);
        for (const component of this.subscribedComponents) {
            component.setState(() => {
                return state;
            });
        }
    }

    static handle({action, payload = {}} = {}) {
        for (const store of Fluxify.storeInstances) {
            store._handle(action, payload);
        }
    }

    /**
     * @param {string} action - иницируемое событие
     * @param {object} payload - данные, переданные вместе с событием
     * Если был передан обработчик события,
     * то к arguments необходимо добавить payload,
     * так как этот объект может использоваться в обработчике.
     * Чтобы избежать ошибок в передаче аргументов в обработчик события,
     * в сигнатуре обработчика нужно использовать
     * деструкторизацию f({arg1, arg2} = {}) {}
     * Если обработчик события не был передан, то вызывается Bus.emit
     * с переданными аргументами
     */
    _handle(action, payload) {
        // если стор обрабатывает переданный action
        if (this.handledActions[action]) {
            // если для обработки был задан колбэк
            if (this.handledActions[action].callback) {
                this.handledActions[action].arguments =
                    // TODO КОСТЫЛЬ добавить проверку передан ли аргументс
                    this.handledActions[action].arguments
                        ? this.handledActions[action].arguments
                        : {};
                this.handledActions[action].arguments.payload = payload;
                this.handledActions[action].callback(
                    this.handledActions[action].arguments
                );
            } else {
                // если колбэка нет то просто емитим
                Fluxify.observer.emit(this.handledActions[action].arguments);
            }
        }
    }
}
