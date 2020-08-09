import React from 'react'
import TaskList from './TaskList'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <TaskList />
      </ThemeProvider>
    </div>
  )
}

export default App