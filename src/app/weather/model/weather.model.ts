export class Weather {

    dewPoint: number;
    humidity: number;
    temperature: number;
    fog: number;
    lowClouds: number;
    mediumClouds: number;
    highClouds: number;

    constructor(dewPoint: number, humidity: number, temperature: number, fog: number,
                lowClouds: number, mediumClouds: number, highClouds: number) {
        this.dewPoint = dewPoint;
        this.humidity = humidity;
        this.temperature = temperature;
        this.fog = fog;
        this.lowClouds = lowClouds;
        this.mediumClouds = mediumClouds;
        this.highClouds = highClouds;
    }
}
