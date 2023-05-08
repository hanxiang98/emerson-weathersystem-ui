export interface IGetVariablesQuery {
    variableName: string;
    cityName: string;
    startTimeStamp: Date;
    endTimeStamp: Date;
}


export interface ICity {
    name: string;
}

export interface IVariable {
    name: string;
    unit: string;
    value: string;
    cityName: string;
    timeStamp: Date;

    getCelcuisValue(variable: IVariable): number;
}

export class Variable implements IVariable{
    name: string = '';
    unit: string = '';
    value: string = '';
    cityName: string = '';
    timeStamp: Date = new Date();

    Variable(){

    }
    
    getCelcuisValue(variable: IVariable){
        if(variable.unit == '°F'){
            //5/9 x (F-32)
            return 5/9 * (+variable.value-32);
        }
        return +variable.value;
    }

    /*
    getCelcuisValue = () : number => {

        if(this.unit == '°F'){
            //5/9 x (F-32)
            return 5/9 * (+this.value-32);
        }
        return +this.value;
    }*/

}
