import './App.css';
import Calendar from "./components/Calendar";
import {DateTime} from "luxon";

function App() {
  return (
    <div className="App">
        <Calendar startDate = {DateTime.local().setLocale('fr-CA').startOf('week')}></Calendar>
    </div>
  );
}

export default App;
