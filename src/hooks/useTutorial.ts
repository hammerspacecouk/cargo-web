import { useActiveShipContext } from "../contexts/ActiveShipContext/ActiveShipContext";

export const useTutorial = () => {
  const { tutorialStep } = useActiveShipContext();

  let allowNavigation = true;
  let allowTactical = true;
  let allowShips = true;
  let allowLog = true;
  let allowExtras = true;

  let showCrateIntro = false;
  let showNavigationIntro = false;
  let showTacticalIntro = false;
  let showShipsIntro = false;

  if (tutorialStep) {
    if (tutorialStep === 4) {
      showShipsIntro = true;
    }
    if (tutorialStep <= 3) {
      allowLog = false;
      allowShips = false;
      allowExtras = false;
      showTacticalIntro = true;
    }
    if (tutorialStep <= 2) {
      allowLog = false;
      allowTactical = false;
      showTacticalIntro = false;
      showNavigationIntro = true;
    }
    if (tutorialStep <= 1) {
      allowLog = false;
      showCrateIntro = true;
      allowNavigation = false;
      showNavigationIntro = false;
      showTacticalIntro = false;
    }
  }

  return {
    allowNavigation,
    allowTactical,
    allowShips,
    allowExtras,
    allowLog,

    showCrateIntro,
    showNavigationIntro,
    showTacticalIntro,
    showShipsIntro,
  };
};
