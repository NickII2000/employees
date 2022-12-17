import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import Employeeslist from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: "John C.", salary: 80000, increase: false, rise: true, id: 1 },
                { name: "Alex M.", salary: 100000, increase: true, rise: false, id: 2 },
                { name: "Carl W.", salary: 120000, increase: false, rise: true, id: 3 },
                { name: "Uma T.", salary: 150000, increase: true, rise: false, id: 4 },
                { name: "Ivan P.", salary: 70000, increase: false, rise: true, id: 5 }
            ],
            term: '',
            filter: 'all'
        }
        const { data } = this.state;
        this.maxId = data.map(item => item.id).reduce((a, b) => a > b ? a : b) + 1;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter((item) => item.id !== id)
            };
        });

    }

    // Да, пока могут добавляться пустые пользователи. Мы это еще исправим (исправлено в employees-add-form.js в методе onSubmit)
    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++,
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => (item.id === id) ? { ...item, [prop]: !item[prop] } : item)
        }));
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        });
    }

    onUpdateSearh = (term) => {
        this.setState({ term });
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'increase':
                return items.filter(item => item.increase);
            case 'from100000':
                return items.filter(item => item.salary >= 100000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    render() {
        const { data, term, filter } = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        const rised = this.state.data.filter(item => item.rise).length;
        return (
            <div className="app" >
                <AppInfo employees={employees} increased={increased} rised={rised} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearh={this.onUpdateSearh} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>

                <Employeeslist
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;