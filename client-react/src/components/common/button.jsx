import './button.css';

export default function Button({ type = 'default', line = false, children, onClick }) {
  return (
    <button 
      id="button" 
      className={`${type} ${line ? 'line' : ''}`} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}