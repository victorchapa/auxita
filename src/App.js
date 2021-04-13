import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import HypertensionCalculator from './components/hypertension-calculator';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HypertensionCalculator></HypertensionCalculator>
      </div>
    </Provider>
  );
}

export default App;
