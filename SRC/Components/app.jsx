import React from 'react'
import Header from './header.jsx'
import Dashboard from './dashboard.jsx'
import EventPage from './eventPage.jsx'
import CreateEvent from './createEvent.jsx'
// import MuiThemeProvider from 'material-ui/styles'
import { Switch, Route } from 'react-router-dom'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    axios.get('/user')
          .then(data => {
            console.log('id', data.username.id)
          })
          .catch(error => {
            console.log(error)
          })
  }


  render() {


    console.log('this is current user', this.state.currentUser)

    return (
      <MuiThemeProvider>
      <div>
        <Header />
        <div>
          <Switch>
          <Route exact path="/dashboard" render={() => <DashboardWithData currentUser={this.state.currentUser} />}/>
          <Route path="/eventPage" render={() => <EventPage currentUser={this.state.currentUser} />}/>
          <Route path="/createEvent" render={() => <CreateEvent currentUser={this.state.currentUser} />}/>
          </Switch>
        </div>
      </div>
    </MuiThemeProvider>
    )
  }
}

export default App
