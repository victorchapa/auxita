import moment from 'moment';

const DateError = { 
    message: 'Not exists "atDate" on: ',
    target: '',
    registrationValueDefault: {SysBP: '', DiaBP: '', atDate: ''}
};

function getLastRegistration(hypertensionData) {
    let lastRegisteredValue = 0,
        lastDataRegistered = {}
    try{
        hypertensionData.forEach(data => {
            if(data.hasOwnProperty('atDate')){
                let nextValue = moment(data.atDate, 'YYYY/MM/DD').valueOf();
                if(nextValue > lastRegisteredValue){
                    lastRegisteredValue = nextValue;
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
