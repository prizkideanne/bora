import Loved from "../assets/loved.png";

function LoveButton({ loveCount }) {
  return (
    <div className="relative z-10 flex items-center justify-center gap-1">
      <div className="w-4 h-4 ml-2">
        <img src={Loved} alt="heart-logo" className="w-4 h-4 object-contain" />
      </div>
      {loveCount}
    </div>
  );
}

export default LoveButton;
