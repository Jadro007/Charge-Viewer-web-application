module Callbacks {

    interface Func<T, TResult> {
        (item: T): TResult;
    }

}