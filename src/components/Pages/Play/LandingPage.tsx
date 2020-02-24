import * as React from "react";
import {POSITION_NONE, TOOL_PAN, UncontrolledReactSVGPanZoom} from "react-svg-pan-zoom";
import styled from "styled-components";
import {COLOURS} from "../../../styles/colours";
import {BREAKPOINTS} from "../../../styles/media";
import {useElementDimensions} from "../../../hooks/useElementDimensions";
import {Progress} from "../../Organisms/PlayHome/Panels/Progress";
import {EventsList} from "../../Organisms/EventsList";
import {useGameSessionContext} from "../../../contexts/GameSessionContext/GameSessionContext";
import {H2} from "../../Atoms/Heading";
import {Mission} from "../../Molecules/Mission";
import {Z_INDEX} from "../../../styles/variables";
import {DisguisedButton} from "../../Atoms/Button";
import {Icon, NORMAL_ICON, SMALL_ICON} from "../../Atoms/Icon";
import {LaunchIcon} from "../../Icons/LaunchIcon";
import {MissionIcon} from "../../Icons/MissionIcon";
import {RankIcon} from "../../Icons/RankIcon";
import {MapIcon} from "../../Icons/MapIcon";
import {LogIcon} from "../../Icons/LogIcon";

const Page = styled.div`
  padding-bottom: 64px;
  ${BREAKPOINTS.XL`
    display: block;
    height: 100%;
    overflow: auto;
  `};
`;

const Map = styled.div`
  height: calc(100vh - 64px);
  width: 100%;
  overflow: hidden;
  background: rgba(0,0,0,0.5);
`;

