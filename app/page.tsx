'use client'
import Image from 'next/image'
import NBAlogo from './assets/Designer (1).png'
import { useChat } from 'ai/react'
import { Message } from 'ai'
import Bubble from './components/Bubble'
import LoadingBubble from './components/LoadingBubble'
import PromtSuggestionsRow from './components/PromptSuggestionsRow'


const Home = () => {
  
  const { append, isLoading, messages, input, handleInputChange, handleSubmit } = useChat()

  const noMessages = !messages || messages.length === 0

  const handlePrompt = ( promptText) => {
    const msg: Message = {
      id: crypto.randomUUID(),
      content: promptText,
      role: "user"
    }
    append(msg)
  }

  return (
    <main>
      <Image src={NBAlogo} width='200' alt='NBA Logo' />
      <section className={noMessages ? "" : "populated"}>
        { noMessages ? (
          <>
            <p className='starter-text'>
              The ultimate place for NBA super fans!
              Ask NBAGPT anything about the fantastic topic of NBA
              and it will respond with the most accurate information.
              We hope you enjoy!
            </p>
            <br />
            <PromtSuggestionsRow 
              onPromptClick={handlePrompt}
            />
          </>
        ) : (
          <>
            {messages.map((message, index) => <Bubble key={`message-${index}`} message={message}/>)}
            {isLoading && <LoadingBubble />}
          </>
        )}
      </section>
      <form onSubmit={handleSubmit}>
        <input className='question-box' onChange={handleInputChange} value={input} placeholder='Ask me anything about NBA...' />
        <input type='submit'/>
      </form>
    </main>
  )
}

export default Home