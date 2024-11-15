//import { text } from "stream/consumers"

const PromtSuggestionButton= ({ text, onClick }) => {
  return (
    <button 
      className="prompt-suggestion-button" 
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default PromtSuggestionButton