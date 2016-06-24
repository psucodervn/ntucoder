'use strict'
import React, { Component, PropTypes } from 'react'
import {
  Checkbox, CircularProgress
} from 'material-ui'
import {
  TableBody, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn
} from 'material-ui/Table'

export default class CompareTable extends Component {
  render () {
    const { data, status } = this.props
    if (status === 0) return null
    if (status === 1) {
      return (
        <CircularProgress
          mode='indeterminate'
        />
      )
    }
    let idx = 0
    return (
      <table
        border={1}
        height='500px'
        showCheckboxes={false} >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false} >
          <TableRow>
            <TableHeaderColumn colSpan='5' style={{textAlign: 'center'}}>
              BẢNG SO SÁNH KẾT QUẢ
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn className='w50'>STT</TableHeaderColumn>
            <TableHeaderColumn className='w50'>MÃ BÀI</TableHeaderColumn>
            <TableHeaderColumn className='w500'>TÊN BÀI</TableHeaderColumn>
            <TableHeaderColumn>BẠN LÀM</TableHeaderColumn>
            <TableHeaderColumn>HẮN LÀM</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover
          displayRowCheckbox={false} >
        {Object.keys(data).map(id => {
          const row = data[id]
          return (
            <TableRow
              key={++idx} >
              <TableRowColumn className='w50'>{idx}</TableRowColumn>
              <TableRowColumn className='w50'>{row.id}</TableRowColumn>
              <TableRowColumn className='w500'>
                {row.name}
              </TableRowColumn>
              <TableRowColumn>
                <Checkbox checked={row.your} />
              </TableRowColumn>
              <TableRowColumn>
                <Checkbox checked={row.his} />
              </TableRowColumn>
            </TableRow>
          )
        })}
        </TableBody>
      </table>
    )
  }
}

CompareTable.propTypes = {
  data: PropTypes.object.isRequired,
  status: PropTypes.number.isRequired
}
