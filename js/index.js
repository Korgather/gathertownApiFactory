// const getUrl = "https://cors.bridged.cc/https://gather.town/api/getMap";
// const setUrl = "https://cors.bridged.cc/https://gather.town/api/setMap";
// const getUrl = "https://cors-anywhere.herokuapp.com/https://gather.town/api/getMap";
// const setUrl = "https://cors-anywhere.herokuapp.com/https://gather.town/api/setMap";
const getUrl = "https://korgathershop.herokuapp.com/https://gather.town/api/getMap";
const setUrl = "https://korgathershop.herokuapp.com/https://gather.town/api/setMap";
const tabExport = document.getElementById("tab-export");
const tabImport = document.getElementById("tab-import");

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

const tabWrap = document.getElementById("tab-wrap");
const bizeFile = document.getElementById("bizFile");

//맵 데이터 얻어오기
async function getMap($exportMapValue, $exportApiValue, $exportSpaceValue) {
    try {
        const res = await axios.get(getUrl, {
            // withCredentials: true,
            // headers: {
            //     "Access-Control-Allow-Origin": "*",
            // },
            params: {
                apiKey: $exportApiValue,
                spaceId: $exportSpaceValue,
                mapId: $exportMapValue,
            },
        });
        swal({
            title: "맵파일 가져오기 성공",
            text: "다운로드를 클릭해주세요",
            icon: "success",
        }).then(() => {
            downloadLink.style.backgroundColor = "#06d6a0";

            // hover 이벤트 추가
            // $("#download-link").hover(
            //     function () {
            //         $(this).css("background-color", "#69ebc8");
            //     },
            //     function () {
            //         $(this).css("background-color", "#06d6a0");
            //     }
            // );
        });
        return res;
    } catch (err) {
        console.log(err);
        swal({
            title: "맵파일 가져오기 실패",
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
    const $exportSpaceValue = exportSpaceValue.value.replace("/", "\\");
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
    const $exportSpaceValue = exportSpaceValue.value.replace("/", "\\");
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
// axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// axios.defaults.withCredentials = true;
tabWrap.addEventListener("click", tabToggle);
bizeFile.addEventListener("change", test);
downloadMap.addEventListener("click", CreateDownloadLink);
