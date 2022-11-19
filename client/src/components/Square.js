export default function Square(props) {
  return (
    <button 
      className="square" 
      onClick={props.onClick}
      style={{ backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})` }}
      >
    </button>
  );
};