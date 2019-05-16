import React, {Component} from 'react';
import Foods from '.components/foods';

class App extends Component {
    render() {
        return (
            <Foods foods= {this.state.foods} />
        )
    }
}