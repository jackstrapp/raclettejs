interface RacletteOptions {
    sharePageUrl: string;
}


declare class Raclette {
    constructor(options?: RacletteOptions);

    getItem(key: string): Promise<any>;
    setItem(key: string, value: string): Promise<any>;
    clear(): Promise<any>;
    /**
     * the initial promise that tell if the iframe has done its loading.
     * As it's a promise, can be called multiple times, before and after the actual initialization.
     */
    loaded: Promise<any>;
}

export default Raclette