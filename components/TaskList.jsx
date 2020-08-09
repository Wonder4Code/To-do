import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { v4 as uuidv4 } from 'uuid';

const styles = {
  list: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '25%',
    backgroundColor: '',
    borderBottom: '1px solid #333',
  },
  complete: {
    textDecoration: 'line-through'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  enterArea: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '0 0 20px 0'
  },
  textField: {
    width: '300px',
    margin: '0 0 10px 0'
  },
}

class TaskList extends Component {
  state = {
    tasks: [{ id: 1, task: 'Задача 1', done: true }, { id: 2, task: 'Задача 2', done: false }],
    taskField: '',
  }

  deleteTask = (id) => {
    this.state.tasks.filter((el) => {
      if (el.id === id) {
        let index = this.state.tasks.indexOf(el)
        let update = this.state.tasks.splice(index, 1)
        this.setState(update)
      }
    })
  }

  completeTask = (id) => {
    this.state.tasks.filter(el => {
      if (el.id === id) {
        if (el.done) {
          el.done = false
          this.setState({ tasks: [...this.state.tasks] })
        } else {
          el.done = true
          this.setState({ tasks: [...this.state.tasks] })
        }
      }
    })
  }

  handler = (event) => {
    this.setState({ taskField: event.target.value })
  }

  addTask = () => {
    let newTask = {
      id: uuidv4(),
      task: this.state.taskField,
      done: false
    };
    if (this.state.taskField.length === 0) {
      return
    } else {
      this.setState({ tasks: [...this.state.tasks, newTask] })
    }
    this.setState({ taskField: '' })
  }

  render() {
    const { tasks } = this.state
    console.log(this.state.tasks)
    const { classes } = this.props
    return (
      <div className={classes.main}>
        <Box className={classes.enterArea}>
          <TextField className={classes.textField}
            label="Введите задачу..."
            variant="outlined"
            value={this.state.taskField}
            onChange={this.handler} />
          <Button variant="contained" color="primary" onClick={this.addTask}
            className={classes.button}>
            Добавить
          </Button>
        </Box>
        {tasks.map((ts) => {
          return (
            <div key={ts.id} className={classes.list}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ts.done}
                    onChange={() => this.completeTask(ts.id)}
                    name="checkedB"
                    color="primary"
                  />
                }
              />
              <p className={ts.done ? classes.complete : ''}>{ts.task}</p>
              <IconButton aria-label="delete" onClick={() => this.deleteTask(ts.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          )
        })}
      </div>
    )
  }
}

export default withStyles(styles)(TaskList)
