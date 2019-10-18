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

  if (tutorialStep) {
    if (tutorialStep <= 3) {
      allowLog = false;
      allowShips = false;
      allowExtras = false;
    }
    if (tutorialStep <= 2) {
      allowLog = false;
      allowTactical = false;
      showNavigationIntro = true;
    }
    if (tutorialStep <= 1) {
      allowLog = false;
      showCrateIntro = true;
      allowNavigation = false;
      showNavigationIntro = false;
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
  };
};
