import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import MainPage from './containers/MainPage/MainPage'

class App extends Component {
	render() {
		return (
			// <BrowserRouter basename="/my-app">
			<BrowserRouter>
				<div className="App">
					<MainPage />
				</div>
			</BrowserRouter>
		)
	}
}

export default App
