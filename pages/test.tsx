import { OptionalRadioForm } from 'src/containers/OptionalRadioBoxForm'
import { ChangeEvent, FC, useState } from 'react'

const TestPage: FC = () => {
  const [answer, setAnswer] = useState('')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100vw',
        padding: '30px',
        boxSizing: 'border-box',
        height: '100vh',
      }}
    >
      <OptionalRadioForm
        onInputChange={handleInput}
        onRadioChange={() => {}}
        name="Some"
        questionLabel="Some some some ?"
        inputLabel="Somesome some"
        value={answer}
        answerState
      />
    </div>
  )
}

export default TestPage
