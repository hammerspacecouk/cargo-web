import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";

export const useTutorial = () => {
  const { tutorialStep } = useActiveShipContext();

  let allowNavigation = true;
  let allowTactical = true;
  let allowShips = true;
  let allowLog = true;
  let allowExtras = true;

  let showCrateIntro = false;
  let showNavigationIntro = false;
  let showRiskyTravelIntro = false;
  let showNeedsConvoy = false;
  let showReadyForConvoy = false;

  if (tutorialStep) {
    if (tutorialStep === 6) {
      showReadyForConvoy = true;
    }
    if (tutorialStep === 5) {
      showNeedsConvoy = true;
    }

    if (tutorialStep <= 3) {
      allowLog = false;
      allowShips = false;
      allowExtras = false;
      showRiskyTravelIntro = true;
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
    showRiskyTravelIntro,
    showNeedsConvoy,
    showReadyForConvoy,
  };
};