const svg = `
  <line x1="0" y1="0" x2="30" y2="51.961524227066" stroke="black" /><line x1="0" y1="0" x2="60" y2="0" stroke="black" /><line x1="30" y1="51.961524227066" x2="60" y2="0" stroke="black" /><line x1="60" y1="0" x2="480" y2="0" stroke="black" /><line x1="30" y1="51.961524227066" x2="150" y2="51.961524227066" stroke="black" /><line x1="150" y1="51.961524227066" x2="180" y2="103.92304845413" stroke="black" /><line x1="180" y1="103.92304845413" x2="90" y2="259.80762113533" stroke="black" /><line x1="90" y1="259.80762113533" x2="210" y2="259.80762113533" stroke="black" /><line x1="180" y1="103.92304845413" x2="270" y2="259.80762113533" stroke="black" /><line x1="210" y1="259.80762113533" x2="270" y2="259.80762113533" stroke="black" /><line x1="270" y1="259.80762113533" x2="390" y2="259.80762113533" stroke="black" /><line x1="390" y1="259.80762113533" x2="510" y2="51.961524227066" stroke="black" /><line x1="270" y1="259.80762113533" x2="420" y2="519.61524227066" stroke="black" /><line x1="420" y1="519.61524227066" x2="540" y2="519.61524227066" stroke="black" /><line x1="420" y1="519.61524227066" x2="600" y2="207.84609690827" stroke="black" /><line x1="540" y1="519.61524227066" x2="600" y2="519.61524227066" stroke="black" /><line x1="540" y1="519.61524227066" x2="570" y2="571.57676649773" stroke="black" /><line x1="570" y1="571.57676649773" x2="600" y2="519.61524227066" stroke="black" /><line x1="600" y1="519.61524227066" x2="690" y2="363.73066958946" stroke="black" /><line x1="600" y1="207.84609690827" x2="690" y2="363.73066958946" stroke="black" /><line x1="600" y1="207.84609690827" x2="660" y2="207.84609690827" stroke="black" /><line x1="510" y1="51.961524227066" x2="600" y2="207.84609690827" stroke="black" /><line x1="480" y1="0" x2="510" y2="51.961524227066" stroke="black" /><line x1="480" y1="0" x2="540" y2="0" stroke="black" /><line x1="510" y1="51.961524227066" x2="540" y2="0" stroke="black" /><line x1="420" y1="519.61524227066" x2="300" y2="519.61524227066" stroke="black" /><line x1="270" y1="259.80762113533" x2="120" y2="519.61524227066" stroke="black" /><line x1="120" y1="519.61524227066" x2="-60" y2="519.61524227066" stroke="black" /><line x1="-60" y1="519.61524227066" x2="90" y2="259.80762113533" stroke="black" /><line x1="120" y1="519.61524227066" x2="240" y2="519.61524227066" stroke="black" /><line x1="90" y1="259.80762113533" x2="30" y2="155.8845726812" stroke="black" /><line x1="240" y1="519.61524227066" x2="300" y2="519.61524227066" stroke="black" /><line x1="30" y1="155.8845726812" x2="-1080" y2="2078.4609690827" stroke="black" /><line x1="-1080" y1="2078.4609690827" x2="30" y2="4001.0373654841" stroke="black" /><line x1="-1080" y1="2078.4609690827" x2="1140" y2="2078.4609690827" stroke="black" /><line x1="-1080" y1="2078.4609690827" x2="-3300" y2="2078.4609690827" stroke="black" /><line x1="-1080" y1="2078.4609690827" x2="-2190" y2="4001.0373654841" stroke="black" /><line x1="-1080" y1="2078.4609690827" x2="-2190" y2="155.8845726812" stroke="black" />
  <polygon data-id="36f4c242-03fe-4f0a-bbb8-08f1fa70e0be" points="30,17.320508 0,34.641016 -30,17.320508 -30,-17.320508 -0,-34.641016 30,-17.320508" stroke="black" fill="#ffff99" /><polygon data-id="3eca3a22-03fe-468a-86b6-9278dd58f596" points="60,69.282032 30,86.60254 0,69.282032 0,34.641016 30,17.320508 60,34.641016" stroke="black" fill="#ff9999" /><polygon data-id="dfbe4782-03fe-49ad-b23e-18b1f3df11f3" points="90,17.320508 60,34.641016 30,17.320508 30,-17.320508 60,-34.641016 90,-17.320508" stroke="black" fill="#ffff99" /><polygon data-id="5adcf64e-03fe-4afa-9559-5940181a334b" points="510,17.320508 480,34.641016 450,17.320508 450,-17.320508 480,-34.641016 510,-17.320508" stroke="black" fill="#ff9999" /><polygon data-id="747897fb-03fe-4ea9-9509-aef12c407f67" points="180,69.282032 150,86.60254 120,69.282032 120,34.641016 150,17.320508 180,34.641016" stroke="black" fill="#ff9999" /><polygon data-id="c9476716-03fe-4c1e-b480-436b70b46cc3" points="210,121.243557 180,138.564065 150,121.243557 150,86.60254 180,69.282032 210,86.60254" stroke="black" fill="#ff9999" /><polygon data-id="1069289c-03fe-41a6-8f1d-e8e5eef7ebd8" points="120,277.128129 90,294.448637 60,277.128129 60,242.487113 90,225.166605 120,242.487113" stroke="black" fill="#ff9999" /><polygon data-id="19033222-03fe-4e6b-9f03-18a441563bb7" points="240,277.128129 210,294.448637 180,277.128129 180,242.487113 210,225.166605 240,242.487113" stroke="black" fill="#99ff99" /><polygon data-id="ff563775-03fe-43a5-a9a5-c211177ad32c" points="300,277.128129 270,294.448637 240,277.128129 240,242.487113 270,225.166605 300,242.487113" stroke="black" fill="#ffff99" /><polygon data-id="0e24d793-03fe-472d-8102-8941d1f89f83" points="420,277.128129 390,294.448637 360,277.128129 360,242.487113 390,225.166605 420,242.487113" stroke="black" fill="#ff9999" /><polygon data-id="9860344a-03fe-4ce3-b42c-860cd2ae0ad5" points="540,69.282032 510,86.60254 480,69.282032 480,34.641016 510,17.320508 540,34.641016" stroke="black" fill="#ffff99" /><polygon data-id="dbd6f1a7-03fe-45fa-9f47-866ff23bdf68" points="450,536.93575 420,554.256258 390,536.93575 390,502.294734 420,484.974226 450,502.294734" stroke="black" fill="#ff9999" /><polygon data-id="17642dac-03fe-45e0-a2d3-0a30c647a084" points="570,536.93575 540,554.256258 510,536.93575 510,502.294734 540,484.974226 570,502.294734" stroke="black" fill="#ff9999" /><polygon data-id="dc84cb82-03fe-4f11-bb09-fc7ec24aef5a" points="630,225.166605 600,242.487113 570,225.166605 570,190.525589 600,173.205081 630,190.525589" stroke="black" fill="#ff9999" /><polygon data-id="b4bf85b4-03fe-4582-8f25-9dbd8ed6fba1" points="630,536.93575 600,554.256258 570,536.93575 570,502.294734 600,484.974226 630,502.294734" stroke="black" fill="#ffff99" /><polygon data-id="8942a6d4-03fe-4cf6-8ac2-4f94f37b153d" points="600,588.897275 570,606.217783 540,588.897275 540,554.256258 570,536.93575 600,554.256258" stroke="black" fill="#ffff99" /><polygon data-id="a54a0c87-03fe-4342-9a0f-eb25f9e48ea6" points="720,381.051178 690,398.371686 660,381.051178 660,346.410162 690,329.089653 720,346.410162" stroke="black" fill="#ff9999" /><polygon data-id="d83096e9-03fe-4d8e-8dab-bac9ef3917ca" points="690,225.166605 660,242.487113 630,225.166605 630,190.525589 660,173.205081 690,190.525589" stroke="black" fill="#ff9999" /><polygon data-id="0618e97f-03fe-4f5a-98d2-94a72afa8fcc" points="570,17.320508 540,34.641016 510,17.320508 510,-17.320508 540,-34.641016 570,-17.320508" stroke="black" fill="#ffff99" /><polygon data-id="57dc16b3-03fe-4f7b-bb6b-fc0289b1698e" points="330,536.93575 300,554.256258 270,536.93575 270,502.294734 300,484.974226 330,502.294734" stroke="black" fill="#ffff99" /><polygon data-id="764cda46-03fe-41a3-85d4-29a44a76c256" points="150,536.93575 120,554.256258 90,536.93575 90,502.294734 120,484.974226 150,502.294734" stroke="black" fill="#ff9999" /><polygon data-id="73b44290-03fe-4990-b659-5d42efa62b16" points="-30,536.93575 -60,554.256258 -90,536.93575 -90,502.294734 -60,484.974226 -30,502.294734" stroke="black" fill="#ffff99" /><polygon data-id="faf135de-03fe-4236-934f-4653d0e272dd" points="270,536.93575 240,554.256258 210,536.93575 210,502.294734 240,484.974226 270,502.294734" stroke="black" fill="#99ff99" /><polygon data-id="acfec956-03fe-4ffb-ab7c-aded45009d80" points="60,173.205081 30,190.525589 -0,173.205081 -0,138.564065 30,121.243557 60,138.564065" stroke="black" fill="#ff9999" /><polygon data-id="d21215ca-03fe-4ff1-9f7a-64ff50141b31" points="-1050,2095.781477 -1080,2113.101985 -1110,2095.781477 -1110,2061.140461 -1080,2043.819953 -1050,2061.140461" stroke="black" fill="#ffff99" /><polygon data-id="c304881f-03fe-48eb-90a4-21c0fa866db5" points="60,4018.357874 30,4035.678382 -0,4018.357874 0,3983.716857 30,3966.396349 60,3983.716857" stroke="black" fill="#ff9999" /><polygon data-id="4491c549-03fe-42a1-a77d-67fe694dd83c" points="1170,2095.781477 1140,2113.101985 1110,2095.781477 1110,2061.140461 1140,2043.819953 1170,2061.140461" stroke="black" fill="#ffff99" /><polygon data-id="83d5b174-03fe-4693-afc2-0054872ba9ef" points="-3270,2095.781477 -3300,2113.101985 -3330,2095.781477 -3330,2061.140461 -3300,2043.819953 -3270,2061.140461" stroke="black" fill="#ff9999" /><polygon data-id="5722bd22-03fe-404f-97fa-296fdeaa71f8" points="-2160,4018.357874 -2190,4035.678382 -2220,4018.357874 -2220,3983.716857 -2190,3966.396349 -2160,3983.716857" stroke="black" fill="#ff9999" /><polygon data-id="4991b23c-03fe-441a-bf49-923aeeb45cc8" points="-2160,173.205081 -2190,190.525589 -2220,173.205081 -2220,138.564065 -2190,121.243557 -2160,138.564065" stroke="black" fill="#ff9999" />
  <text y="0" style="font-family:sans-serif;font-size: 10px;"><tspan x="0" text-anchor="middle">Godrhyl</tspan><tspan x="0" text-anchor="middle" dy="12">Bank</tspan></text><text y="51.961524227066" style="font-family:sans-serif;font-size: 10px;"><tspan x="30" text-anchor="middle">Quay</tspan><tspan x="30" text-anchor="middle" dy="12">Fargo</tspan></text><text y="0" style="font-family:sans-serif;font-size: 10px;"><tspan x="60" text-anchor="middle">Woodland</tspan></text><text y="0" style="font-family:sans-serif;font-size: 10px;"><tspan x="480" text-anchor="middle">St.</tspan><tspan x="480" text-anchor="middle" dy="12">Larry</tspan></text><text y="51.961524227066" style="font-family:sans-serif;font-size: 10px;"><tspan x="150" text-anchor="middle">Spaceport</tspan><tspan x="150" text-anchor="middle" dy="12">Bigface</tspan></text><text y="103.92304845413" style="font-family:sans-serif;font-size: 10px;"><tspan x="180" text-anchor="middle">Spaceport</tspan><tspan x="180" text-anchor="middle" dy="12">Littleface</tspan></text><text y="259.80762113533" style="font-family:sans-serif;font-size: 10px;"><tspan x="90" text-anchor="middle">Swanton</tspan></text><text y="259.80762113533" style="font-family:sans-serif;font-size: 10px;"><tspan x="210" text-anchor="middle">Vexilton</tspan></text><text y="259.80762113533" style="font-family:sans-serif;font-size: 10px;"><tspan x="270" text-anchor="middle">Nickleown</tspan></text><text y="259.80762113533" style="font-family:sans-serif;font-size: 10px;"><tspan x="390" text-anchor="middle">Prattle</tspan><tspan x="390" text-anchor="middle" dy="12">Rock</tspan></text><text y="51.961524227066" style="font-family:sans-serif;font-size: 10px;"><tspan x="510" text-anchor="middle">Fishesworth</tspan></text><text y="519.61524227066" style="font-family:sans-serif;font-size: 10px;"><tspan x="420" text-anchor="middle">South</tspan><tspan x="420" text-anchor="middle" dy="12">Quirk</tspan></text><text y="519.61524227066" style="font-family:sans-serif;font-size: 10px;"><tspan x="540" text-anchor="middle">St.</tspan><tspan x="540" text-anchor="middle" dy="12">Teddy</tspan></text><text y="207.84609690827" style="font-family:sans-serif;font-size: 10px;"><tspan x="600" text-anchor="middle">New</tspan><tspan x="600" text-anchor="middle" dy="12">Quanta</tspan></text><text y="519.61524227066" style="font-family:sans-serif;font-size: 10px;"><tspan x="600" text-anchor="middle">Franklin</tspan><tspan x="600" text-anchor="middle" dy="12">Park</tspan></text><text y="571.57676649773" style="font-family:sans-serif;font-size: 10px;"><tspan x="570" text-anchor="middle">Spaceport</tspan><tspan x="570" text-anchor="middle" dy="12">Spinnaker</tspan></text><text y="363.73066958946" style="font-family:sans-serif;font-size: 10px;"><tspan x="690" text-anchor="middle">Shirley</tspan><tspan x="690" text-anchor="middle" dy="12">Basset</tspan></text><text y="207.84609690827" style="font-family:sans-serif;font-size: 10px;"><tspan x="660" text-anchor="middle">Old</tspan><tspan x="660" text-anchor="middle" dy="12">Quanta</tspan></text><text y="0" style="font-family:sans-serif;font-size: 10px;"><tspan x="540" text-anchor="middle">Beetacre</tspan></text><text y="519.61524227066" style="font-family:sans-serif;font-size: 10px;"><tspan x="300" text-anchor="middle">Fort</tspan><tspan x="300" text-anchor="middle" dy="12">Cocoon</tspan></text><text y="519.61524227066" style="font-family:sans-serif;font-size: 10px;"><tspan x="120" text-anchor="middle">Thimbledon</tspan></text><text y="519.61524227066" style="font-family:sans-serif;font-size: 10px;"><tspan x="-60" text-anchor="middle">Rumcuckle</tspan></text><text y="519.61524227066" style="font-family:sans-serif;font-size: 10px;"><tspan x="240" text-anchor="middle">Cocoasbury</tspan></text><text y="155.8845726812" style="font-family:sans-serif;font-size: 10px;"><tspan x="30" text-anchor="middle">Upper</tspan><tspan x="30" text-anchor="middle" dy="12">Underton</tspan></text><text y="2078.4609690827" style="font-family:sans-serif;font-size: 10px;"><tspan x="-1080" text-anchor="middle">The</tspan><tspan x="-1080" text-anchor="middle" dy="12">Lonely</tspan><tspan x="-1080" text-anchor="middle" dy="12">Island</tspan></text><text y="4001.0373654841" style="font-family:sans-serif;font-size: 10px;"><tspan x="30" text-anchor="middle">Curie</tspan></text><text y="2078.4609690827" style="font-family:sans-serif;font-size: 10px;"><tspan x="1140" text-anchor="middle">Lovelace</tspan></text><text y="2078.4609690827" style="font-family:sans-serif;font-size: 10px;"><tspan x="-3300" text-anchor="middle">Georgium</tspan><tspan x="-3300" text-anchor="middle" dy="12">Sidus</tspan></text><text y="4001.0373654841" style="font-family:sans-serif;font-size: 10px;"><tspan x="-2190" text-anchor="middle">Mortes</tspan></text><text y="155.8845726812" style="font-family:sans-serif;font-size: 10px;"><tspan x="-2190" text-anchor="middle">Pythagoras</tspan></text>
  <text text-anchor="middle" y="23.980762113533" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="15" text-anchor="middle">000555</tspan><tspan x="15" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="-2" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="30" text-anchor="middle">001b97</tspan><tspan x="30" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="23.980762113533" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="45" text-anchor="middle">0022a5</tspan><tspan x="45" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="-2" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="270" text-anchor="middle">00317f</tspan><tspan x="270" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="49.961524227066" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="90" text-anchor="middle">003dd1</tspan><tspan x="90" text-anchor="middle" dy="10">002</tspan></text><text text-anchor="middle" y="75.942286340599" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="165" text-anchor="middle">005160</tspan><tspan x="165" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="179.86533479473" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="135" text-anchor="middle">0059a0</tspan><tspan x="135" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="257.80762113533" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="150" text-anchor="middle">005b0a</tspan><tspan x="150" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="179.86533479473" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="225" text-anchor="middle">005b15</tspan><tspan x="225" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="257.80762113533" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="240" text-anchor="middle">00649a</tspan><tspan x="240" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="257.80762113533" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="330" text-anchor="middle">006c85</tspan><tspan x="330" text-anchor="middle" dy="10">002</tspan></text><text text-anchor="middle" y="153.8845726812" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="450" text-anchor="middle">006cdb</tspan><tspan x="450" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="387.711431703" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="345" text-anchor="middle">007971</tspan><tspan x="345" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="517.61524227066" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="480" text-anchor="middle">00aaef</tspan><tspan x="480" text-anchor="middle" dy="10">002</tspan></text><text text-anchor="middle" y="361.73066958946" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="510" text-anchor="middle">00b656</tspan><tspan x="510" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="517.61524227066" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="570" text-anchor="middle">00d643</tspan><tspan x="570" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="543.5960043842" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="555" text-anchor="middle">00db00</tspan><tspan x="555" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="543.5960043842" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="585" text-anchor="middle">00dbfd</tspan><tspan x="585" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="439.67295593006" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="645" text-anchor="middle">00ed26</tspan><tspan x="645" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="283.78838324886" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="645" text-anchor="middle">00f0a0</tspan><tspan x="645" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="205.84609690827" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="630" text-anchor="middle">00f42e</tspan><tspan x="630" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="127.90381056767" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="555" text-anchor="middle">014226</tspan><tspan x="555" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="23.980762113533" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="495" text-anchor="middle">0153fd</tspan><tspan x="495" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="-2" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="510" text-anchor="middle">01549c</tspan><tspan x="510" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="23.980762113533" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="525" text-anchor="middle">01649e</tspan><tspan x="525" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="517.61524227066" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="360" text-anchor="middle">018505</tspan><tspan x="360" text-anchor="middle" dy="10">002</tspan></text><text text-anchor="middle" y="387.711431703" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="195" text-anchor="middle">01a8ff</tspan><tspan x="195" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="517.61524227066" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="30" text-anchor="middle">01d716</tspan><tspan x="30" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="387.711431703" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="15" text-anchor="middle">020477</tspan><tspan x="15" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="517.61524227066" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="180" text-anchor="middle">020d8a</tspan><tspan x="180" text-anchor="middle" dy="10">003</tspan></text><text text-anchor="middle" y="205.84609690827" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="60" text-anchor="middle">0055a6</tspan><tspan x="60" text-anchor="middle" dy="10">002</tspan></text><text text-anchor="middle" y="517.61524227066" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="270" text-anchor="middle">017f17</tspan><tspan x="270" text-anchor="middle" dy="10">001</tspan></text><text text-anchor="middle" y="1115.1727708819" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="-525" text-anchor="middle">021ee1</tspan><tspan x="-525" text-anchor="middle" dy="10">006</tspan></text><text text-anchor="middle" y="3037.7491672834" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="-525" text-anchor="middle">022529</tspan><tspan x="-525" text-anchor="middle" dy="10">006</tspan></text><text text-anchor="middle" y="2076.4609690827" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="30" text-anchor="middle">02316e</tspan><tspan x="30" text-anchor="middle" dy="10">006</tspan></text><text text-anchor="middle" y="2076.4609690827" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="-2190" text-anchor="middle">0250b0</tspan><tspan x="-2190" text-anchor="middle" dy="10">006</tspan></text><text text-anchor="middle" y="3037.7491672834" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="-1635" text-anchor="middle">0253c8</tspan><tspan x="-1635" text-anchor="middle" dy="10">006</tspan></text><text text-anchor="middle" y="1115.1727708819" style="font-family:sans-serif;font-size: 8px;fill:blue;text-shadow:0 0 1px #fff"><tspan x="-1635" text-anchor="middle">0257a1</tspan><tspan x="-1635" text-anchor="middle" dy="10">006</tspan></text>
`;
const viewBox = "-3360 -60 4560 4121.0373654841";

