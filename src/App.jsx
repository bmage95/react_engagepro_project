import './App.scss';
import FormCard from './components/cards/FormCard';
import GameCard from './components/cards/GameCard';
import QuizCard from './components/cards/QuizCard';
import AppBar from './components/appbar';

function    App() {
  return (
    <div className="App">
        <AppBar />
        <h2 className='sub-title'>What Would You Like To Do <span>Today?</span></h2>
        <br /><br /><br />
        <table>
            <tbody>
                <tr>
                    <td><div className="card-container"><FormCard /></div></td>
                    <td><div className="card-container"><GameCard /></div></td>
                    <td><div className="card-container"><QuizCard /></div></td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}

export default App;
