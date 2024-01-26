import ReactDOM from 'react-dom/client'

import App from './App'

const notes = [
  {
    id: 1,
    content: 'You got this!'
  },
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)