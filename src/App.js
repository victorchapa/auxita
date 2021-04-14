import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import HypertensionCalculator from './components/hypertension-calculator';
import KidneyCalculator from './components/kidney-calculator';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Container>
          <HypertensionCalculator></HypertensionCalculator>
          <KidneyCalculator></KidneyCalculator>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
