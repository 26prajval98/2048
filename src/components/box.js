import React from 'react'

class Box extends React.Component {
    constructor(props) {
        super()
    }

    render() {
        var boxStyle = this.props.box.boxStyle
        var valStyle = this.props.box.valStyle
        var value = this.props.box.value
        var show = "w3-show"
        if (value === 0) {
            show = "w3-hide"
        }
        return (
            <div style={boxStyle} className="w3-red w3-display-container w3-col">
                <span style={valStyle} className={`w3-xxlarge w3-display-middle w3-black`}>
                    <div className={`w3-display-middle ${show}`}>{value}</div>
                </span>
            </div>
        )
    }
}

export default Box