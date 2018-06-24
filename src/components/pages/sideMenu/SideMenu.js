import React, { Component } from "react";

export default class Sidemenu extends Component {
  render() {
    const styles = {
      position: 'fixed',
      width: '250px',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.75)',
      top: '0',
      left: '0',
      marginLeft: this.props.marginSB,
      transition: 'margin .5s',
      color: '#fff',
      paddingTop: '25px'
    }

    return (
      <div style={styles}  className={`sidebar`}>
        Hello World
        {this.props.children}
      </div>
    );
  }
}