export const LandingPage = () => {
  const {ref, sizeIsKnown, width, height} = useElementDimensions();
  const {events, allMissions, currentMissions} = useGameSessionContext();

  return (
    <Page>
      <Map ref={ref} id="map">
        {sizeIsKnown && (
          <UncontrolledReactSVGPanZoom
            width={width}
            height={height}
            background="rgba(0,0,0,0.3)"
            SVGBackground="transparent"
            tool={TOOL_PAN}
            preventPanOutside={true}
            miniatureProps={{
              position: POSITION_NONE,
              background: "none",
              width: 0,
              height: 0,
            }}
          >
            <svg viewBox={viewBox}>
              <g dangerouslySetInnerHTML={{__html: svg}}/>
            </svg>
          </UncontrolledReactSVGPanZoom>
        )}
      </Map>
      <div id="mission">
        <H2>Current Mission</H2>
        <ul>
          {currentMissions.map((mission, idx) => (
            <li key={`current-${idx}`}>
              <Mission mission={mission}/>
            </li>
          ))}
        </ul>

        <H2>Full mission log</H2>

        <ul>
          {allMissions.map((mission, idx) => (
            <li key={`allMissions-${idx}`}>
              <Mission mission={mission}/>
            </li>
          ))}
        </ul>
      </div>

      <div id="rank">
      <Progress/>
      </div>
      <div id="log">
      <EventsList events={events} firstPerson/>
      </div>

      <SubBar>
        <Nav>
          <List>
            <ShipsItem>
              <NavLink as="a" href="#fleet">
                <ButtonIcon>
                  <LaunchIcon/>
                </ButtonIcon>
                <Label>Ships</Label>
              </NavLink>
            </ShipsItem>
            <Item>
              <NavLink as="a" href="#map">
                <ButtonIcon>
                  <MapIcon />
                </ButtonIcon>
                <Label>Map</Label>
              </NavLink>
            </Item>
            <Item>
              <NavLink as="a" href="#mission">
                <ButtonIcon>
                  <MissionIcon/>
                </ButtonIcon>
                <Label>Mission</Label>
              </NavLink>
            </Item>
            <Item>
              <NavLink as="a" href="#rank">
                <ButtonIcon>
                  <RankIcon/>
                </ButtonIcon>
                <Label>Rank</Label>
              </NavLink>
            </Item>
            <Item>
              <NavLink as="a" href="#log">
                <ButtonIcon>
                  <LogIcon/>
                </ButtonIcon>
                <Label>Log</Label>
              </NavLink>
            </Item>
          </List>
        </Nav>
      </SubBar>

    </Page>
  );
};

