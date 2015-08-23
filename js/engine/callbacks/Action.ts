module Callbacks {

    export interface Action<T> {
        (item: T): void;
    }

    export interface Action2<T, T2> extends Action<T>{
        (item: T, item2: T2): void;
    }


}