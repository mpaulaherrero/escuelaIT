import { SecretCombination } from './SecretCombination.mjs'

export class UserSecretCombination extends SecretCombination {

    constructor(){
        super();
    }

    accept(visitor){
        visitor.visitUserSecretCombination();
    }

    setCombination(combination){
       this.setValue(combination.getValue());
    }
}