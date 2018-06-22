import React, { Component } from 'react';
import { render } from 'react-dom';
import AddUserForm from './components/AddUserForm.jsx'
import AddExerciseForm from './components/AddExerciseForm.jsx'

/////////////////////////////////

class App extends Component {
  constructor() {
    super();
    this.state = {
      path: window.location.pathname,
      data: {},
    };

    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
    window.onpopstate = (event) => {
      this.setState(
        {
          path: window.location.pathname,
        }
      )
    }
  }

  navigate(path, data) {
    this.setState(
      {
        path: path,
        data: data,
      }
    , history.pushState({page: path}, path, 'api/exercise/' + path))
  }

  render() {

    return (  
      <div id='container'>
        {(this.state.path === '/') && <AddUserForm navigate={this.navigate} data={this.state.data}/>}
        {(this.state.path === '/') && <AddExerciseForm navigate={this.navigate} data={this.state.data}/>}
        {(this.state.path !== '/') && <code>{JSON.stringify(this.state.data)}</code>}
      </div>
    )

    // switch (this.state.path) {
      
    //   case '/':

    //   return (  
    //     <div id='container'>
    //       <AddUserForm navigate={this.navigate} />
    //       <AddExerciseForm />
    //     </div>
    //   )
    //   break;
      
    //   default:
      
    //   return (  
    //     <div id='container'>
    //       <code>{JSON.stringify(this.state.data)}</code>
    //     </div>
    //   )
    // }

  }
}

render(<App />, document.getElementById('root'));