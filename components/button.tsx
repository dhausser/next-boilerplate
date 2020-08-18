import 'styles/Home.module.css'

function handleClick() {
  window.alert('With typescript and Jest')
}

export function Button() {
  return <button onClick={handleClick}>Test Button</button>
}
