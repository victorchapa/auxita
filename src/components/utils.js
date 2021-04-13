import moment from 'moment';

const DateError = { 
    message: 'Not exists "atDate" on: ',
    target: '',
    registrationValueDefault: {SysBP: '', DiaBP: '', atDate: ''}
};

function getLastRegistration(hypertensionData) {
    let lastRegisteredTimeValue = 0,
        lastDataRegistered = {}
    try{
        hypertensionData.forEach(data => {
            if(data.hasOwnProperty('atDate')){
                let nextDataTimeValue = moment(data.atDate, 'YYYY/MM/DD').valueOf();
                if(nextDataTimeValue > lastRegisteredTimeValue){
                    lastRegisteredTimeValue = nextDataTimeValue;
                    lastDataRegistered = data;
                }
            }else{
                throw DateError.target = JSON.stringify(data);
            }
            
        });
        return (lastDataRegistered);
    }catch(e){
        if(e !== DateError) {
            console.error(DateError.message + DateError.target);
            return DateError.registrationValueDefault;
        }
    }
}

export default getLastRegistration;
