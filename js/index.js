const $spaceId = "to4YxBrqDSsT4QAJ\\test";
const $mapId = "empty-room-small-brick";
const $apiKey = "l8giie6My4hAjvWU";
const getUrl = "https://gather.town/api/getMap";
const setUrl = "https://gather.town/api/setMap";
const tabExport = document.getElementById("tab-export");
const tabImport = document.getElementById("tab-import");
const exportForm = document.getElementById("export-form");
const importForm = document.getElementById("import-form");
const uploadMap = document.getElementById("upload-map");
const importMap = document.getElementById("import-map");
const downloadMap = document.getElementById("download-map");
const tabWrap = document.getElementById("tab-wrap");
const bizeFile = document.getElementById("bizFile");
// async function getMap($spaceId, $mapId, $apiKey) {
//     const res = await axios.get(getUrl, {
//         params: {
//             apiKey: $apiKey,
//             spaceId: $spaceId,
//             mapId: $mapId,
//         },
//     });

//     res.data.objects.push({
//         color: "#df7126",
//         height: 2,
//         highlighted:
//             "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FVp8LcjyHBWZEmOp9?alt=media&token=e35a9733-d580-4437-bf67-b63959f88974",
//         id: "FirePitLit - PBa6mQESMxUmPjdc_5P7_947cf3b9-38b5-4039-b700-6d891cd8e234",
//         normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FVIWc0l1ky8ZzQ5gm?alt=media&token=dbc039ba-19f7-4014-bc91-e13038401728",
//         objectPlacerId: "mXaETfP5wkMKYWBNQzlKOKVI8KE2",
//         offsetX: 15.333333015441895,
//         offsetY: 21,
//         orientation: 0,
//         properties: {},
//         sound: {
//             maxDistance: 5,
//             loop: true,
//             volume: 0.5,
//             src: "https://cdn.gather.town/v0/b/gather-town.appspot.c…=media&token=8417d173-cbfd-484a-b109-f98b37c251d9",
//         },
//         templateId: "FirePitLit - PBa6mQESMxU_mPjdc_5P7",
//         type: 0,
//         width: 2,
//         x: 12,
//         y: 2,
//         _name: "Fire Pit (Lit)",
//     });
//     return res.data;
// }

async function setMap(test) {
    const data = {
        apiKey: $apiKey,
        spaceId: $spaceId,
        mapId: $mapId,
        mapContent: test,
    };
    console.log(data);

    try {
        await axios.post(setUrl, JSON.stringify(data), {
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

// async function getMapTest($spaceId, $mapId, $apiKey) {
//     const res = await axios.get(getUrl, {
//         params: {
//             apiKey: $apiKey,
//             spaceId: $spaceId,
//             mapId: $mapId,
//         },
//     });

//     return res;
// }

// getMapTest($spaceId, $mapId, $apiKey).then((res) => {
//     var file;
//     var data = res;

//     var sFileName = "file_test.json";

//     var properties = { type: "text/json" }; // Specify the file's mime-type.
//     try {
//         // Specify the filename using the File constructor, but ...
//         // file = new File(data, sFileName, properties);
//         file = new File([JSON.stringify(res)], sFileName, properties);
//     } catch (e) {
//         // ... fall back to the Blob constructor if that isn't supported.
//         file = new Blob(data, properties);
//     }
//     var url = URL.createObjectURL(file);
//     document.getElementById("link").href = url;
// });

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
            console.log(JSON.parse(text).data);
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

function submitMap() {
    importMap;
}

function tabToggle() {
    if (tabExport.checked) {
        exportForm.style.display = "block";
        importForm.style.display = "none";
    } else {
        exportForm.style.display = "none";
        importForm.style.display = "block";
    }
}

tabWrap.addEventListener("click", tabToggle);
bizeFile.addEventListener("change", test);
