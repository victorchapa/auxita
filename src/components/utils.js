import moment from 'moment';

const DateError = { 
    message: 'Not exists "atDate" on: ',
    target: '',
    registrationValueDefault: {SysBP: '', DiaBP: '', atDate: ''}
};

function getLastRegistration(DataRegistered) {
    let lastDataRegisteredSorted = [];
        
    const isKidneyData = DataRegistered[0].hasOwnProperty('eGFR');
    
    try{
        lastDataRegisteredSorted = DataRegistered.sort((a, b) => {
            if(a.hasOwnProperty('atDate') && b.hasOwnProperty('atDate')){
                let firstDataTimeValue = moment(a.atDate, 'YYYY/MM/DD').valueOf();
                let nextDataTimeValue = moment(b.atDate, 'YYYY/MM/DD').valueOf();
                if(firstDataTimeValue < nextDataTimeValue){
                    return 1;
                }else{
                    return -1;
                }
            }else{
                const target = a.hasOwnProperty('atDate') ? b : a;
                throw DateError.target = JSON.stringify(target);
            }
        });
        if(!isKidneyData){
            return lastDataRegisteredSorted[0];
        }else{
            if(lastDataRegisteredSorted.length >= 2){
                return [lastDataRegisteredSorted[0], lastDataRegisteredSorted[1]]
            }
            return [lastDataRegisteredSorted[0]]
        }
    }catch(e){
        if(e !== DateError) {
            console.error(DateError.message + DateError.target);
            return DateError.registrationValueDefault;
        }
    }
}

export default getLastRegistration;
