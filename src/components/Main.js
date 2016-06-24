import React, { Component, PropTypes } from 'react'
import {
  AppBar, Paper,
  RaisedButton, TextField
} from 'material-ui'
import CompareTable from './CompareTable'

class Main extends Component {
  render () {
    const { submit, changeUsername, data, status } = this.props
    return (
      <Paper
        className='paper' >
        <AppBar title='NTU Coders' />
        <div>
          <TextField
            defaultValue='admin'
            onChange={(e) => changeUsername(e.target.value, 0)}
            floatingLabelText='Tài khoản của bạn' />
          <TextField
            defaultValue='trevorjoker'
            onChange={(e) => changeUsername(e.target.value, 1)}
            floatingLabelText='Tài khoản của hắn' />
          <RaisedButton
            primary label='So sánh'
            onClick={submit} />
        </div>
        <CompareTable data={data} status={status} />
      </Paper>
    )
  }
}

Main.propTypes = {
  submit: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  status: PropTypes.number.isRequired
}

export default Main
