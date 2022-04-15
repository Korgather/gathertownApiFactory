const getUrl = "https://korgathershop.herokuapp.com/https://gather.town/api/getMap";
const setUrl = "https://korgathershop.herokuapp.com/https://gather.town/api/setMap";

const exportForm = document.getElementById("export-form");
const importForm = document.getElementById("import-form");

const uploadMap = document.getElementById("upload-map");
const importMap = document.getElementById("import-map");
const downloadMap = document.getElementById("download-map");

const importApiValue = document.getElementById("import-api-value");
const importSpaceValue = document.getElementById("import-space-value");
const importMapValue = document.getElementById("import-map-value");

const exportApiValue = document.getElementById("export-api-value");
const exportSpaceValue = document.getElementById("export-space-value");
const exportMapValue = document.getElementById("export-map-value");
const downloadLink = document.getElementById("download-link");

const downloadBtnGroup = document.getElementById("download-btn-group");
const uploadBtnGroup = document.getElementById("upload-btn-group");

const musicSetBtn = document.getElementById("bgm-set");
const musicDeleteBtn = document.getElementById("bgm-delete");

const musicUrl = document.getElementById("music-url");
const posX = document.getElementById("pos-x");
const posY = document.getElementById("pos-y");
const maxDistance = document.getElementById("max-distance");
const volume = document.getElementById("volume");

//맵 데이터 얻어오기
async function getMap() {
  const $exportMapValue = exportMapValue.value;
  const $exportApiValue = exportApiValue.value;
  const $exportSpaceValue = exportSpaceValue.value.replace("/", "\\").replaceAll("%20", " ");
  try {
    const res = await axios.get(getUrl, {
      params: {
        apiKey: $exportApiValue,
        spaceId: $exportSpaceValue,
        mapId: $exportMapValue,
      },
    });

    return res;
  } catch (err) {
    swal({
      title: "실패 ",
      text: "값을 정확하게 입력해주세요.",
      icon: "warning",
    });
    console.log(err);
  }
}
// 맵 업로드하기
async function setMap(setData) {
  const $exportMapValue = exportMapValue.value;
  const $exportApiValue = exportApiValue.value;
  const $exportSpaceValue = exportSpaceValue.value.replace("/", "\\").replaceAll("%20", " ");

  const data = {
    apiKey: $exportApiValue,
    spaceId: $exportSpaceValue,
    mapId: $exportMapValue,
    mapContent: setData,
  };

  try {
    await axios.post(setUrl, JSON.stringify(data), {
      // withCredentials: true,
      headers: {
        "Content-Type": `application/json`,
      },
    });
    swal({
      title: "성공",
      text: "success",
      icon: "success",
    });
  } catch (err) {
    swal({
      title: "실패 ",
      text: "값을 정확하게 입력해주세요.",
      icon: "warning",
    });
    console.log(err);
  }
}

const Sampledata = {
  _name: "Sound Emitter (Bar/Restaurant) Ambience",
  templateId: "SoundEmitterBarAmbience - 3u3pREPN_1Ymg7Cx-jS5f",
  objectPlacerId: "mXaETfP5wkMKYWBNQzlKOKVI8KE2",
  height: 3,
  properties: {},
  offsetY: 16,
  offsetX: 16,
  width: 2,
  type: 0,
  y: 5,
  color: "#9badb7",
  _tags: ["sound", "sound/ambience"],
  id: "SoundEmitterBarAmbience - 3u3pREPN1Ymg7Cx-jS5f_71aded18-8e5e-41e6-b5ba-c7b00265533f",
  x: 3,
  sound: {
    maxDistance: 30,
    src: "https://korgathermusic.s3.ap-northeast-2.amazonaws.com/kartrider+(1).mp3",
    volume: 0.5,
    loop: true,
  },
  highlighted:
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/NPfLjUOZ89A2gGdTCHsL-",
  normal:
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/4uyTiJdT700i7__UEsgWL",
  orientation: 0,
};

function handleMusicSet() {
  const musicObject = {
    ...Sampledata,
    x: Number(posX.value),
    y: Number(posY.value),
    sound: {
      maxDistance: Number(maxDistance.value),
      src: musicUrl.value,
      volume: Number(volume.value),
      loop: true,
    },
  };
  getMap().then(async (res) => {
    if (
      musicUrl.value.length <= 0 ||
      maxDistance.value <= 0 ||
      volume.value <= 0 ||
      posX.value <= 0 ||
      posY.value <= 0
    ) {
      return swal({
        title: "실패 ",
        text: "값을 정확하게 입력해주세요.",
        icon: "warning",
      });
    }
    res.data.objects.push(musicObject);
    setMap(res.data);
  });
}

function handleMusicDelete() {
  getMap().then((res) => {
    const findObject = res.data.objects.find((el) => {
      return (
        el.x === Number(posX.value) &&
        el.y === Number(posY.value) &&
        el.sound.maxDistance === Number(maxDistance.value) &&
        el.sound.src === musicUrl.value
      );
    });
    const idx = res.data.objects.indexOf(findObject);
    if (idx > -1) {
      res.data.objects.splice(idx, 1);
      setMap(res.data);
    } else {
      swal({
        title: "실패 ",
        text: "값을 정확하게 입력해주세요.",
        icon: "warning",
      });
    }
  });
}

musicSetBtn.addEventListener("click", handleMusicSet);

musicDeleteBtn.addEventListener("click", () => handleMusicDelete());
