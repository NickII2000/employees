import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdateSearh = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onUpdateSearh(term);
    }

    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="Найти сотрудника"
                value={this.state.term}
                onChange={this.onUpdateSearh} />
        );

    }
}

export default SearchPanel;