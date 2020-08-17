import "styles/Home.module.css";

function handleClick() {
  console.log("Click");
}

export function Button() {
  return <button onClick={handleClick}>Click me</button>;
}
