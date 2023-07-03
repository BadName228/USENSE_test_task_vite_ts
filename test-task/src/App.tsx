import React from 'react'
import './App.css'

enum EInputType {
  type1 = "password",
  type2 = "text"
}

const App: React.FC = () => {
  const [inputType, setInputType] = React.useState<EInputType>(EInputType.type1)
  const [password, setPassword] = React.useState<string>("")

  const p1Ref = React.useRef<HTMLParagraphElement>(null)
  const p2Ref = React.useRef<HTMLParagraphElement>(null)
  const p3Ref = React.useRef<HTMLParagraphElement>(null)

  const howStrongPassword = (): void => {
    if (password.length < 8) {
      p1Ref.current.className = "red"
      p2Ref.current.className = "red"
      p3Ref.current.className = "red"
    }
    const hasNumber: boolean = /[0-9]/.test(password);
    const hasSymbol: boolean = /[!@#$%^&*()]/.test(password);
    const hasLetter: boolean = /[a-zA-Z]/.test(password);

    const easy =(): void => {
      p1Ref.current.className = "red"
      p2Ref.current.className = "grey"
      p3Ref.current.className = "grey"
    }
    const medium = (): void => {
      p1Ref.current.className = "yellow"
      p2Ref.current.className = "yellow"
      p3Ref.current.className = "grey"
    }
    const hard = (): void => {
      p1Ref.current.className = "green"
      p2Ref.current.className = "green"
      p3Ref.current.className = "green"
    }

    if (password.length >= 8) {
      // only numbers
      if (hasNumber && !hasSymbol && !hasLetter) {
        easy()
      }
      // only symbols
      if (!hasNumber && hasSymbol && !hasLetter) {
        easy()
      }
      // only letters
      if (!hasNumber && !hasSymbol && hasLetter) {
        easy()
      }

      // numbers and symbols
      if (hasNumber && hasSymbol && !hasLetter) {
        medium()
      }
      // numbers and letters
      if (hasNumber && !hasSymbol && hasLetter) {
        medium()
      }
      // symbols and letters
      if (!hasNumber && hasSymbol && hasLetter) {
        medium()
      }

      // all confirm
      if (hasNumber && hasSymbol && hasLetter) {
        hard()
      }
    }
  }

  const changeTypePasswordInput = (): void => {
    if (inputType == EInputType.type1) {
      setInputType(EInputType.type2)
    }
    if (inputType == EInputType.type2) {
      setInputType(EInputType.type1)
    }
  }

  React.useEffect(() => {
    howStrongPassword()
  }, [password])

  return (
    <div className="App">
      <div className="loginContainer">
        <input type={inputType} className='passwordInput' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button className='showPasswordButton' onClick={() => changeTypePasswordInput()}>Show password</button>
        <div className='strongStatus'>
          <p ref={p1Ref} className="grey">the password is easy</p>
          <p ref={p2Ref} className="grey">the password is medium</p>
          <p ref={p3Ref} className="grey">the password is strong</p>
        </div>
      </div>
    </div>
  )
}

export default App