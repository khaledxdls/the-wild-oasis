import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeTaggel() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {!isDarkMode ? (
        <HiOutlineMoon></HiOutlineMoon>
      ) : (
        <HiOutlineSun></HiOutlineSun>
      )}
    </ButtonIcon>
  );
}

export default DarkModeTaggel;
