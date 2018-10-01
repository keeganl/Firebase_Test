import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      users: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault(); // stopping the form from refreshing the page
    const usersRef = firebase.database().ref('users'); // creating an items table
    const item = {
      user: this.state.username,
      password: this.state.password //stuff we want to put in the db
    }
    usersRef.push(item); // sends copy of object to firebase
    this.setState({
      username: '',
      password: '' // clearing the input fields
    });
  }

  componentDidMount() {
    // const itemsRef = firebase.database().ref('items');
    // itemsRef.on('value', (snapshot) => { // grabs a snapshot of the db from Firebase
    //   let items = snapshot.val();
    //   let newState = [];
    //   for(let item in items) { // navigate through each key in db
    //     newState.push({ // pushes things from db into new state array
    //       id: item,
    //       title: items[item].title,
    //       user: items[item].user
    //     });
    //   }
    //   this.setState({ // setting the state of the items array to the values grabbed from the db
    //     items: newState
    //   });
    // });
    const usersRef = firebase.database().ref('users');
    usersRef.on('value', (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      for(let user in users) {
        newState.push({
          id: user,
          password: users[user].password,
          user: users[user].user
        });
      }
      this.setState({
        users: newState
      });
    });
  }

  render() {
    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>Fun Food Friends</h1>

          </div>
        </header>
        <div className='container'>
          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
              <input type="password" name="password" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.password}/>
              <button>Add Item</button>
            </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.users.map((user) => {
                  return( 
                    <li key={user.id}>
                      <h3>{user.password}</h3>
                      <p>brought by: {user.user}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;