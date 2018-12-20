interface RacletteOptions {
    sharePageUrl: string;
}


declare class Raclette {
    constructor(options?: RacletteOptions);

    getItem(key: string): Promise<any>;
    setItem(key: string, value: string): Promise<any>;
    clear(): Promise<any>;
}

export = Raclette