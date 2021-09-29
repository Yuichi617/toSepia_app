import React, { useState } from "react"
import './css/reset.css'
import './css/style.css'
import NoImage from './images/no_image.jpg'

const App = () => {

    const [send_img, setImage] = useState<File>()
    const [preview, setPreview] = useState<string>(NoImage)

    var onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(!e.target.files) return
        const img: File = e.target.files[0];
        setImage(img);

        setPreview(window.URL.createObjectURL(img));
    }

    var sendImg = (): void => {

        if(!send_img) { // アップロードなしでボタンを押した時

            console.log("画像をアップロードしてください")

        } else { // 画像データをAPI(Flask)へ送信

            console.log("send")

            // requestの作成
            // const url = "http://127.0.0.1:8080/face-age-predict"
            // const requestOptions ={
            //     method: 'POST',
            //     headers:{'Content-Type': 'application/octet-stream', 'Access-Control-Allow-Origin': '*'},
            //     body: send_img,
            // };

            //　request送信、response処理
            // fetch(url, requestOptions
            //     ).then(response => response.json()
            //     ).then(data => {
            //         console.log(data);
            //         setPreAge(String(data.prediction))}
            //     ).catch((error)=>{console.error(error);
            //     });
        }
    }

    return (
        <div className="main-container">
            <h1>Face-age Prediction</h1>
            <div className="wrapper_1">
                <img src={preview} />
                <p>アップロードするファイルを選択してください(フォーマット: jpg、png)</p>
                <div className="input_btn">
                    <input type='file' accept="image/*" onChange={onFileInputChange}/>
                </div>
            </div>
            <div className="wrapper_2">
                <button onClick={sendImg}>送信</button>
            </div>
        </div>
    )
}
export default App