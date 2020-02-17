import React from "react";
import axios from 'axios';

class Searchbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            answers: [],
            showAnswers:false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onFormSubmit(event) {
        // submits the given state to server and receives the answers
        event.preventDefault();
        const query = {'query': this.state.query}
        const url = '/query/';

        axios.get(url, {params: query})
        .then((data) => {
            const received = JSON.stringify(data.answers);
            this.setState({answers: received,
                           showAnswers: True
                        })

        })
        .catch((err) => {
            if (err) {
                console.log('Error in get', err)
                this.setState({answers: ['errors only']})
            }
        })


    }
    
    handleClick(terms) {
        // This will set the state as the user types
        console.log('typed in terms');
        // This will call the endpoint 
        this.setState({data:terms})
    }

    // Render the searchterms in side
    render() {
        return (
        <div>
            <h1>this.data</h1>
            
        </div>
        )
    }
}

export default Searchbox