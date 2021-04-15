import getLastRegistration from './utils';

describe('Utils getRegistration function testing', () => {

    it('Shoud be function', ()=>{
      expect(typeof(getLastRegistration)).toBe("function");
    });

    describe('Hypertension searchs', () => {
        let hypertensionDataMock = [];
        const mockedError = () => {};
        beforeEach(() => {
            hypertensionDataMock = [
                {SysBP: 120, DiaBP: 90, atDate: '2018/10/31'},
                {SysBP: 115, DiaBP: 100, atDate: '2018/10/20'},
                {SysBP: 115, DiaBP: 80, atDate: '2018/11/15'},
                {SysBP: 120, DiaBP: 99, atDate: '2020/11/15'}
            ];
            console.error = mockedError;
        });

        it('Should return an array with the lastest data-reading [input] ~> [2020/11/15]', () => {
            const expectResponse = {SysBP: 120, DiaBP: 99, atDate: '2020/11/15'};
            const lastRecord = getLastRegistration(hypertensionDataMock);
            expect(lastRecord).toStrictEqual(expectResponse);
        });

        it('Should return an object', () => {
            const lastRecord = getLastRegistration(hypertensionDataMock);
            expect(typeof(lastRecord)).toBe("object");
        });

        it('Should return an error when some items does not come with property atDate', () => {
            jest.spyOn(console, 'error').mockImplementation(() => {});

            hypertensionDataMock[2] = {SysBP: 69, DiaBP: 69};
            getLastRegistration(hypertensionDataMock);
            expect(console.error).toHaveBeenCalled();
            const errorWording = "Not exists \"atDate\" on: {\"SysBP\":69,\"DiaBP\":69}";
            expect(console.error).toHaveBeenCalledWith(errorWording);
        });

        it('Should short the input in order to get the more last reading-data', () => {
            const shortedHypertensionDataMock = [
                {SysBP: 120, DiaBP: 99, atDate: '2020/11/15'},
                {SysBP: 115, DiaBP: 80, atDate: '2018/11/15'},
                {SysBP: 120, DiaBP: 90, atDate: '2018/10/31'},
                {SysBP: 115, DiaBP: 100, atDate: '2018/10/20'}
            ];
            getLastRegistration(hypertensionDataMock);
            expect(hypertensionDataMock).toStrictEqual(shortedHypertensionDataMock);
        });
    });

    describe('Kidney searchs', () => {
        let kidneyDataMock = [];
        const mockedError = () => {};
        beforeEach(() => {
            kidneyDataMock =  [
                {eGFR: 50, atDate: '2018/10/31'},
                {eGFR: 70, atDate: '2018/10/20'},
                {eGFR: 70, atDate: '2018/09/20'}
            ],
            console.error = mockedError;
        });

        it('Should return an array with the lastest data-reading [input] ~> [2018/10/31, 2018/10/20]', () => {
            const expectResponse = [
                {eGFR: 50, atDate: '2018/10/31'},
                {eGFR: 70, atDate: '2018/10/20'}
            ]
            const lastRecord = getLastRegistration(kidneyDataMock);
            expect(lastRecord).toStrictEqual(expectResponse);
        });

        it('Should return an array of 2 items', () => {
            const lastRecord = getLastRegistration(kidneyDataMock);
            expect(Array.isArray(lastRecord)).toBeTruthy();
            expect(lastRecord.length).toBe(2);
        });

        it('Should return an error when some items does not come with property atDate', () => {
            jest.spyOn(console, 'error').mockImplementation(() => {});

            kidneyDataMock[1] = {eGFR: 77};
            getLastRegistration(kidneyDataMock);
            expect(console.error).toHaveBeenCalled();
            const errorWording = "Not exists \"atDate\" on: {\"eGFR\":77}";
            expect(console.error).toHaveBeenCalledWith(errorWording);
        });

        it('Should short the input in order to get the more last reading-data', () => {
            const shortedKidneyDataMock = [
                {eGFR: 50, atDate: '2018/10/31'},
                {eGFR: 70, atDate: '2018/10/20'},
                {eGFR: 70, atDate: '2018/09/20'}
            ];
            getLastRegistration(kidneyDataMock);
            expect(kidneyDataMock).toStrictEqual(shortedKidneyDataMock);
        });
    });
    
});
