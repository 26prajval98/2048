import React, { Component } from 'react';
import Box from './box'

class Grid extends Component {

	constructor(props) {
		super(props)
		this.state = {
			grid: [
				0, 0, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0,
				0, 0, 0, 0
			],
			gameOver: false
		}
	}

	randomNumber() {
		var x = Math.random()

		if (x < 0.7)
			return 2
		else if (x < 0.95)
			return 4
		else
			return 8
	}

	generateNumber() {

		var newState = this.state.grid
		var useful = []

		newState.forEach((val, index) => {
			if (val === 0) {
				useful.push(index)
			}
		})

		var randomPos = Math.floor(Math.random() * useful.length)

		var number = this.randomNumber()

		newState[useful[randomPos]] = number

		this.setState({
			grid: newState
		})
	}

	areEqual(a, b) {
		for (var i = 0; i < b.length; i++) {
			if (b[i] !== a[i])
				return false
		}
		return true
	}

	checkAdg(i, n) {
		var grid = this.state.grid
		if (n > 0)
			if (i + n < 16) {
				if (grid[i] === grid[i + n])
					return false
			}
			else
				return true
	}

	isGameOver() {
		if (Math.min(...this.state.grid))
			for (var i = 0; i < 16; i++) {
				if (this.checkAdg(i, 4) && this.checkAdg(i, 1)) {
					this.setState({
						gameOver: true
					})
					alert("Game Over")
					return
				}
			}
	}

	merge(arr, dir) {
		var i
		if (dir)
			for (i = 0; i < arr.length; i++) {
				if (arr[i] === arr[i + 1]) {
					arr[i] += arr[i + 1]
					arr.splice(i + 1, 1)
				}
			}
		else{
			for (i = arr.length; i > 0; i--) {
				if (arr[i] === arr[i - 1]) {
					arr[i] += arr[i - 1]
					arr.splice(i - 1, 1)
				}
			}
		}

		return arr
	}

	updown(upOrDown) {
		var newState = [...this.state.grid]
		for (var i = 0; i < 4; i++) {
			var ups = []
			for (var j = 0; j < 4; j++) {
				if (newState[i + 4 * j] !== 0) {
					ups.push(newState[i + 4 * j])
				}
			}

			this.merge(ups, upOrDown)

			if (upOrDown) {
				for (j = ups.length; j < 4; j++) {
					ups.push(0)
				}
			}
			else {
				for (j = ups.length; j < 4; j++) {
					ups.unshift(0)
				}
			}

			for (var k = 0; k < 4; k++) {
				newState[i + 4 * k] = ups[k]
			}
		}
		if (!this.areEqual(newState, this.state.grid)) {
			this.setState({
				grid: newState
			})
			this.generateNumber()
		}
		else {
			this.isGameOver()
		}
	}

	leftright(leftOrRight) {
		var newState = [...this.state.grid]
		for (var i = 0; i < 4; i++) {
			var ups = []
			for (var j = 0; j < 4; j++) {
				if (newState[j + 4 * i] !== 0) {
					ups.push(newState[j + 4 * i])
				}
			}

			this.merge(ups, leftOrRight)

			if (leftOrRight) {
				for (j = ups.length; j < 4; j++) {
					ups.push(0)
				}
			}
			else {
				for (j = ups.length; j < 4; j++) {
					ups.unshift(0)
				}
			}

			for (var k = 0; k < 4; k++) {
				newState[k + 4 * i] = ups[k]
			}
		}
		if (!this.areEqual(newState, this.state.grid)) {
			this.setState({
				grid: newState
			})
			this.generateNumber()
		}
		else {
			this.isGameOver()
		}
	}

	componentWillMount() {
		this.generateNumber()
		window.onkeydown = (ev) => {
			if (ev.code === "ArrowUp") {
				this.updown(1)
			}
			else if (ev.code === "ArrowDown") {
				this.updown(0)
			}
			else if (ev.code === "ArrowLeft") {
				this.leftright(1)
			}
			else if (ev.code === "ArrowRight") {
				this.leftright(0)
			}
		}

	}

	render() {
		var maxWidth = 600
		var width = window.innerWidth > maxWidth ? maxWidth : window.innerWidth - 32;
		var style = {
			width,
			maxWidth: maxWidth + "px",
			height: width,
			margin: "auto",
		}

		var boxStyle = {
			width: width / 4 + "px",
			height: width / 4 + "px",
			display: "'inline!important'"
		}

		var valStyle = {
			width: width / 4 - 2 + "px",
			height: width / 4 - 2 + "px",
		}

		return (
			<div className="w3-row" style={style}>
				{
					this.state.grid.map((value, index) => {
						return (
							<Box key={index} box={{
								boxStyle,
								value,
								valStyle
							}} />
						)
					})
				}
			</div>
		);
	}
}

export default Grid