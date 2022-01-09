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

//맵 데이터 얻어오기
async function getMap($exportMapValue, $exportApiValue, $exportSpaceValue) {
  try {
    const res = await axios.get(getUrl, {
      params: {
        apiKey: $exportApiValue,
        spaceId: $exportSpaceValue,
        mapId: $exportMapValue,
      },
    });
    swal({
      title: "배경음악오브젝트 등록 성공",
      text: "배경음악을 확인해보세요.",
      icon: "success",
    });
    return res;
  } catch (err) {
    console.log(err);
    swal({
      title: "배경음악오브젝트 등록 실패 ",
      text: "값을 정확하게 입력해주세요.",
      icon: "warning",
    }).then((val) => {
      location.href = "/";
    });
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
      title: "맵업로드 성공",
      text: "success",
      icon: "success",
    });
  } catch (err) {
    swal({
      title: "맵업로드 실패",
      text: "fail",
      icon: "warning",
    });
    console.log(err);
  }
}

// 맵데이터 추출후, 다운로드링크 걸기
function exportMapFile($exportMapValue, $exportApiValue, $exportSpaceValue) {
  getMap($exportMapValue, $exportApiValue, $exportSpaceValue).then((res) => {
    let file;
    let data = res;

    let sFileName = "file_test.json";
    let properties = { type: "text/json" }; // Specify the file's mime-type.
    try {
      file = new File([JSON.stringify(res)], sFileName, properties);
    } catch (e) {
      file = new Blob(data, properties);
    }
    let url = URL.createObjectURL(file);
    downloadLink.href = url;
    downloadMap.addEventListener("click", CreateDownloadLink);
  });
}

// 파일다운로드 링크생성
function CreateDownloadLink(e) {
  e.preventDefault();
  const $exportMapValue = exportMapValue.value;
  const $exportApiValue = exportApiValue.value;
  const $exportSpaceValue = exportSpaceValue.value.replace("/", "\\").replaceAll("%20", " ");

  exportMapFile($exportMapValue, $exportApiValue, $exportSpaceValue);
}

function test(event) {
  event.preventDefault(); //submit 할때 새로고침 되는것을 방지
  let fileObject = document.getElementById("bizFile");
  let fileName = fileObject.files[0];
  let spanFilename = document.getElementById("fileName");
  spanFilename.innerText = fileName.name;
  let fr = new FileReader();
  fr.readAsText(fileName, "utf-8");

  fr.onload = () => {
    parseText(fr.result);
  };
  importMap.disabled = false;
  importMap.style.backgroundColor = "#06d6a0";
}

function parseText(text) {
  importMap.addEventListener("click", () => {
    try {
      setMap(JSON.parse(text).data);
    } catch (err) {
      swal({
        title: "맵업로드 실패",
        text: "형식이 올바르지 않습니다.",
        icon: "warning",
      });
      console.log(err);
    }
  });
}

function tabToggle() {
  if (tabExport.checked) {
    downloadBtnGroup.style.display = "block";
    uploadBtnGroup.style.display = "none";
  } else {
    downloadBtnGroup.style.display = "none";
    uploadBtnGroup.style.display = "block";
  }
}

const dummy = ["test", "sjb1MTNoAURqFLnl", "to4YxBrqDSsT4QAJ\\test"];
const testdata = {
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
  x: 6,
  sound: {
    maxDistance: 30,
    src: "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/sounds/jAlXIofmjkQFHBM_oYl-F",
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
  getMap(dummy[0], dummy[1], dummy[2]).then((res) => {
    res.data.objects.push(testdata);
    console.log(res.data.objects);
  });
}

musicSetBtn.addEventListener("click", handleMusicSet);

musicDeleteBtn.addEventListener("click", () => {
  console.log("delete");
});
