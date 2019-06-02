import {NoActionNameError, NoActionBodyError} from './errors/actionErrors.js';
import BaseStore from './baseStore.js';

/**
 * Класс для создание пользовательских событий
 */
class ActionCreator {
    create({action, actionData} = {}) {
        let payload = {};
        if (!action) {
            /**
             * бросить error если не было передано имя action
             */
            throw new NoActionNameError;
        }
        if (action.body) {
            if (actionData) {
                payload = action.formatMethod ?
                    action.formatMethod(action.body, actionData) :
                    actionData;
                // TODO сделать проверку payload на соответствие body
            } else {
                /**
                 * бросить warning о том что с этим action должны быть переданы данные
                 * так как для этого action есть body.
                 * Но в метод create эти данные не были переданы.
                 */
                console.warn('This action has body, but no data was passed. ' +
                'Payload will be empty {} in this case');
            }
        } else {
            if (actionData) {
                /**
                 * бросить error о том что нельзя передавать данные
                 * вместе с action, не описав при это body для данных
                 * этого action
                 */
                throw new NoActionBodyError;
            }
        }
        BaseStore.handle({action: action.name, payload});
    }

    // createBatch(actions) {
    //     actions.forEach( (action) => {
    //         this.create(action);
    //     });
    // }
}

export default new ActionCreator;
