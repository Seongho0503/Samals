//GLB MODELS
import AntiqueCamera from "../assets/models/AntiqueCamera.glb";
import BarramundiFish from "../assets/models/BarramundiFish.glb";
import Avocado from "../assets/models/Avocado.glb";
import Tiger from "../assets/card/Tiger.png";
import Penguin from "../assets/card/penguin.png";
import Iguana from "../assets/card/lizard2.png";
import Leopard from "../assets/card/chita.png";
import Rhino from "../assets/card/coco.png";
import Shark from "../assets/card/Shark.png";
import Toco from "../assets/card/Toco.png";

export const exploreList = [
  {
    animalTitle: "토코투칸",
    animal: "bird",
    animalClass: "NT",
    animalClassNo: 1,
    count: 3500,
    detail: `토코투칸은 왕부리새과에서 가장 잘 알려져 있고, 크기도 가장 큰 종입니다. 이들은 중부 및 동부 남아메리카에 서식한다고 알려져 있습니다. 부리는 커서 무거워 보이지만, 실제로는 유공성으로 가벼운 편입니다.
    멸종 위기 관심 보호 종으로, 개인이 사육할 수 없습니다.`,
    description:
      "희귀 등급 EN 호랑이 지금 구매 가능합니다.    4500 마리  한정 판매 되는 호랑이 아직 없으신 분들!  지금 안 사면 평생 못 삽니다. 저가 매수 놓치지 마세요! .",
    itemImgUrl: Toco,
    salePrice: 500,
    likePush: "none",
  },
  {
    animalTitle: "백상아리",
    animal: "shark",
    animalClass: "VU",
    animalClassNo: 1,
    count: 3500,
    detail: `백상아리는 알려진 세계에서 가장 큰 육식성 물고기입니다.\n
    300개의 이빨을 가지고 있지만 음식을 씹지 않습니다.
    상어는 먹이를 입 크기로 찢어 통째로 삼킵니다.
    때로는 물에서 뛰어내리기도 합니다.
    넙치와 같은 작은 물고기에서 큰 물개와 돌고래에 이르기까지 광범위한 먹이를 먹습니다.`,
    description:
      "희귀 등급 EN 호랑이 지금 구매 가능합니다.    4500 마리  한정 판매 되는 호랑이 아직 없으신 분들!  지금 안 사면 평생 못 삽니다. 저가 매수 놓치지 마세요! .",
    itemImgUrl: Shark,
    salePrice: 500,
    likePush: "none",
  },
  {
    animalTitle: "남부 바위뛰기 펭귄",
    animal: "penguin",
    animalClass: "VU",
    animalClassNo: 1,
    count: 0,
    detail:
      "황제 펭귄보다 훨씬 작은 바위호퍼 펭귄의 무게는 10파운드 미만입니다. 그들은 그들이 살고 번식하는 바위가 많은 언덕과 절벽을 뛰어 넘는 독특한 움직임 때문에 이름이 붙여졌습니다. 지난 30년 동안 바위구렁이의 개체수가 거의 25% 감소한 것으로 추정되며 이제 기후 변화로 인해 더 큰 위험에 처할 수 있습니다.",
    description:
      "희귀 등급 EN 호랑이 지금 구매 가능합니다.    4500 마리  한정 판매 되는 호랑이 아직 없으신 분들!  지금 안 사면 평생 못 삽니다. 저가 매수 놓치지 마세요! .",
    itemImgUrl: Penguin,
    salePrice: 500,
    likePush: "none",
  },
  {
    animalTitle: "큰뿔코뿔소",
    // animalEn: "Greater One-Horned Rhino",
    animal: "rhino",
    animalClass: "VU",
    animalClassNo: 1,
    count: 3700,
    detail:
      "큰뿔코뿔소는 코뿔소 종 중 가장 큽니다. 한때 인도 아대륙의 북부 전체에 널리 퍼졌던 코뿔소는 스포츠를 위해 사냥당하거나 농업 해충으로 죽임을 당하면서 급감했습니다. 이로 인해 이 종은 멸종 위기에 처하게 되었고 20 세기 초에는 약 200마리의 큰 외뿔 코뿔소가 남아 있었습니다. 그러나, 인도와 네팔 야생 동물 당국의 엄격한 보호와 관리 덕분에 멸종 위기에서 조금은 회복될 수 있었습니다. 현재는 약 3700마리 가량의 큰뿔코뿔소가 남아있는 것으로 알려져 있습니다.",
    description:
      "희귀 등급 EN 호랑이 지금 구매 가능합니다.    4500 마리  한정 판매 되는 호랑이 아직 없으신 분들!  지금 안 사면 평생 못 삽니다. 저가 매수 놓치지 마세요! .",
    itemImgUrl: Rhino,
    salePrice: 500,
    likePush: "none",
  },
  {
    animalTitle: "바다 이구아나",
    animal: "iguana",
    animalClass: "VU",
    animalClassNo: 1,
    count: 15000,
    detail:
      "바다이구아나는 갈라파고스 제도에서 발견되는 이구아나로 도마뱀 중 유일하게 바다에서 위장하고, 생존할 수 있는 능력을 가진 바다 파충류입니다. 10m 높이에서 물속으로 뛰어들 수 있으며, 갈라파고스 군도 전역에 퍼져 있어, 종종 갈라파고스바다이구아나로도 부릅니다. 주로 바위가 많은 해변에 서식하며, 늪이나 망그로브 해변에 흩어져 있기도 합니다.",
    description:
      "희귀 등급 EN 호랑이 지금 구매 가능합니다.    4500 마리  한정 판매 되는 호랑이 아직 없으신 분들!  지금 안 사면 평생 못 삽니다. 저가 매수 놓치지 마세요! .",
    itemImgUrl: Iguana,
    salePrice: 500,
    likePush: "none",
  },
  {
    animalTitle: "아무르 표범",
    animal: "leopard",
    animalClass: "VU",
    animalClassNo: 1,
    count: 84,
    detail:
      "사람들은 일반적으로 표범에 대해 아프리카의 사바나에 사는 표범을 생각하지만 러시아 극동 지역에서는 희귀한 아무르 표범이 최북단을 구성하는 온대림의 생활에 적응했습니다. 다른 표범과 마찬가지로 아무르 표범은 최대 시속 37마일의 속도로 달릴 수 있습니다. 이 놀라운 동물은 수평으로 19피트 이상, 수직으로 10피트 이상 도약하는 것으로 보고되었습니다. 아무르 표범은 날렵하고 강하며, 먹이를 다른 포식자들에게 빼앗기지 않도록 사냥합니다. 일부 수컷은 교미 후 암컷과 함께 지내며 새끼를 기르는 데 도움이 될 수도 있다고 보고되었습니다. 그들은 10-15 년 동안 살고 최대 20 년까지 살 수 있습니다. 아무르 표범은 극동 표범, 만주 표범 또는 한국 표범으로도 알려져 있습니다.",
    description:
      "희귀 등급 EN 호랑이 지금 구매 가능합니다.    4500 마리  한정 판매 되는 호랑이 아직 없으신 분들!  지금 안 사면 평생 못 삽니다. 저가 매수 놓치지 마세요! .",
    itemImgUrl: Leopard,
    salePrice: 500,
    likePush: "none",
  },
];
