import './app-info.css';

const AppInfo = ({ increased, employees, rised }) => {
    return (
        <div className="app-info">
            <h1>Учёт сотрудников в компании "Доброе утро!"</h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <h2>Премию получат: {increased} <i> (выделены золотым шрифтом)</i></h2>
            <h2>Идут на повышение: {rised} <i> (со звездочкой)</i></h2>
        </div>
    );
}

export default AppInfo;