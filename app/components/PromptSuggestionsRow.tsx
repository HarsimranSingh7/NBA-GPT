//import { index } from "langchain/indexes"
import PromptSuggestionButton from "./PromptSuggestionButton"

const PromtSuggestionRow= ({ onPromptClick }) => {

const prompts = [
    "Who won 2024 NBA Finals?",
    "Who is the highest paid NBA player?",
    "Who is best rookies player this season?",
    "Which team has not lost once this season?",
]
  return (
    <div className="prompt-suggestions-row">
      {prompts.map((prompt, index) => 
        <PromptSuggestionButton 
          key={`suggestion-${index}`}
          text={prompt}
          onClick={() => onPromptClick(prompt)}
        />)}
    </div>
  )

}

export default PromtSuggestionRow