// todo - combine design with ShipNavigation
const SubBar = styled.div`
  z-index: ${Z_INDEX.PAGE_MIDDLE};
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  ${BREAKPOINTS.XL`
      width: 80%;
    `}
  ${BREAKPOINTS.MAX`
      width: calc(100vw - 400px);
    `}
`;

const Nav = styled.nav`
    background: ${COLOURS.BLACK.STANDARD};
    padding-bottom: env(safe-area-inset-bottom);
}
`;

const List = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Item = styled.li`
  flex: 1;
  display: flex;
  min-width: 44px;
  position: relative;
`;

const ShipsItem = styled(Item)`
  ${BREAKPOINTS.XL`
      display: none;
  `}
`;


const NavLink = styled(DisguisedButton)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 44px;
  padding: 6px;
  color: ${COLOURS.WHITE.STANDARD};
  svg,
  label {
    opacity: 0.5;
  }
  &:hover:not(:focus):not([disabled]) {
    background: rgba(255, 255, 255, 0.3);
    color: ${COLOURS.WHITE.STANDARD};
    svg,
    label {
      opacity: 1;
    }
  }
  ${BREAKPOINTS.L`
    min-height: 64px;
  `};
`;

const ButtonIcon = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${SMALL_ICON};
  width: ${SMALL_ICON};
  position: relative;
  ${BREAKPOINTS.L`
    height: ${NORMAL_ICON};
    width: ${NORMAL_ICON};
  `};
`;

const Label = styled.label`
  margin-top: 2px;
  font-size: 10px;
  ${BREAKPOINTS.L`
    font-size: 13px;
  `};
`;
