export { }

declare global {
  interface Subscriber {
    next?: (value: any) => void;
    error?: (error: any) => void;
    complete?: () => void;

    addTeardown?: (teardown: () => void) => void;

    active?: boolean;
    signal?: AbortSignal;
  }

  type SubscribeCallback = (subscriber: Subscriber) => void;
  type ObservableSubscriptionCallback = (value: any) => void;

  interface SubscriptionObserver {
    next?: ObservableSubscriptionCallback;
    error?: ObservableSubscriptionCallback;
    complete?: () => void;
  }

  type ObservableInspectorAbortHandler = (value: any) => void;

  interface ObservableInspector {
    next?: ObservableSubscriptionCallback;
    error?: ObservableSubscriptionCallback;
    complete?: () => void;

    subscribe?: () => void;
    abort?: ObservableInspectorAbortHandler;
  }

  type ObserverUnion =
    | ObservableSubscriptionCallback
    | SubscriptionObserver

  type ObservableInspectorUnion =
    | ObservableInspector
    | ObservableInspectorAbortHandler

  interface SubscribeOptions {
    signal: AbortSignal;
  }


  interface Observable {
    subscribe(
      observer?: ObserverUnion,
      options?: SubscribeOptions
    ): void;
    takeUntil(value:
      | Observable
      | Iterable<any>
      | AsyncIterable<any>
      | PromiseLike<any>
      | unknown
    ): Observable;
    map(mapper: (value: any, index: number) => any): Observable;
    filter(predicate: (value: any, index: number) => boolean): Observable;
    take(amount: number): Observable;
    drop(amount: number): Observable;
    flatMap(mapper: (value: any, index: number) => any): Observable;
    switchMap(mapper: (value: any, index: number) => any): Observable;
    inspect(inspectorUnion?: ObservableInspectorUnion): Observable;
    catch(callback: (error: any) => Observable): Observable;
    finally(callback: () => void): Observable;

    // Promise-returning methods
    toArray(options?: SubscribeOptions): Promise<any[]>;
    forEach(callback: (value: any, index: number) => void, options?: SubscribeOptions): Promise<void>;
    every(predicate: (value: any, index: number) => boolean, options?: SubscribeOptions): Promise<boolean>;
    first(options?: SubscribeOptions): Promise<any>;
    last(options?: SubscribeOptions): Promise<any>;
    find(predicate: (value: any, index: number) => boolean, options?: SubscribeOptions): Promise<any>;
    some(predicate: (value: any, index: number) => boolean, options?: SubscribeOptions): Promise<boolean>;
    reduce(reducer: (previousValue: any, currentValue: any, index: number) => any, initialValue: any, options?: SubscribeOptions): Promise<any>;
  }

  const Observable: {
    new(callback: SubscribeCallback): Observable;
    from(value:
      | Observable
      | Iterable<any>
      | AsyncIterable<any>
      | PromiseLike<any>
    ): Observable;
  }

  interface ObservableEventListenerOptions {
    passive?: boolean;
    capture?: boolean;
  }

  interface EventTarget {
    when(event: string, options?: ObservableEventListenerOptions): Observable;
  }
}
